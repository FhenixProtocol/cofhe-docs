---
title: 🔮 Future Plans
sidebar_position: 9
---

# 🔮 Future Plans

## Road to Decentralization

Integrating FHE into a blockchain-runtime is a hard and complex task. Our engineering philosophy is _Ship Fast_, and we believe that to build the best possible product we need to meet real users early. Similar to the approach described in [Vitalik's "training wheels" post](https://ethereum-magicians.org/t/proposed-milestones-for-rollups-taking-off-training-wheels/11571) (in the context of rollups), we too are relying on "training wheels" releasing CoFHE to achieve this goal.

Outlined here is a non-exhaustive list of trust-points, centralized components and compromises made to ship CoFHE to users as fast as possible, along with how we plan to address them in the future.

| Component              | Compromise                                                   | Plan to solve                | Timeline | Status |
| ---------------------- | ------------------------------------------------------------ | ---------------------------- | -------- | ------ |
| Threshold Network (TN) | Parties are all run by Fhenix                                | N/A                          | N/A      | ❌     |
| Threshold Network (TN) | Use of a Trusted dealer for keys and random data generation  | N/A                          | N/A      | ❌     |
| Threshold Network (TN) | Parties blindly trust the Coordinator                        | N/A                          | N/A      | ❌     |
| Threshold Network (TN) | TN bilndly trusts CoFHE (tx-flow decryptions)                | N/A                          | N/A      | ❌     |
| Threshold Network (TN) | Parties blindly trust Trusted Dealer                         | Run TD in a TEE              | N/A      | ❌     |
| Threshold Network (TN) | Parties are not using unique random data within the protocol | Pull random data from the TD | N/A      | ❌     |
| Threshold Network (TN) | Sealoutput reencryption performed in a centralized manner    | N/A                          | N/A      | ❌     |
| ZK-Verifier (ZKV)      | CoFHE blindly trusts ZK-Verifier                             | Run ZKV in a TEE             | N/A      | ❌     |
| CoFHE                  | Trust on CoFHE to peform correct FHE computations            | N/A                          | N/A      | ❌     |
| CoFHE                  | User inputs stored in a centralized manner                   | Use a decentralized DA       | N/A      | ❌     |
| All                    | Codebase in unaudited                                        | Perform a security audit     | N/A      | ❌     |

## Upcoming Features

## Roadmap
