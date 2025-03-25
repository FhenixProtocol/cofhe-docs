---
title: Access Control
sidebar_position: 5
---

# Access Control

### Motivation

Consider the following scenario: Your contract receives an encrypted input which should be kept confidential.

```solidity
// Contract A
function submitSecretBid(InEuint32 bid) {
    euint32 handle = FHE.asEuint32(bid);
    // Perform some operations on the encrypted input
}
```

If there were no access control mechanisms, someone could inspect the handle value which was received above, and then
initialize a local variable with the same handle value as the one received above.
```solidity
// Contract B
function attackBid(uint256 seenHandleValue) {
    FHE.decrypt(seenHandleValue); // try to expose the value
}
```

Therefore, all operations check that the issuer of the operation has permission to use the ciphertext handle.

So in practice, the code above will raise a `ACLNotAllowed` error when trying to decrypt the ciphertext.
Any other operation will also fail if the issuing contract does not have allowance on all the inputs, such as:
```solidity
FHE.add(notAllowedCt, allowedCt); // -> ACLNotAllowed
```
Every newly created ciphertext handle is allowed to the creating contract for the duration of the transaction, and any other
allowance must be explicitly granted by this contract, with the following solidity api:

1. `FHE.allowThis(CIPHERTEXT_HANDLE)` - allows the current contract access to the handle.
2. `FHE.allow(CIPHERTEXT_HANDLE, ADDRESS)` - allows the specified address access to the handle.
3. `FHE.allowTransient(CIPHERTEXT_HANDLE, ADDRESS)` - allows the specified address access to the handle for the duration of the transaction.

:::note[Note]
For a user to be able to decrypt a ciphertext off-chain via the decryption network, the issuer must be allowed on the ciphertext handle.
:::

See [ACL Usage Examples](../tutorials/acl-usage-examples) for examples on how to explicitly manage ciphertext allowances in contracts.

### Behind the scenes
Every blockchain integrating CoFHE will deploy a contract called `ACL.sol`.
This contract manages ownership records for each ciphertext, ensuring that only authorized owners can perform operations on their encrypted data.
The ACL contract contains the following mapping which tracks the ownership of each ciphertext handle:
```solidity
mapping(uint256 handle => mapping(address account => bool isAllowed)) persistedAllowedPairs;
```