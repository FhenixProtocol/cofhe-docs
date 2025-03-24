---
title: Inputs
sidebar_position: 1
---

Writing confidential smart contracts, a trivial part would be to receive encrypted inputs from users:

```sol
function transfer(
    address to,
    inEuint32 memory inAmount
) public virtual returns (euint32 transferred) {
    euint32 amount = FHE.asEuint32(inAmount);
    address from = _msgSender();
    transferred = _transfer(from, to, amount);
}
```

:::note[Important Note]

Notice, in the example above, the distinction between **`inEuint32`** and **`euint32`**. The **input types** `inEuintxx` (and `inEbool`, `inEaddress`) are special encrypted types that represent **user input**. Input types contain additional info required to authenticate and validate ciphertexts. For more info on that, read on the [ZK-Verifier](../architecture/internal-utilities/verifier.md).

:::

Before we can use **input types**, we need to transform them the a regular **encrypted type**:

```sol
euint32 amount = FHE.asEuint32(inAmount);
```

:::tip
You should avoid storing encrypted input types (e.g. `inEuint8`, etc) directly - it will be more expensive as these types contain more data, and it could lead to unexpected results. You should always prefer to tranform it to a regular encrypted type using `FHE.asE...()`.
:::

Now that `value` is of type `euint32`, we can store or manipulate it:

```sol
toBalance = FHE.sub(toBalance, amount);
```

:::tip
Read more on the available FHE types and opreations [here](./fhe-encrypted-operations.md).
:::

<!-- # Handling Encrypted Inputs

## Overview

CoFHE's FHE Library exposes special types to handle FHE-encrypted data. However, there is a special case for external user-provided encrypted inputs.

Fhenix’s Fully Homomorphic Encryption (FHE) smart contracts handle encrypted data input differently from standard Solidity smart contracts.

First, Fhenix has different data types: boolean, integer and user input.
Second, `inEuint` and `inEbool` are used for handling input data, whereas `euint` and `ebool` are used for already processed data within the contract.
Third, conversion is required from `inEuint` to `euint` to ensure that only correctly formatted encrypted user input is processed. This is done using a helper function: `FHE.asEuintxx`.
Finally, follow best practices. Try to minimize storing large quantities of encrypted data on-chain & optimize computation to lower gas costs; process data as needed. Also, use structured types, and avoid using raw bytes to handle encrypted data input.

## Encrypted Data Types

Different types of encrypted data can be defined:

- `inEbool`: Encrypted boolean.
- `inEuint8`: Encrypted unsigned 8-bit integer.
- `inEuint16`: Encrypted unsigned 16-bit integer.
- `inEuint32`: Encrypted unsigned 32-bit integer.
- `inEuint64`: Encrypted unsigned 64-bit integer.
- `inEuint128`: Encrypted unsigned 128-bit integer.
- `inEuint256`: Encrypted unsigned 256-bit integer.
- `inEaddress`: Encrypted address.

## Receiving Encrypted Inputs

Two methods can be used to receive encrypted inputs: `inEuintXX` structs or raw bytes.

The following code snippets show how to use the two methods for an encrypted transfer to a specific Contract on the blockchain:

### `inEuintXX` Structs

```solidity
   function transferEncryptedToAccount(address to, inEuint32 calldata encryptedBalance) public {
     _updateAccountBalance(to, FHE.asEuint32(encryptedBalance));
   }
```

### Raw Bytes

```solidity
    function transferEncryptedData(address to, bytes calldata encryptedData) public {
        _storeEncryptedData(to, FHE.asEuint32(encryptedData));
    }
```

As you can see, the advantage of using `inEuint` over raw bytes is that it ensures type safety and readability. It also provides a structured approach that integrates well with the FHE.sol and fhenix.js library's functions.

## Advantages of `inEuint`, `inEbool` and `inEaddress` Over Raw Bytes

Fhenix strongly recommends using `inEuintxx` (and/or `inEbool`, `inEaddress`) structs instead of raw bytes to ensure type safety and readability. These structs provide a structured approach that integrates well with FHE.sol library functions. We believe that the advantages of `inEuintxx`, `inEbool` and `inEaddress` structs are more compatible with handling encrypted data and ensuring application safety, even though raw bytes may result in very slightly lower gas costs.

### Examples

#### Voting in a Poll

```solidity
  function castEncryptedVote(address poll, inEbool calldata encryptedVote) public {
    _submitVote(poll, FHE.asEbool(encryptedVote));
  }
```

#### Setting Encrypted User Preferences

```solidity
   function updateUserSetting(address user, inEuint8 calldata encryptedSetting) public {
       _applyUserSetting(user, FHE.asEuint8(encryptedSetting));
   }
```

### `inExxx` vs. `exxx` Types

- `inExxx` types, such as all of `inEuint` types, `inEbool` and `inEaddress` types are used for handling incoming encrypted data.
- `exxx` types such as all of `euint` types, `ebool` and `eaddress` are used for data already processed and in use within the contract.

### Conversion Requirement

Conversion from `inEuint` (or `inEbool`, `inEaddress`) to `euint` (`ebool`, `eaddress`) is required to ensure that only correctly formatted encrypted data is processed.

This is done using the `FHE.asEuintXX`, `FHE.asEbool` or `FHE.asEaddress` functions, where `XX` is the bit size of the encrypted data. The example above uses the `FHE.asEuint8` helper function.

### Gas Cost Implications

Attempting to store `inEuint`, `inEbool` or `inEaddress` types directly in storage can lead to prohibitively high gas costs due to the large size of encrypted data. It's generally recommended to avoid storing these directly and instead process them as needed.

### Best Practices – Use Structured Types

Ensure data integrity and security of smart contract operation when handling encrypted input. Use the structured `inEuint`, `inEbool` or `inEaddress` types for clearer and safer code, and be mindful of gas costs when designing your contract's data handling strategies. Thorough testing and consideration of security implications are essential in maintaining the robustness and reliability of your FHE-based smart contracts. -->
