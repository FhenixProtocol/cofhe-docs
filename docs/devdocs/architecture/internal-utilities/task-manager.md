---
title: TaskManager
sidebar_position: 1
---

# TaskManager


| Aspect | Description |
|---------|-------------|
| **Type** | Contract deployed on the destination blockchain |
| **Function** | Acts as the on-chain entry point for CoFHE integration |
| **Responsibilities** | • The Task Manager Contract is called by the dApp contract to execute an FHE operation<br/>• Creates a handle to represent the resulting ciphertext, which will be calculated asynchronously<br/>• Creates structured events from these requests<br/>• Emits the events |
| **Deployment** | A separate Task Manager Contract is deployed for each supported destination chain, enabling chain-specific integrations |
