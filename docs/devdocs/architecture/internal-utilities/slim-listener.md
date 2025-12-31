---
title: Slim Listener
sidebar_position: 5
---

# Slim Listener

| Aspect | Description |
|---------|-------------|
| **Type** | Intermediary service that monitors blockchain events and forwards them to the computation layer. |
| **Function** | Listens to events from the Task Manager Contract and forwards operation requests to the FheOS server. |
| **Responsibilities** | • Listens to the emitted events on the destination chain<br/>• Processes incoming requests in FIFO (First In, First Out) to ensure fairness and consistency<br/>• Prepares and structures the data/events and submits the request to the fheOS server |

