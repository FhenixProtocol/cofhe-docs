---
title: Decryption Operations
sidebar_position: 7
description: Understanding how to decrypt encrypted data in FHE smart contracts
---

Decryption is the process of converting encrypted data back into its original form. In the context of Fully Homomorphic Encryption (FHE), decryption allows for the retrieval of results after performing computations on encrypted data.


:::tip[Deep Dive]
We recommend reading more about our unique MPC decryption threshold network [here](../architecture/internal-utilities/threshold-network.md)
:::

## Asynchronous Decryption Example

```sol
import {FHE, euint64} from "@fhenixprotocol/cofhe-contracts/FHE.sol";

contract SimpleCounter {
    euint64 counter;
    euint64 lastDecryptedCounter;
    
    // ------------------------------
    // 1. Trigger decrypt operation
    // ------------------------------
    function decrypt_counter() external {
        FHE.decrypt(counter);
        lastDecryptedCounter = counter;
    }

    // ------------------------------
    // 2. Query the decrypted results
    // ------------------------------ 
    // Option 1 - the safest way
    function get_safe_counter_value() external view returns(uint64) {
        (uint64 value, bool decrypted) = FHE.getDecryptResultSafe(lastDecryptedCounter);

        if (!decrypted) {
            // Now you can control what happens if results aren't ready yet
            revert("Value is not ready");
        }

        return value;
    }

    // Option 2 - the risky way
    function get_risky_counter_value() external view returns(uint64) {
        uint64 value = FHE.getDecryptResult(lastDecryptedCounter);
        
        // You will get Execution Reverted here if the decryption results aren't ready.

        return value;
    }
}
```

## Understanding Asynchronous Decryption

Decrypt operations like all other FHE operations in CoFHE are executed asynchronously, meaning:
1. You request decryption
2. The operation takes some time to complete
3. You query the results when ready

:::tip[Deep Dive]
To understand why FHE operations (including decryption) are asynchronous, [read more here](./data-evaluation.md).
:::

It's not possible to block your contract's execution while waiting for the result, so you have two ways to use the result:

### 1. Safe Way (Recommended)

Use `FHE.getDecryptResultSafe(eParam)` to get both the decrypted value and a plaintext boolean success indicator:

```sol
euint64 eParam = FHE.asEuint64(10);
(uint64 value, bool decrypted) = FHE.getDecryptResultSafe(eParam);

if (!decrypted) {
    // Now you can control what happens if results aren't ready yet
    revert("Value is not ready");
}

// Use the decrypted value here
return value;
```

### 2. Unsafe Way

The second way of querying decryption results is using the function `FHE.getDecryptResult(eParam)` .
It doesn't check readiness for you, and you get no indication to work with. If decryption is ready, you get the decrypted value, otherwise - execution is being reverted. 

:::warning
The unsafe method will revert the transaction if the decryption results aren't ready yet.
:::


```sol
euint64 eParam = FHE.asEuint64(10);
uint64 value = FHE.getDecryptResult(eParam); // Will revert if not ready
return value;
```

## Decryptions Permissions

## Access Control

As with all FHE operations, you must have permission to decrypt a ciphertext. Read more about [Access Control](./acl-mechanism.md) to understand the permissions system.

## Available Functions

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
