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

Decrypt operations like all other FHE operations in CoFHE are executed asynchronously, meaning:
1. You request decryption
2. The operation takes some time to complete
3. The results are being stored on chain, and then you can query them.

:::tip[Deep Dive]
To understand why FHE operations (including decryption) are asynchronous, [read more here](./data-evaluation.md).
:::

## Decryption in query VS in transaction

Fhenix provides two primary ways to perform decryption, each suited for different use cases:

#### **1. Decryption via Solidity Contract Transaction**
Decryption is requested in a smart contract transaction, storing the result on-chain for all to access. This ensures auditability but incurs higher gas costs and makes the result public.

#### **2. Decryption via RPC Query**
Decryption is requested off-chain via an RPC query, returning the result only to the requester. This method keeps data private and reduces gas costs but prevents smart contract usage of the decrypted value.

Read more about this and get examples [here](../cofhejs/)

| **Method**            | **Visibility**     | **Gas Cost** | **Smart Contract Usable** | **Best For** |
|----------------------|------------------|------------|-----------------------|-------------|
| **Transaction (on-chain)** | Public (on-chain) | High       | ✅ Yes                 | Public results, contract logic |
| **Query (off-chain)**     | Private (off-chain) | Low        | ❌ No                  | Confidential data, external apps |

## Asynchronous On-Chain Decryption

When decrypting data on-chain, you first request decryption using `FHE.decrypt()`, then later retrieve the results. There are two ways to retrieve decryption results: the safe way (recommended) and the unsafe way. Let's look at both approaches.

### Example 1: Safe Decryption (Recommended)

Use `FHE.getDecryptResultSafe(eParam)` to get both the decrypted value and a plaintext boolean success indicator:

```sol
import {FHE, euint64} from "@fhenixprotocol/cofhe-contracts/FHE.sol";

contract AuctionExample {
    // Encrypted highest bid
    euint64 private highestBid;
    address private highestBidder;
    
    // --------------------------------------------------
    // 1. Request on-chain decryption (in transaction)
    // --------------------------------------------------
    function revealBid() external {
        // Request decryption of the highest bid
        // This will make the result available on-chain for contract logic
        FHE.decrypt(highestBid);
    }

    // --------------------------------------------------
    // 2. Process the decrypted result safely
    // --------------------------------------------------
    function claimSafely() external {
        // Verify caller is highest bidder
        require(msg.sender == highestBidder, "Only highest bidder can claim");

        // Get the decrypted bid with safety check
        (uint64 bidValue, bool decrypted) = FHE.getDecryptResultSafe(highestBid);

        if (!decrypted) {
            // Handle the case where decryption isn't ready yet
            revert("Bid not yet decrypted, please retry later");
        }

        // Now we can safely use the decrypted value in contract logic
        transferToAuctioneer(bidValue);
    }
}
```

The safe method returns both the decrypted value and a boolean indicating whether decryption is complete. This gives you control over how to handle cases where the result isn't ready yet, allowing for more graceful error handling and user experience.

### Example 2: Unsafe Decryption

The second way of querying decryption results is using the function `FHE.getDecryptResult(eParam)` .
It doesn't check readiness for you, and you get no indication to work with. If decryption is ready, you get the decrypted value, otherwise - execution is being reverted. 

:::warning
The unsafe method will revert the transaction if the decryption results aren't ready yet.
:::

```sol
import {FHE, euint64} from "@fhenixprotocol/cofhe-contracts/FHE.sol";

contract AuctionExample {
    // Encrypted highest bid
    euint64 private highestBid;
    address private highestBidder;
    
    // --------------------------------------------------
    // 1. Request on-chain decryption (in transaction)
    // --------------------------------------------------
    function revealBid() external {
        // Request decryption of the highest bid
        FHE.decrypt(highestBid);
    }

    // --------------------------------------------------
    // 2. Process the decrypted result with the risky approach
    // --------------------------------------------------
    function claimRisky() external {
        // Verify caller is highest bidder
        require(msg.sender == highestBidder, "Only highest bidder can claim");
        
        // Get the decrypted bid - risky approach
        // This will automatically revert if decryption isn't ready
        uint64 bidValue = FHE.getDecryptResult(highestBid);
        
        // If we get here, we know the value is decrypted
        transferToAuctioneer(bidValue);
    }
}
```

The unsafe method is simpler but more rigid - it automatically reverts the entire transaction if decryption results aren't ready. This may be suitable for cases where you want to fail fast and don't need custom error handling.

## Decryptions Permissions

## Access Control

As with all FHE operations, you must have permission to decrypt a ciphertext. Read more about [Access Control](./acl-mechanism.md) to understand the permissions system.

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
