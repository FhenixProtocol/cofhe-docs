---
title: Cofhejs
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Cofhejs

| Aspect               | Description                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Type**             | Typescript Library                                                                                                   |
| **Function**         | Provides functionality to initialize TFHE, generate and manage permits, encrypt input data, and read encrypted data. |
| **Responsibilities** | Handle primary interactions with FHE enabled contracts and the CoFHE Co-Processor.                                   |

Cofhejs is the JavaScript library that provides client-side functionality for interacting with CoFHE smart contracts. It handles encryption, decryption, and communication with the blockchain.

## Installation

To get started with Cofhejs, you need to install it as a dependency in your JavaScript project. You can do this using npm (Node Package Manager) or Yarn. Open your terminal and navigate to your project's directory, then run the following:

<Tabs>
  <TabItem value="yarn" label="yarn">
    ``` yarn add cofhejs ```
  </TabItem>
  <TabItem value="npm" label="npm">
    ``` npm install cofhejs ```
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    ``` pnpm add cofhejs ```
  </TabItem>
</Tabs>

> Note: _For more information on getting started, take a look at the [**Cofhejs getting started**](/docs/devdocs/cofhejs/index.md) guide._

## Key Features

#### Initialization

```javascript
const { cofhejs } = require('cofhejs/node')
const { ethers } = require('ethers')

// initialize your web3 provider
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:42069')
const wallet = new ethers.Wallet(PRIVATE_KEY, provider)

// initialize cofhejs Client with ethers (it also supports viem)
await cofhejs.initializeWithEthers({
	ethersProvider: provider,
	ethersSigner: wallet,
	environment: 'TESTNET',
})
```

> Note: _For more information on getting started, take a look at the [**Cofhejs getting started**](/docs/devdocs/cofhejs/index.md) guide._

- Client-side encryption/decryption

```javascript
const logState = (state: EncryptStep) => {
    console.log(`Log Encrypt State :: ${state}`);
};

// This will encrypt only the encrypted values (total 4 in this case)
const encryptedValues = await cofhejs.encrypt(logState, [
    { a: Encryptable.bool(false), b: Encryptable.uint64(10n), c: "hello" },
    ["hello", 20n, Encryptable.address(contractAddress)],
    Encryptable.uint8("10"),
] as const);

const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);
// Use the encrypted value of 10n
const tx = await contract.add(encryptedValues.data[1]);
```

Cofhejs exposes a function `encrypt` that takes any data type, any `Encryptable` values within the input are extracted into an array, packed, and verified using a ZK Proof of Encryption. For more information on this process and how it works under the hood take a look at the [encryption data flow](../data-flows/encryption-request.md).

- Key management

Cofhejs automatically fetches two keys from CoFHE, the FHE public key and a CRS. These keys are used during the `encrypt` flow, which prepares encrypted inputs to be used as transaction parameters.

> Note: _Read more about encryption [here](/docs/devdocs/cofhejs/encryption-operations)_

- Permits

Permits allow users to access their encrypted data by authenticating the user with an EIP712 signature. Permits can be managed within Cofhejs, or they can be managed within a client dApp directly by using the exposed `Permit` class.

> Note: _Read more about permits [here](/docs/devdocs/cofhejs/permits-management)_

- Reading encrypted data

On-chain FHE operations are symbolic, meaning that an `euint64` is a handle to an encrypted number that lives on the Fhenix Mainnet chain. It is possible to read the encrypted data through an off-chain call by using `cofhejs.unseal()` like so:

```typescript
const resultHandle = await contract.getSomeEncryptedUint32()
const unsealed = await cofhejs.unseal(resultHandle, FheTypes.Uint32)
```

You can read more about unsealing and the underlying process in the [unsealing data-flow page](../data-flows/decrypt-seal-output.md), and you can read more about `cofhejs.unseal` usage [here](/docs/devdocs/cofhejs/sealing-unsealing).
