---
title: Decrypt/SealOutput from Cofhejs
sidebar_position: 4
---

# Decrypt/SealOutput from Cofhejs

## Overview

This document lays out the complete flow of an off-chain sealoutput request. It is recommended to always use `cofhejs.unseal` rather than `cofhejs.decrypt` as `.unseal` internally seals the user's data before returning it from the Threshold Network, making it inherently more secure (eg. man in the middle attack).

> Note: The example below is of `cofhejs.unseal`, however `cofhejs.decrypt` uses the same API and returns the same result.

## Key Components

| Component             | Description                                                                          |
| --------------------- | ------------------------------------------------------------------------------------ |
| **CtHash**            | The encrypted hash representing an encrypted number. Fetched on-chain.               |
| **Cofhejs**           | Javascript library handling `permits` and the `unseal` / `decrypt` operations.       |
| **Threshold Network** | Decentralized decryption network that handles the requests                           |
| **ACL**               | On-chain **A**ccess **C**ontrol **L**ist responsible for tracking **CtHash** access. |

---

## Flow Diagram

The following diagram illustrates the complete flow of an Decrypt/SealOutput request in the CoFHE ecosystem:
[![Diagram](../../../../static/img/assets/offChain_sealoutput_decrypt.svg)](../../../../static/img/assets/offChain_sealoutput_decrypt.svg)

## Step-by-Step Flow

### 📌 Step 1: Fetching of CtHash

Solidity contract:

```solidity
contract

function setNumber(uint32 num) public {
  counter[msg.sender] = FHE.asEuint32(num);
  FHE.allowSender(counter[msg.sender]);
}

function getNumber() public view returns (euint64) {
  return counter[msg.sender];
}
```

1. Fetch the user's `euint64` from the chain by calling `const CtHash = await example.getNumber()` which returns an `euint64` as a js bigint.![Bullet](../../../../static/img/assets/2.png)

> Note: All euints, along with ebool and eaddress, are wrappers around uint256. The data returned from `example.getNumber()` is in the type bigint, and can be treated as a `CtHash` directly

### 📌 Step 2: Integration with Cofhejs

1. The decentralized application (dApp) integrates with CoFHE by utilizing **Cofhejs** for encryption.
   [See in GitHub](https://github.com/FhenixProtocol/cofhejs)

2. [Create a permit](../../cofhejs/permits-management.md) using `cofhejs.createPermit(...)`. This permit will automatically be used in the following step.

3. [Unseal](../../cofhejs/sealing-unsealing.md) using `cofhejs.unseal(CtHash)`![Bullet](../../../../static/img/assets/1.png). Calls `/sealoutput` on the threshold network, unseals the result. ![Bullet](../../../../static/img/assets/3.png)

### 📌 Step 3 (Handled by cofhejs.unseal):

1. **`cofhejs.unseal` calls /sealoutput**. The user's Permit is added to the request. `Permit.issuer` should be the `msg.sender` in Step 1 for the permit to be valid. https://\{ThresholdNetworkUrl\}/sealoutput  

2. **Threshold Network makes an on-chain call to the `ACL`** to verify that the Permit is valid.

3. **ACL verifies** that the Permit is valid.![Bullet](../../../../static/img/assets/4.png)

4. **ACL verifies** that `Permit.issuer` has been granted access to `CtHash`. (Access is granted by `FHE.allowSender` in the Example contract function `setNumber()`)

5. **Threshold Network** seals the data with `Permit.sealingKey`

6. **Threshold Network** returns the sealed result to `cofhejs`

### 📌 Step 4: Handling Results

`cofhejs` receives the result from the Threshold Network and:

1. **Unseals the result** using the private_key of the sealing key pair. The result is always unsealed as a bigint regardless of the type of CtHash (euint32 / ebool / eaddress)

2. **Cofhejs converts the output type** as follows:

```typescript
export const convertViaUtype = <U extends FheTypes>(
  utype: U,
  value: bigint
): UnsealedItem<U> => {
  if (utype === FheTypes.Bool) {
    return !!value as UnsealedItem<U>;
  } else if (utype === FheTypes.Uint160) {
    return uint160ToAddress(value) as UnsealedItem<U>;
  } else if (utype == null || FheUintUTypes.includes(utype as number)) {
    return value as UnsealedItem<U>;
  } else {
    throw new Error(`convertViaUtype :: invalid utype :: ${utype}`);
  }
};
```

3. **The result is returned as a `Result` type**. The `Result<T>` type looks like this:

```typescript
export type Result<T, E = string> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: E };
```

The `Result` type is a discriminated union that represents either:

- A successful operation with data (`success: true`)
- A failed operation with an error message (`success: false`).
  The return type of `cofhejs.unseal` is determined by the utype passed in as the second argument:

```typescript
const boolResult: Result<bool> = await cofhejs.unseal(
  boolCtHash,
  FheTypes.Bool
);
const uintResult: Result<bigint> = await cofhejs.unseal(
  uintCtHash,
  FheTypes.Uint32
);
const addressResult: Result<string> = await cofhejs.unseal(
  ctHash,
  FheTypes.Address
);
```
