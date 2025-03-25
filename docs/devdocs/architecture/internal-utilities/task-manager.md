---
title: TaskManager
sidebar_position: 1m
---

# TaskManager


| Aspect | Description |
|---------|-------------|
| **Type** | Contract deployed on the destination blockchain |
| **Function** | Acts as the on-chain entry point for CoFHE integration |
| **Responsibilities** | • Initiates FHE operations by serving as the on-chain entry point. The dApp contract calls the TaskManager to submit a new encrypted computation task.<br/>• Generates unique handles that act as references to the results of FHE operations. These results are computed asynchronously off-chain.<br/>• Emits structured events containing ciphertext inputs, operation type, and any required metadata to enable off-chain processing.<br/>• Enables off-chain processing by allowing CoFHE relayers to monitor and pick up emitted events, perform the computation, and link the result back to the original handle. |
| **Deployment** | A separate Task Manager Contract is deployed for each supported destination chain, enabling chain-specific integrations |
