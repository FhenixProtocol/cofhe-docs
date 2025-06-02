---
title: Sealing & Unsealing
sidebar_position: 3
---

## Overview

In Fhenix's FHE system, data returned from smart contracts is "sealed" (internally re-encrypted since it already exists in an encrypted state) to maintain confidentiality during transmission. The unsealing process converts this encrypted data back into readable values using your permit's sealing key pair.

> Note: To learn more about sealed box encryption, take a look at the [libsodium sealedbox docs](https://libsodium.gitbook.io/doc/public-key_cryptography/sealed_boxes#purpose).

## Basic Usage

### Simple Unsealing

The most straightforward way to unseal data is using `cofhejs.unseal()`:

> Note: Unsealing requires `Cofhejs` to be [initialized](./index.md#setup) and for a [permit](./permits-management.md) to be created.

```typescript
// Get sealed data from a contract
const sealedBalance = await myContract.getBalance()

// Unseal with the correct type
const result = await cofhejs.unseal(sealedBalance, FheTypes.Uint64)
if (!result.success) {
	console.error('Failed to unseal:', result.error)
	return
}

console.log('Balance:', result.data) // Unsealed value as BigInt
```

### Supported Types

The unsealing process supports all FHE data types:

```typescript
// Integer types
const uint8 = await cofhejs.unseal(sealed, FheTypes.Uint8)
const uint16 = await cofhejs.unseal(sealed, FheTypes.Uint16)
const uint32 = await cofhejs.unseal(sealed, FheTypes.Uint32)
const uint64 = await cofhejs.unseal(sealed, FheTypes.Uint64)
const uint128 = await cofhejs.unseal(sealed, FheTypes.Uint128)
const uint256 = await cofhejs.unseal(sealed, FheTypes.Uint256)

// Boolean
const bool = await cofhejs.unseal(sealed, FheTypes.Bool)

// Address
const address = await cofhejs.unseal(sealed, FheTypes.Address)
```

## Advanced Usage

### Direct Permit Unsealing

For lower-level control, you can use the Permit class directly to unseal data:

```typescript
const permit = await Permit.create({
	type: 'self',
	issuer: userAddress,
})

// Seal some data (for demonstration)
const value = 937387n
const sealed = SealingKey.seal(value, permit.sealingPair.publicKey)

// Unseal directly with permit
const unsealed = permit.unseal(sealed)
console.log(unsealed === value) // true
```

### Type Conversions

Internally, data types require specific handling when unsealed:

```typescript
// Boolean values
const boolValue = true
const sealedBool = SealingKey.seal(boolValue ? 1 : 0, permit.sealingPair.publicKey)
const unsealedBool = permit.unseal(sealedBool)
const resultBool = unsealedBool === 1n // Convert BigInt to boolean

// Address values
const addressValue = '0x1234...'
const sealedAddress = SealingKey.seal(BigInt(addressValue), permit.sealingPair.publicKey)
const unsealedAddress = permit.unseal(sealedAddress)
const resultAddress = getAddress(`0x${unsealedAddress.toString(16).slice(-40)}`)
```

However this is handled for you with `cofhejs.unseal`. Unsealing an encrypted boolean will return a `bool`, an encrypted address will return a `0x` prefixed string, and an encrypted number will return a js `bigint`.
