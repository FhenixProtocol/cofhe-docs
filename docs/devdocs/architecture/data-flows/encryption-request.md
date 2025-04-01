---
title: Encryption Request Flow
sidebar_position: 1
---

# Encryption Request Flow

## Overview

This document outlines the complete flow of the encryption request process using CoFHE.js, a TypeScript library designed to help users encrypt data for private computation with smart contracts. Understanding this process is essential for developers who want to enable their users to interact with privacy-preserving smart contracts using encrypted inputs.


## Key Components

| Component | Description |
|-----------|-------------|
| **dApp** | The decentralized application that interacts with the user and the contracts |
| **CoFHE.js** | TypeScript package designed for seamless interaction Fhenix's co-processor |
| **Threshold Network** | (When applicable) Handles secure decryption operations |

---
## Flow Diagram

The following diagram illustrates the complete flow of an Encryption request in the CoFHE ecosystem:
[![Diagram](../../../../static/img/assets/Encrypt%20a%20value.svg)](../../../../static/img/assets/Encrypt%20a%20value.svg)
*Figure 1: End-to-end flow of an Encryption request through the CoFHE system components*

## Step-by-Step Flow


1. **Install, include and initialize CoFHE.js in your project (full details [here](/docs/devdocs/quick-start/getting-started.md))**
    ```bash
    npm install cofhejs
    ```
    ```javascript
    const { cofhejs, FheTypes, Encryptable } = require("cofhejs/node");
    ```

2. **Data preparation**  
    The data is encrypted locally using the `encrypt` function.
    Under the hood, `encrypt` encrypts the data using the TFHE library and create a zkPoK to prove the encryption is correct.

3. **Encryption verification**  
    The zkPoK is verified using the `verify` function.  
    This verification process ensures that the ciphertext was generated correctly—that it represents a valid encryption of a known plaintext—and that the data has not been tampered with. Upon successful verification, the encrypted data is stored in the Data Availability (DA) layer.  

   The function returns a value handle that can be used to reference the encrypted data later, along with a signature.
5. **Using the encrypted data**  
    The user can send the value handle to the contract as an encrypted input. This handle represents the ciphertext stored in the DA layer and allows the contract to reference the encrypted value.

*Note: Read more about the implementation details [here](/docs/devdocs/cofhejs/encryption-operations)*

    
