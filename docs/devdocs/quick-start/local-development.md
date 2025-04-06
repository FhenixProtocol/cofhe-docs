---
title: Local Development Setup
sidebar_position: 2
description: Setting up your local development environment for Fhenix development
---

# Local Development Setup

## Overview

This guide explains how to set up your local development environment for building FHE (Fully Homomorphic Encryption) smart contracts with Fhenix. This starter kit provides everything you need to develop, test, and deploy FHE contracts both locally and on Fhenix test networks.

The Fhenix development environment consists of several key components:

- **cofhe-hardhat-starter**: Base project with example contracts and configuration
- **cofhe-hardhat-plugin**: Hardhat plugin for FHE-specific functionality
- **cofhejs**: JavaScript library for interacting with FHE contracts
- **cofhe-mock-contracts**: Mock implementations for local testing

## Prerequisites

Before starting, ensure you have:

- Node.js (v18 or later)
- pnpm (recommended package manager)
- Basic familiarity with Hardhat and Solidity

## Installation

1. Clone the repository:

```bash
git clone https://github.com/fhenixprotocol/cofhe-hardhat-starter.git
cd cofhe-hardhat-starter
```

2. Install dependencies:

```bash
pnpm install
```

## Project Structure

- `contracts/`: Smart contract source files
  - `Counter.sol`: Example FHE counter contract
- `test/`: Test files for your contracts
- `tasks/`: Hardhat tasks for deployment and interaction
- `hardhat.config.ts`: Network and plugin configuration

## Key Components

### 1. cofhe-hardhat-plugin

This plugin provides essential tools for developing FHE contracts:

- **Network Configuration**: Automatically configures supported networks
- **Testing Utilities**: Helpers for testing FHE contracts
- **Mock Integration**: Sets up mock contracts for local testing

### 2. cofhejs

The JavaScript library for working with FHE contracts:

- **Encrypt/Decrypt**: Encrypt data to send to contracts and decrypt results
- **Unsealing**: Unseal encrypted values from the blockchain
- **Permit Management**: Handle secure contract interactions

Example usage:

```typescript
// Initialize with your signer
await cofhejs_initializeWithHardhatSigner(signer)

// Encrypt a value
const [encryptedInput] = await cofhejs.encrypt((step) => console.log(`Encrypt step - ${step}`), [Encryptable.uint32(5n)])

// Decrypt a value from a contract
const decryptedResult = await cofhejs.decrypt(encryptedValue, FheTypes.Uint32)

// Unseal an encrypted value
const unsealedResult = await cofhejs.unseal(encryptedValue, FheTypes.Uint32)
```

### 3. cofhe-mock-contracts

These contracts provide mock implementations for FHE functionality:

- Allows testing without actual FHE operations
- Simulates the behavior of the real FHE environment
- Stores plaintext values on-chain for testing purposes

## Development Environments

Fhenix supports multiple development environments:

1. **MOCK Environment**:

   - Fastest development cycle
   - No external dependencies
   - Uses mock contracts to simulate FHE operations

2. **Sepolia Testnet**:
   - Public testnet for real FHE operations
   - Requires ETH from the Sepolia faucet
   - Available on Ethereum Sepolia and Arbitrum Sepolia

## Local Development Workflow

### 1. Writing FHE Smart Contracts

FHE contracts use special encrypted types and operations from the FHE library:

```solidity
// Example from Counter.sol
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

Key concepts:

- `euint32`, `ebool` - Encrypted data types
- `FHE.add`, `FHE.sub` - Operations on encrypted values
- `FHE.allowThis`, `FHE.allowSender` - Permission management

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

3. Interact with your deployed contract:

```bash
# For Ethereum Sepolia
pnpm eth-sepolia:increment-counter

# For Arbitrum Sepolia
pnpm arb-sepolia:increment-counter
```

## Creating Custom Tasks

You can create custom Hardhat tasks for your contracts in the `tasks/` directory:

```typescript
task('my-custom-task', 'Description of your task').setAction(async (_, hre: HardhatRuntimeEnvironment) => {
	const { ethers } = hre

	// Your task logic here...

	// Initialize cofhejs with a signer
	const [signer] = await ethers.getSigners()
	await cofhejs_initializeWithHardhatSigner(signer)

	// Interact with your contract
	// ...
})
```

## Best Practices

1. **Start with Mock Environment**: Begin development using mock contracts for faster iteration.
2. **Test Thoroughly**: Write comprehensive tests for both mock and testnet environments.
3. **Permission Management**: Always set proper permissions with `FHE.allowThis` and `FHE.allowSender`.
4. **Error Handling**: Handle decryption delays with proper retry mechanisms.
5. **Gas Optimization**: Be aware that FHE operations cost more gas than standard operations.

## Resources

- [Fhenix Documentation](https://docs.fhenix.zone)
- [cofhejs GitHub](https://github.com/FhenixProtocol/cofhejs)
- [CoFHE Contracts GitHub](https://github.com/FhenixProtocol/cofhe-contracts)
