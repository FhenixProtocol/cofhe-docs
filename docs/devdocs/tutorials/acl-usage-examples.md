---
title: ACL Usage Examples
sidebar_position: 6
---

# ACL Usage Examples

See [ACL Mechanism](../fhe-library/acl-mechanism.md) for explanation of why is the ACL mechanism needed.

### Solidity API
1. `FHE.allowThis(CIPHERTEXT_HANDLE)` - allows the current contract access to the handle.
2. `FHE.allow(CIPHERTEXT_HANDLE, ADDRESS)` - allows the specified address access to the handle.
3. `FHE.allowTransient(CIPHERTEXT_HANDLE, ADDRESS)` - allows the specified address access to the handle for the duration of the transaction.

### Automatic tx-scoped Allowance
The contract that creates the value for the first time will automatically get ownership of the ciphertext **for the duration of the transaction**,
by using `ACL.allowTransient(this)` behind the scenes.
```solidity
// Contract A
function doAdd(InEuint32 input1, InEuint32 input2) {
    euint32 handle1 = FHE.asEuint32(input1); // Contract A gets temporary ownership of handle1
    euint32 handle2 = FHE.asEuint32(input2); // Contract A gets temporary ownership of handle2
    
    euint32 result = FHE.add(handle1, handle2); // possible because Contract A has ownership of handle1 and handle2
}
```

### Persistent Allowance for This Contract
To use the results in other transactions, explicit ownership must be granted with `FHE.allow(address)` or `FHE.allowThis()`.
```solidity
contract A {
    private euint32 result;
    private euint32 handle1;

    function doAdd(InEuint32 input1, InEuint32 input2) {
        handle1 = FHE.asEuint32(input1);         // Contract A gets temporary ownership of handle1
        euint32 handle2 = FHE.asEuint32(input2); // Contract A gets temporary ownership of handle2

        result = FHE.add(handle1, handle2);      // Contract A gets temporary ownership of result
        FHE.allowThis(result);                   // result is allowed for future transactions
    }

    function doSomethingWithResult() {
        FHE.decrypt(result);      // Allowed
        FHE.add(handle1, result); // ACLNotAllowed (handle1 is not owned persistently)
    }
}
```

### Allowance for Decryptions
To decrypt a ciphertext off-chain via the decryption network, the issuer must be allowed on the ciphertext handle via `FHE.allow(userAddress)`.
```solidity
contract A {
    private mapping(address -> uint256) balances;

    function transfer(InEuint32 _amount, address to) {
        euint32 amount = FHE.asEuint32(_amount);
        
        balances[msg.sender] = balances[msg.sender] - amount;
        balances[to] = balances[to] + amount;

        FHE.allow(balances[msg.sender], msg.sender); // now the sender can decrypt her balance
        FHE.allow(balances[to], to);                 // now the receiver can decrypt his balance

        // enable balance manipulation for future transactions
        FHE.allowThis(balances[msg.sender]);
        FHE.allowThis(balances[to]);
    }
}
```

### Allow other contracts
You can also allow other contracts to use your ciphertexts, either persistently or only for the course of this transaction via `FHE.allowTransient(handle, address)`.
```solidity
contract A {
    function doAdd(InEuint32 input1) {
        handle1 = FHE.asEuint32(input1);       // Contract A gets temporary ownership of handle1

        FHE.allowTransient(handle1, addressB); // Contract B is allowed to use handle1 in this transaction alone
        // or
        FHE.allow(handle1, addressB);          // Contract B is allowed to use handle1 forever
        
        IContractB(addressB).doSomethingWithHandle1(handle1);
    }
}
```