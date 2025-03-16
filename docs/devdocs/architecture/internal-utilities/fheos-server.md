---
title: FheOs - Server
sidebar_position: 7
---

# FheOs - Server
| Aspect | Description |
|---------|-------------|
| **Type** | Off-chain computational layer. |
| **Function** | Executes FHE operations and manages encrypted computations |
| **Responsibilities** | • Receives the request from the Aggregator<br/>• Executes the FHE operations<br/>• Calls aggregator when result is created<br/>• Returns plaintext results when requested (i.e decrypt/seal output), preserving privacy throughout the pipeline |

The FHE Operating System server manages the execution environment for FHE operations. 