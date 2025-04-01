---
title: Overview
sidebar_position: 0
description: A comprehensive overview of CoFHE, its features, and use cases
---

# **Overview**


## **Introduction**

Blockchains are great for transparency, security and trust, but that transparency comes at a cost—**everything is public**. Every transaction, smart contract interaction, and account balance is out in the open, which isn't ideal for things like finance, healthcare, or any use case that deal with sensitive data.

**Fully Homomorphic Encryption (FHE) fixes this.** Instead of exposing raw data on-chain, FHE allows computations to happen **directly on encrypted data**. The blockchain never sees the actual inputs or outputs—only encrypted values—yet the results are still valid when decrypted by an authorized recipient.

This means smart contracts can run just like they do now, but with **built-in confidentiality**—without compromising decentralization or security.


---


## **The Blockchain Transparency Problem**

Blockchain is often praised for its **decentralization, immutability, and transparency**—but transparency is a double-edged sword.


### **Why Transparency is a Problem**

In public blockchains like Ethereum, every transaction, smart contract interaction, and account balance is **completely visible** to anyone. This radical transparency, while crucial for establishing trust and enabling verification, creates significant privacy challenges. FHE solves this fundamental tradeoff by allowing data to remain **fully encrypted** while still maintaining the network's ability to verify its accuracy and authenticity. This means sensitive information can be processed and validated without ever being exposed, combining the best of both worlds - **bulletproof privacy with trustless verification**.

**Real-world consequences of blockchain transparency:** \
 ✅ **Front-running & MEV** – Traders can analyze mempools and exploit pending transactions before they are executed. \
 ✅ **Confidentiality leaks** – Sensitive financial transactions, payroll information, or business logic are exposed. \
 ✅ **Enterprise adoption hurdles** – Companies are reluctant to use public blockchains if competitors can access proprietary data.

These challenges can all be mitigated by using FHE in your smart contracts.


---


## **What is FHE?**

**FHE** is a cryptographic technique that allows computations to be performed on encrypted data **without decrypting it**. Most cryptographic techniques secure data only until it needs to be used—FHE keeps it hidden even while processing, preventing leaks at every step.


### **How FHE Works**



1. A user encrypts their data into ciphertext.
2. The blockchain performs computations directly on the ciphertext.
3. The result remains encrypted and can only be decrypted by the authorized user.

**The Holy Grail of Cryptography**



* Data remains private throughout the entire computation process.
* Smart contracts can execute logic on encrypted inputs and return encrypted outputs.
* Users control their data without relying on trusted third parties.

🔐 **But FHE is computationally expensive...** Enter **CoFHE**.


---


## **Introducing CoFHE**

CoFhe, an FHE enabled coprocessor, is a privacy tool for Ethereum and other EVM-compatible chains that allows computation directly on encrypted data. It means your smart contracts can handle sensitive information (like bids, votes, or user data) without ever exposing it to the network. CoFhe works off-chain, so it's fast and scalable, and its stateless design makes integration as easy as adding a single solidity library. Whether you're building in DeFi, DAOs, or Gaming, CoFhe adds encrypted data handling to your contracts while keeping them lightweight and performant.


### **Main Features**

- ✅ **Encryption on your preferred chain** - CoFHE lets you integrate encrypted variables and state in your Smart Contract on the EVM chain you're already using. No need to migrate to a different chain or runtime.
- ✅ **Effortless integration** - Adding CoFHE is as simple as an `import`. You define the logic, CoFHE handles the rest behind the scenes.
- ✅ **Async Execution** - FHE is notorious for not being as performant as regular, native EVM
  code. CoFHE is processing FHE operations asynchronously, allowing for
  quick finality and cheap transactions.
- ✅ **Comprehensive developer tools** - We've adapted common developer tools to support confidential dApp development. Foundry, Hardhat, and more are available so you feel right at home.
- ✅ **Decentralized and trustless** - The CoFHE protocol is designed with decentralization and trustlessness as core principles:
  - Threshold Network (TN) - The decryption key is split between multiple parties, reducing the risk of inappropriate use or being leaked.
  - Verifiability - Every component in CoFHE is designed to be verifiable. In the future,
    there will be mechanisms in place to validate and enforce correct execution and honest
    participation of all components.
    
### **What CoFHE Enables**

  * **Confidential smart contracts** – Execute logic on encrypted data while maintaining composability. 
 * **Scalability with security** – Leverages cryptographic optimizations to make FHE practical. 
  * **Ethereum compatibility** – Works within the existing Ethereum ecosystem, allowing developers to integrate seamlessly.
---

## **Unlocked Use Cases**

CoFhe enables developers to build confidential smart contracts that weren't possible before.

 **Private Auctions** – Bidders can place and settle auctions without revealing bid amounts or identities.

**Secure Voting** – Votes remain private while ensuring integrity and preventing manipulation.

 **Identity Management** – Users can verify credentials without exposing personal data.

By leveraging FHE, these use cases—and many more—become possible while keeping data confidential at every stage.


## Getting Started Guide

Ready to start building with CoFHE? Here's how to get started:

1. Set up your development environment
2. Install the necessary tools and dependencies
3. Follow our step-by-step tutorials
4. Join our developer community

[Get Started Now →](/docs/devdocs/quick-start/index.md) 
