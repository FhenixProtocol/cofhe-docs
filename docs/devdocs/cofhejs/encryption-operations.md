---
sidebar_position: 2
---

# Encryption

Cofhejs provides an easy-to-use function to encrypt your inputs before sending them to the Fhenix Co-Processor.

:::tip
Encryption in Fhenix is done using the global chain key. This key is loaded when you create a Cofhejs client automatically
:::

When we perform encryption, we specify the type of `euint` (Encrypted Integer) we want to create. This should match the expected type in the Solidity contract we are working with.

First, initialize the library:

```Typescript
await cofhejs.initializeWithEthers({
    ethersProvider: provider,
    ethersSigner: wallet,
    environment: "LOCAL",
});

// or

await cofhejs.initializeWithViem({
    viemClient: provider,
    viemWalletClient: wallet,
    environment: "LOCAL",
});
```

Then, you can use the created client to encrypt

```Typescript
import { cofhejs, Encryptable } from "cofhejs/node";

// Initialize cofhejs

const logState = (state) => {
    console.log(`Log Encrypt State :: ${state}`);
};

let result: [CofheInBool] = await cofhejs.encrypt(logState, [Encryptable.bool(true)]);
let result: [CoFheInUint8] = await cofhejs.encrypt(logState, [Encryptable.uint8(10)]);
let result: [CoFheInUint16] = await cofhejs.encrypt(logState, [Encryptable.uint16(10)]);
let result: [CoFheInUint32] = await cofhejs.encrypt(logState, [Encryptable.uint32(10)]);
let result: [CoFheInUint64] = await cofhejs.encrypt(logState, [Encryptable.uint64(10)]);
let result: [CoFheInUint128] = await cofhejs.encrypt(logState, [Encryptable.uint128(10)]);
let result: [CoFheInUint256] = await cofhejs.encrypt(logState, [Encryptable.uint256(10)]);
let result: [CoFheInAddress] = await cofhejs.encrypt(logState, [Encryptable.address("0x1234567890123456789012345678901234567890")]);
```

Or, we can use the nested form to encrypt multiple values at once:

```javascript
let result = await cofhejs.encrypt(logState, [
	Encryptable.bool(true),
	Encryptable.uint8(10),
	Encryptable.uint16(10),
	Encryptable.uint32(10),
	Encryptable.uint64(10),
	Encryptable.uint128(10),
	Encryptable.uint256(10),
	Encryptable.address('0x1234567890123456789012345678901234567890'),
])
```

The returned types from the encrypt function will be an array of the type `CoFheInBool`, `CoFheInUint8`, `CoFheInUint16`, `CoFheInUint32` (or 64/128/256) or `CoFheInAddress` depending on the type you specified.

These encrypted types have the following structure:

```typescript
export type CoFheInItem = {
  ctHash: bigint;
  securityZone: number;
  utype: FheTypes;
  signature: string;
};

export type CoFheInUint8 extends CoFheInItem {
  utype: FheTypes.Uint8;
}
```

These types exist in order to enable type checking when interacting with Solidity contracts, and to make it easier to work with encrypted data.

### setState

The setState function is used to monitor the state of the encryption process.
Since the process is asynchronous, we can use this function to get the state of the encryption process for better UI experience.

```typescript
const logState = (state) => {
	console.log(`Log Encrypt State :: ${state}`)
}
```

The available states are:

- Extract - Getting all the data ready for encryption (values to encrypt, chain information, etc.).
- Pack - Preparing the data for the encryption process.
- Prove - Signing the data.
- Verify - Verifies the user's input, ensuring that it is safe to use (read more about this [here](/docs/devdocs/architecture/internal-utilities/verifier)).
- Replace - Preparing the result and replacing the old values with encrypted ones.
- Done - Process is finished.
