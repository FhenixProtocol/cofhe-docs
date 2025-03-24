---
title: Access Control
sidebar_position: 5
---

# Access Control

### API
1. `FHE.allowThis(CIPHERTEXT_HANDLE)` - allows the current contract access to the handle
2. `FHE.allow(CIPHERTEXT_HANDLE, ADDRESS)` - allows the specified address access to the handle
3. `FHE.allowTransient(CIPHERTEXT_HANDLE, ADDRESS)` - allows the specified address access to the handle for the duration of the transaction

### Ownership

Consider the following scenario: Your contract receives an encrypted input which should be kept confidential.

```solidity
// Contract A
function submitSecretBid(InEuint32 bid) {
    euint32 handle = FHE.asEuint32(bid);
    // Perform some operations on the encrypted input
}
```

<!--
Note that every input Ciphertext is signed for a particular contract. This means I can't use the same input in another contract by sending the same input value.
```solidity
// Contract C
function attackInput(InEuint32 seenInput) {
    FHE.decrypt(seenHandleValue); // try to get ownership myself for an input that was signed for another contract
    // This will raise an error: InvalidSignature
}
```
-->


If there were no access control mechanisms, someone could inspect the handle value which was received above, and then
initialize a local variable with the same handle value as the one received above.
```solidity
// Contract B
function attackBid(uint256 seenHandleValue) {
    FHE.decrypt(seenHandleValue); // try to expose the value
}
```

Therefore, all operations check that the issuer of the operation is the owner of the ciphertext handle. <br>
So in practice, the code above will raise a `ACLNotAllowed` error when trying to decrypt the ciphertext.
Any other operation will also fail if the issuing contract does not have ownership of at least one of the inputs, such as:
```solidity
FHE.add(notOwnedCt, ownedCt); // -> ACLNotAllowed
```

The contract that creates the value for the first time will automatically get ownership of the ciphertext **for the duration of the transaction**.
```solidity
// Contract A
function doAdd(InEuint32 input1, InEuint32 input2) {
    euint32 handle1 = FHE.asEuint32(input1); // Contract A gets temporary ownership of handle1
    euint32 handle2 = FHE.asEuint32(input2); // Contract A gets temporary ownership of handle2
    
    euint32 result = FHE.add(handle1, handle2); // Contract A gets temporary ownership of result
}
```

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
        FHE.add(handle1, result); // ACLNotAllowed (handle2 is not owned persistently)
    }
}
```

You can also allow other contracts to use your ciphertexts, either persistently or for the course of this transaction only with `FHE.allowTransient(handle, address)`.
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

### Decryption
To decrypt a ciphertext off-chain via the decryption network, the issuer must have ownership of the ciphertext handle.
```solidity
FHE.allow(handle, msg.sender); // now the sender can decrypt the ciphertext
```


### Behind the scenes
Every blockchain integrating CoFHE will deploy a contract called `ACL.sol`.
This contract manages ownership records for each ciphertext, ensuring that only authorized owners can perform operations on their encrypted data.

