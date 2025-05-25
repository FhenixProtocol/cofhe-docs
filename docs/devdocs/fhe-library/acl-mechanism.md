---
title: Access Control
sidebar_position: 5
---

# Access Control

### Motivation

Consider the following scenario: Your contract receives an encrypted input that should remain confidential.

```solidity
// Contract A
function submitSecretBid(InEuint32 bid) {
    euint32 handle = FHE.asEuint32(bid);
    // Perform some operations on the encrypted input
}
```

If there were no access control mechanisms, someone could observe the handle value used above and reuse it by initializing a local variable with the same value.

```solidity
// Contract B
function attackBid(uint256 seenHandleValue) {
    FHE.decrypt(seenHandleValue); // try to expose the value
}
```

To prevent misuse, all FHE operations verify that the caller has explicit permission to use the ciphertext handle.

In practice, the code above will revert with an ACLNotAllowed error when attempting to decrypt the ciphertext.
Any other FHE operation will also fail if the calling contract doesn't have permission for all input handles. For example:
```solidity
FHE.add(notAllowedCt, allowedCt); // -> will revert with ACLNotAllowed
```
By default, newly created ciphertext handles are accessible to the contract that created them, but only for the duration of the transaction. Any additional access must be explicitly granted using the following Solidity API:

1. `FHE.allowThis(CIPHERTEXT_HANDLE)` - allows the current contract access to the handle.
2. `FHE.allow(CIPHERTEXT_HANDLE, ADDRESS)` - allows the specified address access to the handle.
3. `FHE.allowTransient(CIPHERTEXT_HANDLE, ADDRESS)` - allows the specified address access to the handle for the duration of the transaction.
4. `FHE.allowGlobal(CIPHERTEXT_HANDLE)` - allows any address access to the handle.

:::note[Note]
To decrypt a ciphertext off-chain using the decryption network, the issuer of the decryption request must have permission on the ciphertext handle. If not, the request will be denied by the access control system..
:::

See [ACL Usage Examples](../tutorials/acl-usage-examples) for examples on how to explicitly manage ciphertext allowances in contracts.

### Behind the scenes
Every blockchain integrating CoFHE includes a deployed `ACL.sol` contract.
This contract manages ownership records for each ciphertext, ensuring that only authorized owners can perform operations on their encrypted data.
The ACL contract contains the following mapping which tracks the ownership of each ciphertext handle:
```solidity
mapping(uint256 handle => mapping(address account => bool isAllowed)) persistedAllowedPairs;
```
