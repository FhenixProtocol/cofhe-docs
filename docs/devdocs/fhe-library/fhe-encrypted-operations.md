---
title: FHE Encrypted Operations
sidebar_position: 3
---

# FHE Encrypted Operations

The library exposes utility functions for FHE operations. The goal of the library is to provide a seamless developer experience for writing smart contracts that can operate on confidential data.

## Types

The library provides a type system that is checked both at compile time and at run time. The structure and operations related to these types are described in this sections.

We currently support encrypted integers of bit length up to 256 bits and special types such as `ebool` and `eaddress`.

The encrypted integers behave as much as possible as Solidity's integer types. However, behavior such as "revert on overflow" is not supported as this would leak some information of the encrypted integers. Therefore, arithmetic on `euint` types is [unchecked](https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic), i.e. there is wrap-around on overlow.

In the back-end, encrypted integers are FHE ciphertexts. The library abstracts away the ciphertexts and presents pointers to ciphertexts, or ciphertext handles, to the smart contract developer. The `euint`, `ebool` and `eaddress` types are _wrappers_ over these handles.
<table>
<tr><th colspan="2"> Supported types </th></tr>
<tr><td>    

| name       | Bit Size | Usage   |
|------------|----------| ------- |
| `euint8`   | 8        | Compute |
| `euint16`  | 16       | Compute |
| `euint32`  | 32       | Compute |
| `euint64`  | 64       | Compute |
| `euint128` | 128      | Compute |
| `euint256` | 256      | Compute |
| `ebool`    | 8        | Compute |
| `eaddress` | 160      | Compute |
</td><td>    

| name         | Bit Size | Usage   |
|--------------|----------| ------- |
| `InEuint8`   | 8        | Input   |
| `InEuint16`  | 16       | Input   |
| `InEuint32`  | 32       | Input   |
| `InEuint64`  | 64       | Input   |
| `InEuint128` | 128      | Input   |
| `InEuint256` | 256      | Input   |
| `InEbool`    | 8        | Input   |
| `InEaddress` | 160      | Input   |
</td></tr> </table>

## Operations

There are two ways to perform operations with FHE.sol:

### Using Direct Function Calls

Direct function calls are the most straightforward way to perform operations with FHE.sol. For example, if you want to add two encrypted 8-bit integers (euint8), you can do so as follows:

```javascript
euint8 result = FHE.add(lhs, rhs);
```

Here, lhs and rhs are your euint8 variables, and result will store the outcome of the addition.

### Using Library Bindings

FHE.sol also provides library bindings, allowing for a more natural syntax. To use this, you first need to include the library for your specific data type. For euint8, the usage would look like this:

```javascript
euint8 result = lhs.add(rhs);
```

In this example, lhs.add(rhs) performs the addition, using the library function implicitly.

:::tip
The `ebool` type is not a real boolean type. It is implemented as a `euint8`
:::

## Supported Operations

:::tip
A documentation of every function in FHE.sol (including inputs and outputs) can be found in [FHE.sol](../solidity-api/FHE.md)
:::

All operations supported by FHE.sol are listed in the table below.

Note that all functions are supported in both direct function calls and library bindings.


| Name                  | FHE.sol function  | Operator  |  euint8  | euint16  | euint32  |  euint64  |  euint128   |   euint256    |  ebool   |  eaddress   |
|-----------------------|-------------------|:---------:|:--------:|:--------:|:--------:|:---------:|:-----------:|:-------------:|:--------:|:-----------:|
| Addition              | `add`             |    `+`    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    |   n/a    |     n/a     |
| Subtraction           | `sub`             |    `-`    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    |   n/a    |     n/a     |
| Multiplication        | `mul`             |    `*`    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    |   n/a    |     n/a     |
| Bitwise And           | `and`             |    `&`    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    | <g>✔</g> |     n/a     |
| Bitwise Or            | `or`              |   `\|`    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    | <g>✔</g> |     n/a     |
| Bitwise Xor           | `xor`             |    `^`    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    | <g>✔</g> |     n/a     |
| Division              | `div`             |    `/`    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    |   n/a    |     n/a     |
| Remainder             | `rem`             |    `%`    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    |   n/a    |     n/a     |
| Square                | `square`          |    n/a    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    |   n/a    |     n/a     |
| Shift Right           | `shr`             |    n/a    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    |   n/a    |     n/a     |
| Shift Left            | `shl`             |    n/a    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    |   n/a    |     n/a     |
| Rotate Right          | `ror`             |    n/a    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    |   n/a    |     n/a     |
| Rotate Left           | `rol`             |    n/a    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    |   n/a    |     n/a     |
| Equal                 | `eq`              |    n/a    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    | <g>✔</g> |  <g>✔</g>   |
| Not equal             | `ne`              |    n/a    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    | <g>✔</g> |  <g>✔</g>   |
| Greater than or equal | `gte`             |    n/a    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    |   n/a    |     n/a     |
| Greater than          | `gt`              |    n/a    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    |   n/a    |     n/a     |
| Less than or equal    | `lte`             |    n/a    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    |   n/a    |     n/a     |
| Less than             | `lt`              |    n/a    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    |   n/a    |     n/a     |
| Min                   | `min`             |    n/a    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    |   n/a    |     n/a     |
| Max                   | `max`             |    n/a    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    |   n/a    |     n/a     |
| Not                   | `not`             |    n/a    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    | <g>✔</g> |     n/a     |
| Select                | `select`          |    n/a    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    | <g>✔</g> |  <g>✔</g>   |
| Decrypt               | `decrypt`         |    n/a    | <g>✔</g> | <g>✔</g> | <g>✔</g> | <g>✔</g>  |  <g>✔</g>   |   <g>✔</g>    | <g>✔</g> |  <g>✔</g>   |

**tip:**
Division and Remainder by `0` will output with an encrypted representation of the maximal value of the uint that is used (Ex. encrypted 255 for euint8)
