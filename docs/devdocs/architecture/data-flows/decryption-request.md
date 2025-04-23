---
title: Decryption Request Flow
sidebar_position: 3
---

# Decryption Request Flow

The process of requesting decryption through Smart Contracts starts the same as every other [FHE Operation Request](fhe-operation.md) 📌steps 1-4 \
Here we'll continue from FheOS server handling such request as follows:
### Flow Diagram

The following diagram illustrates the complete flow of an FHE Decryption request in the CoFHE ecosystem:
[![Diagram](../../../../static/img/assets/Decryption%20Transactions.svg)](../../../../static/img/assets/Decryption%20Transactions.svg)
*Figure 1: End-to-end flow of an FHE Decryption request through the CoFHE system components*

### 📌 [Step 1-4](fhe-operation.md) 
>![Bullet](../../../../static/img/assets/1.png) ![Bullet](../../../../static/img/assets/2.png) ![Bullet](../../../../static/img/assets/3.png) ![Bullet](../../../../static/img/assets/4.png) ![Bullet](../../../../static/img/assets/5.png) ![Bullet](../../../../static/img/assets/6.png)

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

### 📌 Step 7: FheOS Notifies the Aggregator with the decrypt result ![Bullet](../../../../static/img/assets/7.png)
   - Call appropriate callback function on the Aggregator 
   - The Aggregator calls the TaskManager with relevant result

### 📌 Step 8: TaskManager emit event with decryption result ![Bullet](../../../../static/img/assets/8.png)
   - Provide decrypted result by emitting an event `DecryptionResult` 
   - The event consists of `ciphertext handle`, `result`, `requestor` (of that decrypt operation)
