---
title: FHERC20 Token Standard
sidebar_position: 2
---

# FHERC20 Contract Documentation

## Overview

The FHERC20 contract is an implementation of a Fully Homomorphic Encryption (FHE) enabled ERC20 token. It provides confidentiality for token balances through encrypted operations while maintaining compatibility with existing ERC20 infrastructure.

## Core Concepts

### Encrypted Balances

The FHERC20 contract stores balances as encrypted values (`euint128`) using the Fhenix CoFHE coprocessor. These encrypted balances preserve user privacy while allowing for secure operations. The actual token balance of an address is kept confidential and can only be accessed under specific conditions:

1. By the owner of the balance
2. Through sealed decryption (using a public/private key pair)
3. As part of FHE operations where the value remains encrypted throughout

### Indicated Balances

To maintain compatibility with existing ERC20 infrastructure (wallets, block explorers), FHERC20 implements a concept called "indicated balances". These are public values that:

- Range from 0.0000 to 0.9999 (represented internally as 0-9999)
- Start at 0 for non-interacted accounts
- Initialize at 0.5001 upon first interaction
- Increment/decrement by 0.0001 with each transaction
- Provide visual feedback of balance changes without revealing true amounts

The indicated balance system allows users to see activity in their wallets without exposing the encrypted values.

### EIP712 Permissions vs Allowances

FHERC20 removes the traditional ERC20 allowance system and instead uses EIP712 signatures for permissioned transfers:

- Each `encTransferFrom` operation requires a valid EIP712 signature
- Permissions are single-use and do not grant ongoing access to funds
- This prevents leakage of balance information while maintaining secure delegation

## Contract Structure

### State Variables

```solidity
mapping(address account => uint16) internal _indicatedBalances;
mapping(address account => euint128) private _encBalances;

uint16 internal _indicatedTotalSupply;
euint128 private _encTotalSupply;

string private _name;
string private _symbol;
uint8 private _decimals;
uint256 private _indicatorTick;
```

- `_indicatedBalances`: Stores the non-encrypted indicator value for each account
- `_encBalances`: Stores the encrypted balances for each account
- `_indicatedTotalSupply`: The non-encrypted indicator of total supply
- `_encTotalSupply`: The encrypted total token supply
- `_name`, `_symbol`, `_decimals`: Standard ERC20 token metadata
- `_indicatorTick`: Value used to calculate the indicator step (typically 10^(decimals-4))

### EIP712 Constants

```solidity
bytes32 private constant PERMIT_TYPEHASH =
    keccak256(
        "Permit(address owner,address spender,uint256 value_hash,uint256 nonce,uint256 deadline)"
    );
```

## Constructor

```solidity
constructor(
    string memory name_,
    string memory symbol_,
    uint8 decimals_
) EIP712(name_, "1")
```

Initializes the token with a name, symbol, and decimal precision. Also initializes the EIP712 domain separator for permissioned transfers.

## Public Functions

### Metadata Functions

```solidity
function isFherc20() public view virtual returns (bool)
function name() public view virtual returns (string memory)
function symbol() public view virtual returns (string memory)
function decimals() public view virtual returns (uint8)
```

Standard token metadata functions, with the addition of `isFherc20()` that identifies this as an FHERC20 token.

### Balance and Supply Functions

```solidity
function totalSupply() public view virtual returns (uint256)
function encTotalSupply() public view virtual returns (euint128)
function balanceOfIsIndicator() public view virtual returns (bool)
function indicatorTick() public view returns (uint256)
function balanceOf(address account) public view virtual returns (uint256)
function encBalanceOf(address account) public view virtual returns (euint128)
```

Provides both encrypted and indicated balance/supply information:

- `totalSupply()`: Returns the indicated total supply (non-encrypted)
- `encTotalSupply()`: Returns the encrypted total supply
- `balanceOfIsIndicator()`: Always returns true to indicate this uses the indicator system
- `indicatorTick()`: Returns the value of one indicator increment
- `balanceOf()`: Returns the indicated balance for an account (non-encrypted)
- `encBalanceOf()`: Returns the encrypted balance for an account

### Transfer Functions

```solidity
function transfer(address, uint256) public pure returns (bool)
function encTransfer(address to, inEuint128 memory inValue) public virtual returns (euint128 transferred)
function transferFrom(address, address, uint256) public pure returns (bool)
function encTransferFrom(
    address from,
    address to,
    inEuint128 memory inValue,
    FHERC20_EIP712_Permit calldata permit
) public virtual returns (euint128 transferred)
```

The standard ERC20 `transfer` and `transferFrom` functions intentionally revert to prevent accidental use of FHERC20 tokens as standard ERC20s. They are replaced by:

- `encTransfer`: Transfers encrypted tokens using an encrypted input value
- `encTransferFrom`: Transfers tokens on behalf of another account, requiring an EIP712 signature

### Allowance Functions

```solidity
function allowance(address, address) external pure returns (uint256)
function approve(address, uint256) external pure returns (bool)
```

Both functions revert with `FHERC20IncompatibleFunction()` since the standard allowance system is replaced with EIP712 permits.

### EIP712 and Utility Functions

```solidity
function nonces(address owner) public view returns (uint256)
function DOMAIN_SEPARATOR() external view virtual returns (bytes32)
function resetIndicatedBalance() external
```

- `nonces`: Tracks the EIP712 nonce for each address (for replay protection)
- `DOMAIN_SEPARATOR`: Returns the EIP712 domain separator
- `resetIndicatedBalance`: Allows a user to reset their own indicated balance to zero

## Internal Functions

### Core Balance Management

```solidity
function _transfer(address from, address to, euint128 value) internal returns (euint128 transferred)
function _update(address from, address to, euint128 value) internal virtual returns (euint128 transferred)
function _mint(address account, uint128 value) internal returns (euint128 transferred)
function _burn(address account, uint128 value) internal returns (euint128 transferred)
```

These functions manage token movements:

- `_transfer`: Internal implementation of transfer logic
- `_update`: Core function that handles all balance updates (transfers, mints, burns)
- `_mint`: Creates new tokens and assigns them to an account
- `_burn`: Destroys tokens from an account

### Indicator Management

```solidity
function _incrementIndicator(uint16 current) internal pure returns (uint16)
function _decrementIndicator(uint16 value) internal pure returns (uint16)
```

Utility functions for managing the indicator values:

- `_incrementIndicator`: Increases an indicator by 1 (representing +0.0001)
- `_decrementIndicator`: Decreases an indicator by 1 (representing -0.0001)

## Events

The contract inherits and emits standard ERC20 events:

- `Transfer(address indexed from, address indexed to, uint256 value)`: Emitted for all transfers with the indicator tick as value
- `EncTransfer(address indexed from, address indexed to, bytes32 evalue)`: Emitted with the encrypted transfer value

## Security Considerations

1. **Access Control**: The contract implements FHE access controls to ensure only authorized parties can decrypt balances
2. **Overflow Protection**: Uses FHE operations that prevent overflow in encrypted values
3. **Encryption Leakage**: Carefully designed to prevent leaking information about encrypted balances
4. **Signature Validation**: Implements proper signature validation for EIP712 permits

## Usage Notes

1. All standard ERC20 functions that would compromise privacy (`transfer`, `approve`, `transferFrom`, `allowance`) intentionally revert
2. Applications must use the `enc`-prefixed functions for actual token operations
3. The indicator system is a transitional mechanism until infrastructure better supports encrypted tokens
4. Users can opt out of the indicator system by calling `resetIndicatedBalance()`

## Advanced Features

### Encrypted Transfers

The contract implements a confidential transfer system where:

- Transfers use encrypted values (`inEuint128`)
- The actual amount transferred is only known to the parties involved
- The contract performs encrypted comparisons to ensure sufficient balances
- If a user attempts to transfer more than their balance, the transfer will succeed but with zero tokens moved

### Access Control for Encrypted Values

The `_update` function handles FHE access control:

```solidity
if (euint128.unwrap(_encBalances[from]) != 0) {
    FHE.allowThis(_encBalances[from]);
    FHE.allow(_encBalances[from], from);
    FHE.allow(transferred, from);
}
if (euint128.unwrap(_encBalances[to]) != 0) {
    FHE.allowThis(_encBalances[to]);
    FHE.allow(_encBalances[to], to);
    FHE.allow(transferred, to);
}

FHE.allow(transferred, msg.sender);
FHE.allowGlobal(_encTotalSupply);
```

This ensures:

- Users can access their own balances
- The contract can perform operations on balances
- Total supply is globally accessible

## Handling Transfer Results

A critical aspect of FHERC20 is the need to properly handle the result of transfer operations. Due to privacy guarantees, the FHERC20 contract implements a unique pattern for transfers:

### Understanding Zero-Replacement in Transfers

When a user attempts to transfer more tokens than they have, the FHERC20 contract does not revert the transaction. Instead, it:

1. Performs an encrypted comparison between the requested transfer amount and the user's balance
2. If there are insufficient funds, it replaces the transfer amount with zero
3. Returns the actual transferred amount (which could be either the requested amount or zero)

This behavior is implemented in the `_update` function:

```solidity
if (from != address(0)) {
    transferred = FHE.select(
        value.lte(_encBalances[from]),
        value,
        FHE.asEuint128(0)
    );
} else {
    transferred = value;
}
```

### Two-Step Process for Transfer-Dependent Operations

If your contract needs to perform operations based on the actual transferred amount, you must use a two-step process:

1. **First Transaction**: Perform the transfer and decrypt the result

   ```solidity
   euint128 transferred = _burn(msg.sender, value);
   FHE.decrypt(transferred);
   ```

2. **Create a Claim**: Store the information about the pending operation

   ```solidity
   _createClaim(to, value, transferred);
   ```

3. **Second Transaction**: Process the operation once the decryption result is available

   ```solidity
   function claimDecrypted(uint256 ctHash) public {
       Claim memory claim = _handleClaim(ctHash);

       // Only now perform operations that depend on the actual amount
       _erc20.safeTransfer(claim.to, claim.decryptedAmount);
   }
   ```

### Example Implementation Pattern

The `ConfidentialERC20` contract demonstrates this pattern:

```solidity
function decrypt(address to, uint128 value) public {
    if (to == address(0)) revert InvalidRecipient();

    // Step 1: Perform the transfer and decrypt the result
    euint128 burned = _burn(msg.sender, value);
    FHE.decrypt(burned);

    // Step 2: Create a claim for later processing
    _createClaim(to, value, burned);
    emit DecryptedERC20(msg.sender, to, value);
}

function claimDecrypted(uint256 ctHash) public {
    // Step 3: Process the operation once decryption is complete
    Claim memory claim = _handleClaim(ctHash);

    // Send the ERC20 to the recipient using the actual decrypted amount
    _erc20.safeTransfer(claim.to, claim.decryptedAmount);
    emit ClaimedDecryptedERC20(msg.sender, claim.to, claim.decryptedAmount);
}
```

The `ConfidentialClaim` contract handles the claim management:

```solidity
function _handleClaim(uint256 ctHash) internal returns (Claim memory claim) {
    claim = _claims[ctHash];

    // Verify the claim exists and hasn't been processed yet
    if (claim.to == address(0)) revert ClaimNotFound();
    if (claim.claimed) revert AlreadyClaimed();

    // Get the decrypted amount (only available after decryption completes)
    uint128 amount = SafeCast.toUint128(FHE.getDecryptResult(ctHash));

    // Update and finalize the claim
    claim.decryptedAmount = amount;
    claim.decrypted = true;
    claim.claimed = true;

    // ... further claim processing ...
}
```

### Important Considerations

1. **Asynchronous Processing**: Decryption results are not available in the same transaction
2. **Gas Efficiency**: The two-step process requires multiple transactions, which affects gas costs
3. **User Experience**: Applications should account for the waiting period between steps
4. **Security**: Claims must be properly tracked and validated to prevent unauthorized access
5. **Error Handling**: Implement proper error handling for cases where the transferred amount is zero

This pattern ensures that confidential transfers can be safely integrated with other smart contract operations, preserving both privacy and transactional integrity.
