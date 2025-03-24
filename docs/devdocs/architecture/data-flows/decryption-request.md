---
title: Decryption Request
sidebar_position: 3
---

# Decryption Request

The process of requesting decryption through Smart Contracts starts the same as every other [FHE Operation Request](fhe-operation.md) 📌steps 1-4, \
Here we'll continue from FheOS server handling such request as follows:

### 📌 Step 5: FheOS server - Decryption Execution
The FheOS server handles decryption requests:

1. **Create execution thread** on the fheOS server

2. **FheOS server calls the threshold network** with:
   - The ciphertext to be decrypted
   - Transaction hash from the host chain
   - Original operation handle

### 📌 Step 6: Threshold network security protocol
   - Verify the host chain requested the desired decryption
   - Retrieve the actual ciphertext hash from private storage
   - Validate ciphertext hash integrity
   - Perform secure decryption

### 📌 Step 7: FheOS Notifies the Aggregtor with the decrypt result
   - Call appropriate callback function on the aggregator
   - The Aggregator calls the TaskManager with relevant result.

### 📌 Step 8: TaskManager emit event with decryption result
   - Provide decrypted result by emitting an event `DecryptionResult`
   - The event consists of `ciphertext handle`, `result`, `requestor` (of that decrypt operation)
