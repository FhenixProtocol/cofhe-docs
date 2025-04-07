---
title: 🔮 Future Plans
sidebar_position: 9
---

# 🔮 Future Plans

## Road to Decentralization

Integrating FHE into a blockchain-runtime is a hard and complex task. Our engineering philosophy is _Ship Fast_, and we believe that to build the best possible product we need to meet real users early. Similar to the approach described in [Vitalik's "training wheels" post](https://ethereum-magicians.org/t/proposed-milestones-for-rollups-taking-off-training-wheels/11571) (in the context of rollups), we too are relying on "training wheels" releasing CoFHE to achieve this goal.

Outlined here is a non-exhaustive list of trust-points, centralized components and compromises made to ship CoFHE to users as fast as possible, along with how we plan to address them in the future. This list will be updated as things progress.

| Component              | Compromise                                                   | Plan to solve                                                                    | Timeline | Status |
| ---------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------- | -------- | ------ |
| Threshold Network (TN) | All parties are run by Fhenix                                | N/A                                                                              | N/A      | ❌     |
| Threshold Network (TN) | Use of a Trusted Dealer for keys and random data generation  | N/A                                                                              | N/A      | ❌     |
| Threshold Network (TN) | Parties trust the Coordinator                                | N/A                                                                              | N/A      | ❌     |
| Threshold Network (TN) | TN trusts CoFHE (tx-flow decryptions)                        | N/A                                                                              | N/A      | ❌     |
| Threshold Network (TN) | Parties trust a Trusted Dealer                               | 1. Run TD in a TEE<br/>2. Public ceremony for share creation<br/>3. Eliminate TD | N/A      | ❌     |
| Threshold Network (TN) | Parties are not using unique random data within the protocol | Pull random data from the TD                                                     | N/A      | ❌     |
| Threshold Network (TN) | SealOutput reencryption performed in a centralized manner    | N/A                                                                              | N/A      | ❌     |
| ZK-Verifier (ZKV)      | CoFHE trusts ZK-Verifier                                     | Run ZKV in a TEE                                                                 | N/A      | ❌     |
| CoFHE                  | Trust in CoFHE to perform correct FHE computations           | External verification using AVS                                                  | N/A      | ❌     |
| CoFHE                  | User inputs stored in a centralized manner                   | Use a decentralized DA                                                           | N/A      | ❌     |
| All                    | Codebase is unaudited                                        | Perform a security audit                                                         | N/A      | ❌     |
| All                    | Codebase is not fully open-source                            | Open-source codebase                                                             | N/A      | ❌     |

## Upcoming Features

In the spirit of transparency, here we describe the general feature-roadmap planned for CoFHE. This list will be updated as things progress.

| Feature                        | Type                | Description                                                                      | Timeline | Status |
| ------------------------------ | ------------------- | -------------------------------------------------------------------------------- | -------- | ------ |
| Integration SDK                | DevX                | SDK to easily integrate CoFHE-specific components into dApps                     | N/A      | ❌     |
| Additional external devtools   | DevX                | Remix, Alchemy SDK and more                                                      | N/A      | ❌     |
| RNG                            | DevX                | Ability to generate secure randomness in contracts                               | N/A      | ❌     |
| Alternative runtimes           | DevX                | Support for additional runtimes other than EVM                                   | N/A      | ❌     |
| FHE ops in view functions      | DevX                | Ability to execute FHE operations in view functions in contracts                 | N/A      | ❌     |
| GPU support                    | UX                  | Run FHE operations on a GPU backend, improving performance and overall latency   | N/A      | ❌     |
| FPGA support                   | UX                  | Run FHE operations on an FPGA backend, improving performance and overall latency | N/A      | ❌     |
| T-out-of-N MPC protocol        | Robustness          | Improve robustness of the TN by not requiring all parties to be online           | N/A      | ❌     |
| Support additional host-chains | DevX/UX             | N/A                                                                              | N/A      | ❌     |
| Key shares rotation            | Robustness/Security | Ability to rotate the party shares in the TN                                     | N/A      | ❌     |
| Key Rotation                   | Robustness/Security | Ability to rotate the key for the entire protocol                                | N/A      | ❌     |
