---
title: TaskManager
sidebar_position: 1
---

# TaskManager
Type: Contract deployed on the destination blockchain.
Function: Acts as the on-chain entry point for CoFHE integration.
Responsibilities:
The Task Manager Contract is called by the dApp contract to execute an FHE operation.
Create a handle to represent the resulting ciphertext, which will be calculated asynchronously.
Creates structured events from these requests.
Emits the events.
Unique Deployment: A separate Task Manager Contract is deployed for each supported destination chain, enabling chain-specific integrations.
