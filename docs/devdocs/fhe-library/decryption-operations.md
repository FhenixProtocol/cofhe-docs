---
title: Decryption Operations
sidebar_position: 7
---

Decryption is the process of converting encrypted data back into its original form.

In the context of Fully Homomorphic Encryption (FHE), decryption allows for the retrieval of results after performing computations on encrypted data.

The `FHE.decrypt` function is a core component of the FHE library, designed for Solidity smart contract.

:::tip[Deep Dive]
We recommend you to read more about our unique MPC decryption threshold network [here](../architecture/internal-utilities/threshold-network.md)
:::

## Example

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
        lastDecryptedCounter = counter
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
```

## Accessing async decryption results

Decrypt operations, as all other operations in CoFhe, are being executed asynchronously, meaning that you ask for decrypyion, and it might take a while to be ready.

:::tip[Deep Dive]
If you wanna know more about why this is being done asynchronously, [read more here](./data-evaluation.md).
:::

Instead of blocking your contract while waiting for the result, you have to query the result, and you have 2 ways of doing that : 

### 1. Safe way

The safest way to query decryption results is using the function `FHE.getDecryptResultSafe(eParam)`.
This function results 2 values, first - the decrypted value, and second - plaintext boolean success indication. 

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

### 2. Unchecked way

The second way of querying decryption results is using the function `FHE.getDecryptResult(eParam)` .
It doesn't check for readiness for you, and you get no readiness indication to work with. If decryption is ready, you get the decrypted value, otherwise - execution is being reverted. 

:::warning
Using this method might end up with Execution Reverted exception if the results aren't ready yet.
:::


```sol
euint64 eParam = FHE.asEuint64(10);
(uint64 value, bool decrypted) = FHE.getDecryptResult(eParam);

// You will get Execution Reverted here if the decryption results aren't ready.

return value;
```

## Decryptions Permissions

As all other FHE operations - you must be allowed to use a ciphertext before you can decrypt it. 

Read more about [Access Control](./acl-mechanism.md) to get familiar with the context and utilize for decryptions.

## Function Signatures

```solidity
// Decryptions
function decrypt(ebool input1)
function decrypt(euint8 input1)
function decrypt(euint16 input1)
function decrypt(euint32 input1)
function decrypt(euint64 input1)
function decrypt(euint128 input1)
function decrypt(euint256 input1)
function decrypt(eaddress input1)

// Unsafe result query
function getDecryptResult(ebool input1) internal view returns (bool result)
function getDecryptResult(euint8 input1) internal view returns (uint8 result)
function getDecryptResult(euint16 input1) internal view returns (uint16 result)
function getDecryptResult(euint32 input1) internal view returns (uint32 result)
function getDecryptResult(euint64 input1) internal view returns (uint64 result)
function getDecryptResult(euint128 input1) internal view returns (uint128 result)
function getDecryptResult(euint256 input1) internal view returns (uint256 result)
function getDecryptResult(eaddress input1) internal view returns (address result)

// Safe result query
function getDecryptResultSafe(ebool input1) internal view returns (bool result, bool decrypted)
function getDecryptResultSafe(euint8 input1) internal view returns (uint8 result, bool decrypted)
function getDecryptResultSafe(euint16 input1) internal view returns (uint16 result, bool decrypted)
function getDecryptResultSafe(euint32 input1) internal view returns (uint32 result, bool decrypted)
function getDecryptResultSafe(euint64 input1) internal view returns (uint64 result, bool decrypted)
function getDecryptResultSafe(euint128 input1) internal view returns (uint128 result, bool decrypted)
function getDecryptResultSafe(euint256 input1) internal view returns (uint256 result, bool decrypted)
function getDecryptResultSafe(eaddress input1) internal view returns (address result, bool decrypted)
```
