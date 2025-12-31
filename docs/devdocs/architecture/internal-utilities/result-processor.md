---
title: Result Processor
sidebar_position: 9
---

# Result Processor

| Aspect | Description |
|---------|-------------|
| **Type** | Service responsible for handling computation results and publishing them back to host chains. |
| **Function** | Receives results from the FheOS server and publishes them back to the original host chain with reliable transaction handling. |
| **Responsibilities** | • Receives the results from the fheOS server<br/>• Handles the heavy lifting of sending reliable and resilient transactions to the host chain with retries<br/>• Upon decryption result, submits the result back to the original chain |

