---
sidebar_position: 1
---

# Overview of FHE Library

The CoFHE library is a Solidity framework that enables secure, private computation on encrypted data within smart contracts. This library allows developers to perform operations on encrypted values without revealing the underlying plaintext data, preserving privacy while maintaining the transparency and trustlessness of blockchain technology.

---

## Core Components

The FHE library consists of the following key components:

### 1. Encrypted Data Types

The library supports multiple encrypted data types, each representing an encrypted version of a standard Solidity type:

| Type | Description | Plaintext Equivalent |
|------|-------------|----------------------|
| `ebool` | Encrypted boolean value | `bool` |
| `euint8` | Encrypted 8-bit unsigned integer | `uint8` |
| `euint16` | Encrypted 16-bit unsigned integer | `uint16` |
| `euint32` | Encrypted 32-bit unsigned integer | `uint32` |
| `euint64` | Encrypted 64-bit unsigned integer | `uint64` |
| `euint128` | Encrypted 128-bit unsigned integer | `uint128` |
| `euint256` | Encrypted 256-bit unsigned integer | `uint256` |
| `eaddress` | Encrypted Ethereum address | `address` |

### 2. Encrypted Input Structures

`ICofhe.sol` defines various input structures that enable secure data submission:

- **`EncryptedInput`**: The core structure containing:
  - 🔐 Ciphertext hash — A unique hash representing the encrypted data, used to reference it across the system.
  - 🛡️ Security zone parameter — Defines the trust context or boundary in which the encrypted data is valid and accessible.
  - 📋 Type indicator — Specifies the data type of the encrypted value (e.g. euint8, euint16) to ensure correct handling.
  - ✅ Cryptographic signature — A signature proving that the data and its metadata were generated and verified by an authorized entity.

- **Type-specific input structures:**
  - `InEuint8`, `InEuint16`, `InEuint32`
  - `InEuint64`, `InEuint128`, `InEuint256`
  - `InEbool`, `InEaddress`

---

### 3. Core Functionality (FHE.sol)

The `FHE` library provides a comprehensive set of operations for encrypted data manipulation:

#### 1. Arithmetic Operations
Enables basic math (FHE.add) directly on encrypted integers.
#### 2. Bitwise Operations
Supports bitwise logic (AND, OR, XOR, shifts) on encrypted data.
#### 3. Comparison Operations
Performs encrypted comparisons (eq, gt, lt, etc.) that return an ebool—an encrypted boolean value that contains the result of the comparison.
#### 4. Control Flow
Includes conditionals like `select` to allowing encrypted branching without revealing decision paths.
#### 4. Data and Access Management
Provides functions for sealing outputs, decrypting values securely, and managing user access via permits, ensuring only authorized parties can access decrypted data.

---

### 4. Task Management

The library interacts with a `TaskManager` contract that coordinates:

- ⚙️ **Execution** of FHE operations
- 🔒 **Access control** for encrypted data
- 🔑 **Decryption request** processing


## Repository Links

The complete CoFHE-Contracts repository is available at:

- 📁 [GitHub Repository](https://github.com/FhenixProtocol/cofhe-contracts)
- 📄 Core Files:
  - [FHE.sol](https://github.com/FhenixProtocol/cofhe-contracts/blob/master/contracts/FHE.sol) - Main library implementation
  - [ICofhe.sol](https://github.com/FhenixProtocol/cofhe-contracts/blob/master/contracts/ICofhe.sol) - Interface definitions and data structures

## Additional Resources

- 📚 [FHE Documentation](../solidity-api/FHE.md) - Detailed API reference
