---
title: Local Development Setup
sidebar_position: 2
description: Setting up your local development environment for Fhenix development
---

# Local Development Setup

## Overview

Getting started working with FHE enabled contracts requires setting up your local development environment. There are a few key components of this setup, some of which we may not use directly, but are necessary to understand how to implement, test, and deploy an FHE enabled project.

- **cofhe-hardhat-starter**: Template hardhat project intended to be cloned and used as a starting point.
- **cofhe-hardhat-plugin**: Hardhat plugin that deploys the `cofhe-mock-contracts` and exposes utilities.
- **cofhejs**: JavaScript library for interacting with FHE contracts and the CoFHE coprocessor.
- **cofhe-mock-contracts**: Mock contracts that mimic the behavior of the CoFHE coprocessor, used only for local testing.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/fhenixprotocol/cofhe-hardhat-starter.git
cd cofhe-hardhat-starter
```

2. Install dependencies:

```bash
pnpm install
```

## Sandbox

The `cofhe-hardhat-starter` includes an example contract at `contracts/Counter.sol`. This contract is an FHE enabled counter, that uses FHE to encrypt the user's counter, keeping its value confidential.

We can test this contract against the `hardhat` network by running the tests:

```
pnpm test
```

where you will see logs from the tests that have been run. You will also see logs from the Mock CoFHE Contracts, which were automatically deployed to their fixed addresses on the hardhat chain.

The logs from the Mock Contracts look like this:

```
__cofhe__ trivialEncrypt  0 => 8800..8320[false]
__cofhe__ trivialEncrypt  1 => 8136..6992[true]
__cofhe__ gte             4473..3424[0] >= 1157..3648[1] => 9092..1872[false]
```

The `__cofhe__` prefix indicates that this is originating in the mock cofhe contracts, then follows the FHE operation that has been performed. Finally is the inputs and outputs of the FHE operation.

You will notice the special `4473..3424[0]` indicator when a value is shown in these logs. The first part `4473..3424` is the concatenated version of the `uint256` hash that represents the encrypted number. The second part `[0]` is the value that is encrypted. Usually this number is private, but in the mocks it can be shown.

> Note: If the type of the encrypted variable is an `ebool` then it will show as true/false rather than the value. The same is true for `eaddress` variables.

If you look back to the `Counter.sol` contract, you can see how these logs align with the constructor:

```solidity
contract Counter {

  constructor() {
    ONE = FHE.asEuint32(1);
    count = FHE.asEuint32(0);
    FHE.gte(count, ONE);

```

It is also useful to look at the tests in `Counter.test.ts`, where you can start to see what interacting with an FHE enabled contract looks like on the client side. `cofhejs` is used to create encrypted inputs, which can then be passed into the `InEuint memory` input variables. `cofhejs` is also responsible for reading encrypted data using `cofhejs.unseal`. These tests contain examples of both flows.

`cofhejs` needs to be initialized, and in a hardhat environment it is easiest to use the helper function:

```typescript
await cofhejs_initializeWithHardhatSigner(bob)
```

<span style={{color: "orange", fontStyle: "italic"}}>Exercise:</span> Import `hardhat/console.sol` in the test contract `Counter.sol` and log the ciphertexts as they are created.
