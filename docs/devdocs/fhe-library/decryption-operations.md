---
title: Decryption Operations
sidebar_position: 7
---

# Decryptions

Decryption is the process of converting encrypted data back into its original form.

In the context of Fully Homomorphic Encryption (FHE), decryption allows for the retrieval of results after performing computations on encrypted data.

## How to decrypt

The `FHE.decrypt` function is a core component of the FHE library, designed to decrypt encrypted data within the FHE framework through Solidity smart contract.

`FHE.decrypt` function is asynchronous when called from Solidity, meaning that you'll get the decrypted value only when it's ready and all FHE calculations on the requsted ciphertext have ended.

## Function Signature

```solidity
function decrypt(uint256 encryptedCtHandle) public returns (uint256)
```

`decrypt` functions gets a ciphertext hash, which is always `uint256`. 
If you wanna decrypt `euint32` for example, you'll have to unwrap it into `uint256` like this : `euint32.unwrap(num)`

## Parameters

- `encryptedCtHandle` (uint256): The encrypted ciphertext hash to be decrypted. This parameter is expected to be in the form of an 256-bit unsigned integer.

## Returns

As mentioned, decryption result is async, meaning that you'll have to poll for result after calling decrypt, till it's ready.

- `uint256`: The decrypted result hash to poll with as a 256-bit unsigned integer.

### Example

```solidity
euint32 encryptedValue = FHE.add(ea, eb);
FHE.decrypt(euint32.unwrap(encryptedValue));
// Assume that some time have passed and decrypted value is ready
uint32 decryptedResult = FHE.getDecryptResult(encryptedValue);

```

In this example, `ea` and `eb` are encrypted values. The `add` function performs an addition operation on these encrypted values, and the result is decrypted using `FHE.decrypt`.
