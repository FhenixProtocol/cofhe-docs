---
sidebar_position: 1
---

# Key Considerations

> Critical limitations and important considerations when working with CoFHE

## Common Issues
1. `Missing revert data`- In case of getting such error, please verify [here](component-compatibility.md), that you are using the latest cofhe-contracts version.

#### *Will be filled overtime, when a new issue will arise.

## Possible errors from Solidity
| Error | Description |
|-------|-------------|
| **InvalidInputsAmount** | Operation requires specific number of inputs. Occurs when an operation receives wrong number of arguments |
| **InvalidOperationInputs** | Operation inputs must be valid for the operation. Thrown when inputs violate operation requirements |
| **TooManyInputs** | Operations have maximum input limits. Error when input count exceeds operation's maximum |
| **InvalidBytesLength** | Byte arrays must match expected length. Occurs when byte array length doesn't match required size |
| **InvalidTypeOrSecurityZone** | Operations must use compatible types and security zones. Occurs when operation violates type or security zone constraints |
| **InvalidInputType** | Input must match expected type. Error when input type doesn't match function requirements |
| **InvalidInputForFunction** | Function inputs must match defined parameters. Thrown when function receives incompatible input type |
| **InvalidSecurityZone** | Operations must stay within defined security zones. Error when operation violates security zone constraints |
| **InvalidSignature** | Cryptographic signatures must be valid. Occurs with signature verification failures |
| **InvalidSigner** | Signer must match expected authorized address. Error when transaction signer doesn't match required address |
| **InvalidAddress** | Address must be valid and non-zero. Error when invalid address is provided |
| **OnlyOwnerAllowed** | Function restricted to contract owner. Error includes address of unauthorized caller |
| **OnlyAggregatorAllowed** | Function restricted to authorized aggregator. Error includes address of unauthorized caller |
| **AlreadyDelegated** | Delegatee contract is already delegatee for sender & delegator addresses. Error when attempting duplicate delegation |
| **SenderCannotBeDelegateeAddress** | Sender cannot be the delegatee address. Error when sender tries to delegate to themselves |
| **SenderNotAllowed** | Sender address not authorized for allow operations. Error includes address of unauthorized sender |
| **DirectAllowForbidden** | Direct handle allowance not permitted. Must use Task Manager. Error includes address attempting direct allow |

