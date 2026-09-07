---
sidebar_position: 2
---

# Compatibility

> **Essential version information for all CoFHE ecosystem components**

This document provides detailed compatibility information for all components in the CoFHE ecosystem. Following these version requirements is crucial for maintaining a stable and secure development environment.

## Core Components

| Component | Current Version | Minimum Compatible Version                                                                | Notes |
|-----------|----------------|-------------------------------------------------------------------------------------------|-------|
| **cofhe-contracts** | [`0.0.13`](https://github.com/FhenixProtocol/cofhe-contracts/tree/v0.0.13) ([abi](https://cofhe-docs.s3.us-east-1.amazonaws.com/v0.0.13/index.html)) | [`0.0.13`](https://github.com/FhenixProtocol/cofhe-contracts/tree/v0.0.13) ([abi](https://cofhe-docs.s3.us-east-1.amazonaws.com/v0.0.13/index.html))      | Solidity Libraries and Smart contracts for FHE operations. |
| **Cofhejs** | [`0.3.1`](https://github.com/FhenixProtocol/cofhejs/releases/tag/v0.3.1) | [`0.2.1-alpha.1`](https://github.com/FhenixProtocol/cofhejs/releases/tag/v0.2.1-alpha.1) | JavaScript library for interacting with FHE contracts and the CoFHE coprocessor. |
| **cofhe-mock-contracts** | [`0.3.1`](https://github.com/FhenixProtocol/cofhe-mock-contracts/releases/tag/v0.3.1) | [`0.2.1-alpha.3`](https://github.com/FhenixProtocol/cofhe-mock-contracts/releases/tag/v0.2.1-alpha.3) | Solidity contracts that mimic CoFHE off-chain behavior. |
| **cofhe-hardhat-plugin** | [`0.3.1`](https://github.com/FhenixProtocol/cofhe-hardhat-plugin/releases/tag/v0.3.1) | [`0.2.1-alpha.3`](https://github.com/FhenixProtocol/cofhe-hardhat-plugin/releases/tag/v0.2.1-alpha.3) | Hardhat plugin that deploys the cofhe-mock-contracts and exposes utilities. |


## Network Compatibility

| Network | Chain ID | Compatible | API Version | Notes | Plugin name |
|---------|----------|------------|-------------|-------|-------|
| **Sepolia** | `11155111` | ✅ | `v1` | Full support | eth-sepolia |
| **Arbitrum Sepolia** | `421614` | ✅ | `v1` | Full support | arb-sepolia |
| **Base Sepolia** | `84532` | ✅ | `v1` | Full support via `@cofhe/sdk` / app tooling | base-sepolia |

> 🚀 **More Networks Coming Soon!** We're actively working on expanding network support to bring CoFHE's powerful privacy features to even more chains. Stay tuned for exciting updates!