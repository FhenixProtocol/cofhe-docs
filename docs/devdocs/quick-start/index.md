---
title: Local Development Setup
sidebar_position: 2
description: Setting up your local development environment for Fhenix development
---

# Quick Start


This guide explains how to set up your local development environment for building FHE (Fully Homomorphic Encryption) smart contracts with CoFHE. This starter kit provides everything you need to develop, test, and deploy FHE contracts both locally and on test networks.

The Fhenix development environment consists of several key components:

- **cofhe-hardhat-starter**: Template hardhat project intended to be cloned and used as a starting point.
- **[cofhe-hardhat-plugin](#1-cofhe-hardhat-plugin)**: Hardhat plugin that deploys the `cofhe-mock-contracts` and exposes utilities.
- **[cofhejs](#2-cofhejs)**: JavaScript library for interacting with FHE contracts and the CoFHE coprocessor.
- **[cofhe-mock-contracts](#3-cofhe-mock-contracts)**: Mock contracts that mimic the behavior of the CoFHE coprocessor, used only for local testing.
- **[cofhe-contracts](#4-cofhe-contracts)**: Solidity Libraries and Smart contracts for FHE operations.

## Prerequisites

Before starting, ensure you have:

- Node.js (v20 or later)
- pnpm (recommended package manager)
- Basic familiarity with Hardhat and Solidity

## Installation

1. Clone the `cofhe-hardhat-starter` [repo](https://github.com/fhenixprotocol/cofhe-hardhat-starter):

```bash
git clone https://github.com/fhenixprotocol/cofhe-hardhat-starter.git
cd cofhe-hardhat-starter
```

2. Install dependencies:

```bash
pnpm install
```

## Project Structure

The starter kit provides a well-organized directory structure to help you get started quickly:

- `contracts/`: Contains all your Solidity smart contract source files.
  - `Counter.sol`: An example FHE-enabled counter contract that demonstrates basic FHE operations.
- `test/`: Houses tests that utilize cofhejs and utilities to interact with FHE-enabled contracts.
- `tasks/`: Tasks to deploy and interact with the Counter contract on Arbitrum Sepolia.
- `hardhat.config.ts`: Imports the CoFHE hardhat plugin to deploy mock contracts.

## Local Development Workflow

### 1. Writing FHE Smart Contracts

FHE contracts use special encrypted types and operations from the [FHE library](../fhe-library/index.md):

Example from [Counter.sol](https://github.com/FhenixProtocol/cofhe-hardhat-starter/blob/main/contracts/Counter.sol):
```solidity
import "@fhenixprotocol/cofhe-contracts/FHE.sol";

contract Counter {
    euint32 public count;  // Encrypted uint32

    function increment() public {
        count = FHE.add(count, FHE.asEuint32(1));
        FHE.allowThis(count);
        FHE.allowSender(count);
    }

    // More functions...
}
```

Key FHE Concepts & Documentation References
- `euint32`, `ebool` - [Encrypted data types](../fhe-library/data-evaluation.md)
- `FHE.add`, `FHE.sub` - [FHE Operations on encrypted values](../fhe-library/fhe-encrypted-operations.md)
- `FHE.allowThis`, `FHE.allowSender` - [Access Control Management](../fhe-library/acl-mechanism.md)

### 2. Testing with Mock Environment

For rapid development, use the mock environment:

```bash
pnpm test
```

This runs your tests with mock FHE operations, allowing quick iteration without external dependencies.

Example test:

```typescript
it('Should increment the counter', async function () {
	const { counter, bob } = await loadFixture(deployCounterFixture)

	// Check initial value
	const count = await counter.count()
	await mock_expectPlaintext(bob.provider, count, 0n)

	// Increment counter
	await counter.connect(bob).increment()

	// Check new value
	const count2 = await counter.count()
	await mock_expectPlaintext(bob.provider, count2, 1n)
})
```

### 3. Deploying to Testnet

When ready for more realistic testing, deploy to a Sepolia testnet:

1. Create a `.env` file with your private key and RPC URLs:

```
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=your_sepolia_rpc_url
ARBITRUM_SEPOLIA_RPC_URL=your_arbitrum_sepolia_rpc_url
```

2. Deploy your contract:

```bash
# For Ethereum Sepolia
pnpm eth-sepolia:deploy-counter

# For Arbitrum Sepolia
pnpm arb-sepolia:deploy-counter
```

3. Interact with your deployed contract (using tasks):

```bash
# For Ethereum Sepolia
pnpm eth-sepolia:increment-counter

# For Arbitrum Sepolia
pnpm arb-sepolia:increment-counter
```

## Creating Custom Tasks

You can create custom Hardhat tasks for your contracts in the `tasks/` directory:

Task example for [increment-counter](https://github.com/FhenixProtocol/cofhe-hardhat-starter/blob/main/tasks/increment-counter.ts)
```typescript
task("increment-counter", "Increment the counter on the deployed contract")
  .setAction(async (_, hre: HardhatRuntimeEnvironment) => {
    const { ethers, network } = hre;

	// Your task logic here...

  // Get the signer
    const [signer] = await ethers.getSigners();
    console.log(`Using account: ${signer.address}`);
    await cofhejs_initializeWithHardhatSigner(signer);

	// Interact with your contract
	// ...
})
```

## Key Components

### 1. cofhe-hardhat-plugin

This plugin provides essential tools for developing FHE contracts:

- **Network Configuration**: Automatically configures [supported networks](../pay-attention/component-compatibility.md)
- **Testing Utilities**: Helpers for testing FHE contracts
- **Mock Integration**: Sets up mock contracts for local testing

### 2. Cofhejs

The JavaScript library for working with FHE contracts:

- **Encrypt/Decrypt**: Encrypt data to send to contracts and decrypt results.
- **Querying**: Fetch encrypted values from FHE contracts.
- **Authentication**: Uses Permits to authenticate connected users when requesting confidential data.

Another test example of the whole flow of Cofhejs:

```typescript
it('Full cofhejs flow', async function () {
    const [bob] = await hre.ethers.getSigners()

    const CounterFactory = await hre.ethers.getContractFactory('Counter')
    const counter = await CounterFactory.connect(bob).deploy()

    // `expectResultSuccess` is a helper function that ensures that the
    // `Result` type returned by all `cofhejs` functions has succeeded.
    // If the inner function (e.g. `cofhejs_initializeWithHardhatSigner`)
    // fails, the test will fail.
    expectResultSuccess(await cofhejs_initializeWithHardhatSigner(bob))

    // Encrypt a value
    const [encryptedInput] = expectResultSuccess(
        await cofhejs.encrypt((step) => 
            console.log(`Encrypt step - ${step}`), [Encryptable.uint32(5n)]))

    // Use the encrypted input to reset the counter
    await counter.connect(bob).reset(encryptedInput)

    // Fetch the hash of the encrypted counter value
    const encryptedValue = await counter.count()

    // Unseal an encrypted value
    const unsealedResult = expectResultSuccess(
        await cofhejs.unseal(encryptedValue, FheTypes.Uint32))

    // Check the unsealed result
    expect(unsealedResult).equal(5n)
})
```

### 3. cofhe-mock-contracts

These contracts provide mock implementations for FHE functionality:

- Allows testing without actual FHE operations
- Simulates the behavior of the real FHE environment
- Stores plaintext values on-chain for testing purposes

:::note
Note that in the mock environment, gas costs are higher than in production due to the additional operations needed to simulate FHE behavior. This is especially noticeable when logging is enabled.
:::

### 4. cofhe-contracts
Package of Solidity libraries and smart contracts for FHE operations:
- **FHE.sol Library**: The only import you need to start using FHE functionality in your contracts
- **Complete [API Reference](../solidity-api/FHE.md)** for all available functions and types


## Development Environments

CoFHE supports multiple development environments:

1. **MOCK Environment**:

   - Fastest development cycle
   - No external dependencies
   - Uses mock contracts to simulate FHE operations

2. **Sepolia Testnet**:
   - Public testnet for real FHE operations
   - Requires ETH from the Sepolia faucet
   - Available on Ethereum Sepolia and Arbitrum Sepolia

:::note
 Environment detection happens automatically in most cases. When testing on the hardhat network with mocks deployed (e.g., in unit tests), `cofhejs_initializeWithHardhatSigner` will detect the hardhat network and set `environment: "MOCK"` in the underlying `cofhejs.initialize(...)` call. When using tasks that connect to networks like `arb-sepolia`, the environment will automatically be set to `environment: "TESTNET"`. This environment setting is crucial as it determines how `cofhejs` handles encryption and unsealing operations.
:::



## Development Guidelines

1. **Start with Mock Environment**: Begin development using mock contracts for faster iteration and debugging. This approach eliminates external dependencies and provides immediate feedback.

2. **Test Thoroughly**: Write comprehensive tests covering both mock and testnet environments. Ensure your application behaves consistently across environments and handles edge cases properly.

3. **Permission Management**: Always set proper permissions with `FHE.allowThis()` and `FHE.allowSender()` to control which contracts and addresses can access encrypted data. [Proper permission management](../tutorials/acl-usage-examples.md) is crucial for maintaining privacy and security in FHE applications.

4. **Error Handling**: Implement robust error handling for FHE operations. Be prepared for potential decryption delays and use appropriate retry mechanisms. Check the [Key Considerations](../pay-attention/index.md) page for common errors and their solutions.
5. **Gas Optimization**: Be aware that FHE operations cost more gas than standard operations. Mock environments will simulate higher gas consumption than actual production environments. For accurate gas estimation, always test on the testnet before deployment. Refer to the [Compatibility](../pay-attention/component-compatibility.md) page for the latest supported networks.

### What's Next?
[More tutorials can be found here](../../indexes/tutorials.md)


### Resources
- [Fhenix Documentation](https://docs.fhenix.zone)
- [Cofhejs GitHub](https://github.com/FhenixProtocol/cofhejs)
- [CoFHE Contracts GitHub](https://github.com/FhenixProtocol/cofhe-contracts)
