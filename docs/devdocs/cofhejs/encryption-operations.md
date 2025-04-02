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
    
let result: EncryptableBool = await cofhejs.encrypt(logState, [EncryptionTypes.bool(true)]);
let result: EncryptableUint8 = await cofhejs.encrypt(logState, [EncryptionTypes.uint8(10)]);
let result: EncryptableUint16 = await cofhejs.encrypt(logState, [EncryptionTypes.uint16(10)]);
let result: EncryptableUint32 = await cofhejs.encrypt(logState, [EncryptionTypes.uint32(10)]);
let result: EncryptableUint64 = await cofhejs.encrypt(logState, [EncryptionTypes.uint64(10)]);
let result: EncryptableUint128 = await cofhejs.encrypt(logState, [EncryptionTypes.uint128(10)]);
let result: EncryptableUint256 = await cofhejs.encrypt(logState, [EncryptionTypes.uint256(10)]);
let result: EncryptableAddress = await cofhejs.encrypt(logState, [EncryptionTypes.address("0x1234567890123456789012345678901234567890")]);
```

Or, we can use the nested form to encrypt multiple values at once:

```javascript

let result = await cofhejs.encrypt(logState, [EncryptionTypes.bool(true), EncryptionTypes.uint8(10), EncryptionTypes.uint16(10), EncryptionTypes.uint32(10), EncryptionTypes.uint64(10), EncryptionTypes.uint128(10), EncryptionTypes.uint256(10), EncryptionTypes.address("0x1234567890123456789012345678901234567890")]);

```

The returned types from the encrypt function will be of the type `CoFheInUint8`, `CoFheInUint16` or `CoFheInUintUint32` (or 64/128/256 etc.) depending on the type you specified.

The `EncryptedUint` types sound scary, but are actually pretty simple. It's just a

```typescript
export interface EncryptedNumber {
  data: Uint8Array;
  securityZone: number; // defaults to 0
}

export interface EncryptedUint8 extends EncryptedNumber {}
```

These types exist in order to enable type checking when interacting with Solidity contracts, and to make it easier to work with encrypted data.  
However, feel free to use the `data` field directly if you prefer.

### setState

The setState function is used to monitor the state of the encryption process.
Since the process is asynchronous, we can use this function to get the state of the encryption process for better UI experience.

```typescript
const logState = (state) => {
    console.log(`Log Encrypt State :: ${state}`);
};
```
The available states are:
- Extract - Getting all the data ready for encryption (values to encrypt, chain information, etc.).
- Pack - Preparing the data for the encryption process.
- Prove - Signing the data.
- Verify - Verifies the user's input, ensuring that it is safe to use (read more about this [here](/docs/devdocs/architecture/internal-utilities/verifier)).
- Replace - Prepering the result and replacing the old values with encrypted ones.
- Done - Process is finished.