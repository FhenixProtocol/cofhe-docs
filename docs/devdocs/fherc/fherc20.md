---
title: FHERC20 Token Standard
sidebar_position: 2
---

# FHERC20 Token Standard

FHERC20 is a confidential token standard that extends the familiar ERC20 interface with Fully Homomorphic Encryption (FHE) capabilities. This standard enables private token operations while maintaining compatibility with existing blockchain infrastructure.

## Overview

FHERC20 tokens operate similarly to traditional ERC20 tokens but with enhanced privacy features:

- **Encrypted Balances**: All token balances are stored in encrypted form
- **Private Transfers**: Token transfers are conducted without revealing amounts
- **Confidential Total Supply**: The total token supply can be kept private
- **Zero-Knowledge Operations**: Token operations are performed on encrypted data

## Key Features

### Standard Implementation
- Implements core ERC20 functions with FHE encryption
- Supports encrypted balance queries
- Enables confidential transfer operations
- Maintains encrypted allowances for delegated transfers

### Custom Capabilities
- Homomorphic addition and subtraction for token amounts
- Encrypted balance verification
- Private approval mechanisms
- Batch transfer operations on encrypted values

### Security Considerations
- Utilizes robust FHE encryption schemes
- Implements secure key management
- Provides transaction privacy guarantees
- Maintains balance consistency through encrypted operations

## Technical Implementation

FHERC20 tokens use FHE to perform operations directly on encrypted data:

```solidity
function transfer(address to, bytes calldata encryptedAmount) public returns (bool)
function balanceOf(address account) public view returns (bytes memory)
function approve(address spender, bytes calldata encryptedAmount) public returns (bool)
```

Each operation preserves privacy while ensuring the same functionality as traditional ERC20 tokens. The standard maintains compatibility with existing blockchain infrastructure while adding the privacy benefits of FHE. 