---
title: FHE Operation Request Flow
sidebar_position: 2
---

# FHE Operation Request Flow

## Overview

This document outlines the complete flow of an FHE (Fully Homomorphic Encryption) operation request in the CoFHE ecosystem through Smart Contracts. Understanding this process is essential for developers integrating private computation capabilities into their smart contracts.


## Key Components

| Component | Description |
|-----------|-------------|
| **dApp** | The decentralized application that requests FHE operations |
| **FHE.sol** | The library providing FHE operation functions |
| **Task Manager** | Verifies and forwards operation requests |
| **Aggregator** | Manages the request queue and communicates with the execution layer |
| **fheOS Server** | Executes the actual FHE operations |
| **Threshold Network** | (When applicable) Handles secure decryption operations |

---
## Flow Diagram

The following diagram illustrates the complete flow of an FHE operation request in the CoFHE ecosystem:
[![Diagram](../../../../static/img/assets/Transactions.svg)](../../../../static/img/assets/Transactions.svg)
*Figure 1: End-to-end flow of an FHE operation request through the CoFHE system components*

## Step-by-Step Flow

### 📌 Step 1: Integration with Cofhejs

1. The decentralized application (dApp) integrates with CoFHE by utilizing **Cofhejs** for encryption.
[See in GitHub](https://github.com/FhenixProtocol/cofhe.js) ![Bullet](../../../../static/img/assets/1.png)

2. [Encrypt request](./encryption-request.md) using Cofhejs, returns `InEuint` structure.

> 📝 **Note:** This step happens on the client side before blockchain interaction.

### 📌 Step 2: Requesting an FHE Operation 

When the dApp needs to perform an encrypted operation within the smart contract: ![Bullet](../../../../static/img/assets/2.png)
1. **Import the FHE library in Solidity**:
   ```solidity
   import "@fhenixprotocol/cofhe-contracts/FHE.sol";
   ```

2. **Call the appropriate FHE function** from the imported library:
   ```solidity
   // using trivial encrypt or the returned structures from the previous step.
   function addExample(InEuint32 encryptedInput)  {
    euint32 lhs = FHE.asEuint32(encryptedInput);
    euint32 rhs = FHE.asEuint32(10);
    
    // Request an operation (addition in this example)
    euint32 result = FHE.add(lhs, rhs);
   }
   ```

3. **FHE.sol forwards the request** to the Task Manager contract

### 📌 Step 3: Task Manager Processing

The Task Manager serves as the gateway for all FHE operation requests:

1. **Validate request structure** to ensure all inputs are properly formatted
2. **Verify access permissions** by checking if the caller has proper access to the encrypted inputs (using ACL.sol) ![Bullet](../../../../static/img/assets/3.png)
3. **Generate a unique handle** that will be used to reference the future ciphertext result
4. **Return the handle** to the calling dApp contract
5. **Emit an event** containing the operation details for the Aggregator to process ![Bullet](../../../../static/img/assets/4.png)

### 📌 Step 4: Aggregator Processing

The Aggregator manages the queue of FHE operation requests:

1. **Listen for events** from the Task Manager ![Bullet](../../../../static/img/assets/5.png)
2. **Add the request** to a processing queue
3. **Forward request details** to the fheOS server ![Bullet](../../../../static/img/assets/6.png)
4. **Track the request status** throughout its lifecycle

### 📌 Step 5: FheOS server - FHE Operation Execution

The FheOS server handles requests:

1. **Create execution thread** on the fheOS server
2. **Execute the requested operation** on encrypted data
3. **Generate result ciphertext** containing the encrypted result
4. **Map the handle** to the actual ciphertext hash in the private storage
5. **Make result available** for subsequent operations
6. **Notify the Aggregator** of operation completion

### 📌 Step 6: Result Handling (For Standard Operations)

For standard FHE operations (not decryption):

1. **Update ciphertext registry** with the new encrypted result ![Bullet](../../../../static/img/assets/7.png)

At this point **the operation cycle is completed**, preserving the confidentiality of all encrypted values

---