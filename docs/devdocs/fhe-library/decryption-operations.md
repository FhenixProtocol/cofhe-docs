---
title: Decryption Operations
sidebar_position: 7
description: Understanding how to decrypt encrypted data in FHE smart contracts
---

Decryption is the process of converting encrypted data back into its original form. In the context of Fully Homomorphic Encryption (FHE), decryption allows for the retrieval of results after performing computations on encrypted data.

:::tip[Deep Dive]
We recommend reading more about our unique MPC decryption threshold network [here](../architecture/internal-utilities/threshold-network.md)
:::

## Understanding Asynchronous Decryption

Like all other FHE operations in CoFHE, decryption is executed asynchronously. 
This means:
1. You request decryption
2. The operation takes some time to complete
3. The results are being stored on chain, and then you can use them.

:::tip[Deep Dive]
To understand why FHE operations (including decryption) are asynchronous, [read more here](./data-evaluation.md).
:::

## Decryption in query vs. in transaction

Fhenix provides two primary ways to perform decryption, each suited for different use cases:

#### **1. Decryption via Solidity Contract Transaction**
Decryption is requested in a smart contract transaction, storing the result on-chain for all to access. This ensures auditability but incurs higher gas costs and makes the result public.

#### **2. Decryption via RPC Query**
Decryption is requested off-chain via an RPC query, returning the result only to the requester. This method keeps data private and reduces gas costs but prevents smart contract usage of the decrypted value.

Read more about this and get examples [here](../cofhejs/)

| **Method**            | **Visibility**     | **Gas Cost** | **Smart Contract Usable** | **Best For** |
|----------------------|------------------|------------|-----------------------|-------------|
| **Transaction (on-chain)** | Public (on-chain) | High       | ✅ Yes                 | Public results, contract logic |
| **Query (off-chain)**     | Private (off-chain) | None        | ❌ No                  | Confidential data, external apps |

## Asynchronous On-Chain Decryption

When decrypting data on-chain, you first request decryption using `FHE.decrypt()`, then later retrieve the results. There are two ways to retrieve decryption results: the safe way (recommended) and the unsafe way. Let's look at both approaches.

### Example 1: Safe Decryption (Recommended)

Use `FHE.getDecryptResultSafe(eParam)` to get both the decrypted value and a plaintext boolean success indicator:

```sol
// ------------------------------------------------------
// Step 1. Request on-chain decryption (in transaction)
// ------------------------------------------------------
function closeBidding() external onlyAuctioneer {
  FHE.decrypt(highestBid);
  auctionClosed = true;
}

// ------------------------------------------------------
// Step 2. Process the decrypted result
// ------------------------------------------------------
function safelyRevealWinner() external onlyAuctioneer {
  (uint64 bidValue, bool bidReady) = FHE.getDecryptResultSafe(highestBid);
  require(bidReady, "Bid not yet decrypted");

  winningBid = bidValue;
  emit RevealedWinningBid(winningBidder, bidValue);
}
```

See the full working example [here](#full-example-contract)

The safe method returns both the decrypted value and a boolean indicating whether decryption is complete. This gives you control over how to handle cases where the result isn't ready yet, allowing for more graceful error handling and user experience.

### Example 2: Unsafe Decryption

The second way of querying decryption results is using the function `FHE.getDecryptResult(eParam)` .
It doesn't check readiness for you, and you get no indication to work with. If decryption is ready, you get the decrypted value, otherwise - the execution is reverted. 

:::warning
The unsafe method will revert the transaction if the decryption results aren't ready yet.
:::

```sol
// ------------------------------------------------------
// Step 1. Request on-chain decryption (in transaction)
// ------------------------------------------------------
function closeBidding() external onlyAuctioneer {
  FHE.decrypt(highestBid);
  auctionClosed = true;
}

// ------------------------------------------------------
// Step 2. Process the decrypted result
// ------------------------------------------------------
function unsafeRevealWinner() external onlyAuctioneer {
  uint64 bidValue = FHE.getDecryptResult(highestBid);

  winningBid = bidValue;
  emit RevealedWinningBid(winningBidder, bidValue);
}
```

See the full working example [here](#full-example-contract)

The unsafe method is simpler but more rigid - it automatically reverts the entire transaction if decryption results aren't ready. This may be suitable for cases where you want to fail fast and don't need custom error handling.

## Decryption Permissions

## Access Control

As with all FHE operations, you must have permission to decrypt a ciphertext. Read more about [Access Control](./acl-mechanism.md) to understand the permissions system.

## Full Example Contract

```sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19 <0.9.0;

import "@fhenixprotocol/cofhe-contracts/FHE.sol";

contract AuctionExample {
  address private auctioneer;
  euint64 private highestBid;
  eaddress private highestBidder;
  uint64 public winningBid;
  address public winningBidder;
  bool public auctionClosed;

  event RevealedWinningBid(address winner, uint64 amount);

  modifier onlyAuctioneer() {
    require(
      msg.sender == auctioneer,
      "Only the auctioneer can call this function"
    );
    _;
  }

  constructor() {
    auctioneer = msg.sender; // Set deployer as auctioneer
    auctionClosed = false;
    highestBid = FHE.asEuint64(0);
    highestBidder = FHE.asEaddress(address(0));

    // Preserve ownership for further access
    FHE.allowThis(highestBid);
    FHE.allowThis(highestBidder);
  }

  function bid(uint256 amount) external {
    require(!auctionClosed, "Auction is closed");

    euint64 emount = FHE.asEuint64(amount);
    ebool isHigher = FHE.gt(emount, highestBid);
    highestBid = FHE.max(emount, highestBid);
    highestBidder = FHE.select(
      isHigher,
      FHE.asEaddress(msg.sender), // Encrypt the sender's address
      highestBidder
    );

    // Preserve ownership for further access
    FHE.allowThis(highestBid);
    FHE.allowThis(highestBidder);
  }

  // ------------------------------------------------------
  // Step 1. Request on-chain decryption (in transaction)
  // ------------------------------------------------------
  function closeBidding() external onlyAuctioneer {
    require(!auctionClosed, "Auction is already closed");
    FHE.decrypt(highestBid);
    FHE.decrypt(highestBidder);
    auctionClosed = true;
  }

  // ------------------------------------------------------
  // Step 2. Process the decrypted result
  // ------------------------------------------------------
  function safelyRevealWinner() external onlyAuctioneer {
    require(auctionClosed, "Auction isn't closed");

    (uint64 bidValue, bool bidReady) = FHE.getDecryptResultSafe(highestBid);
    require(bidReady, "Bid not yet decrypted");

    (address bidderValue, bool bidderReady) = FHE.getDecryptResultSafe(highestBidder);
    require(bidderReady, "Bid not yet decrypted");

    winningBid = bidValue;
    winningBidder = bidderValue;
    emit RevealedWinningBid(bidderValue, bidValue);
  }

  function unsafeRevealWinner() external onlyAuctioneer {
    require(auctionClosed, "Auction isn't closed");

    uint64 bidValue = FHE.getDecryptResult(highestBid);
    address bidderValue = FHE.getDecryptResult(highestBidder);

    winningBid = bidValue;
    winningBidder = bidderValue;
    emit RevealedWinningBid(bidderValue, bidValue);
  }
}

```

## Available Functions

See more info about all the available decrypt & result retreival functions available through [FHE.sol](../solidity-api/FHE.md#encryption-and-decryption)

### Decryption Requests
```solidity
function decrypt(ebool input1)
function decrypt(euint8 input1)
function decrypt(euint16 input1)
function decrypt(euint32 input1)
function decrypt(euint64 input1)
function decrypt(euint128 input1)
function decrypt(euint256 input1)
function decrypt(eaddress input1)
```

### Safe Result Queries
```solidity
function getDecryptResultSafe(ebool input1) internal view returns (bool result, bool decrypted)
function getDecryptResultSafe(euint8 input1) internal view returns (uint8 result, bool decrypted)
function getDecryptResultSafe(euint16 input1) internal view returns (uint16 result, bool decrypted)
function getDecryptResultSafe(euint32 input1) internal view returns (uint32 result, bool decrypted)
function getDecryptResultSafe(euint64 input1) internal view returns (uint64 result, bool decrypted)
function getDecryptResultSafe(euint128 input1) internal view returns (uint128 result, bool decrypted)
function getDecryptResultSafe(euint256 input1) internal view returns (uint256 result, bool decrypted)
function getDecryptResultSafe(eaddress input1) internal view returns (address result, bool decrypted)
```

### Unsafe Result Queries
```solidity
function getDecryptResult(ebool input1) internal view returns (bool result)
function getDecryptResult(euint8 input1) internal view returns (uint8 result)
function getDecryptResult(euint16 input1) internal view returns (uint16 result)
function getDecryptResult(euint32 input1) internal view returns (uint32 result)
function getDecryptResult(euint64 input1) internal view returns (uint64 result)
function getDecryptResult(euint128 input1) internal view returns (uint128 result)
function getDecryptResult(euint256 input1) internal view returns (uint256 result)
function getDecryptResult(eaddress input1) internal view returns (address result)
```
