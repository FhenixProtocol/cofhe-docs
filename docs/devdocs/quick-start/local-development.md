---
title: Local Development Setup
sidebar_position: 2
description: Setting up your local development environment with and without Threshold Network
---
# Local Development Setup

## Overview

This guide explains how to set up a local development environment for Fhenix, which consists of several key components working together to provide a complete development experience.

The full Fhenix local environment includes:
- **Preprocessor**: Generates cryptographic keys and preprocessing data
- **CoFHE Nodes**: Host chain and registry chain for blockchain functionality
- **FHEOS Server**: Core service for FHE operations
- **Threshold Decryption Network**: Distributed decryption network
- **ZK Verifier**: Zero-knowledge verification service

## ▶️🏃‍➡️ How to run  ▶️🏃‍➡️

1. Clone the CoFHE repository (it contains all the needed config files and etc)

```bash
> git clone git@github.com:FhenixProtocol/cofhe.git
> cd cofhe
> docker compose up -d
```

2. Alternatively, you can use custom configuration paths:

```bash
> CONFIG_DIR=/path_to_local_configs_folder \
KEYS_PATH=/path_to_local_keys_folder \
docker compose up -d
```

## 🐳 Docker-compose setup 🐳

The docker-compose configuration that you just ran creates the components which perform the following actions:

### 1. Preprocessor
Generates keys and preprocessed data for the decryption threshold network.
- Automatically skips if keys already exist in the mounted folder.
- To force new key creation, add `--force-creation` to the preprocessor command in docker-compose.yml:
  `preprocessor --runtime-config test --force-creation &&`.
- Initial key generation takes approximately 2-4 minutes, and subsequent containers will wait for this step to complete.

### 2. CoFHE Nodes and Services
- Two blockchain nodes initialize while keys are being generated.
- After successful key generation, the `fheos_server` starts.
- The Middleware container follows, deploying contracts and starting the Aggregator.

### 3. Threshold Decryption Network
- RabbitMQ messaging service deploys first.
- Once RabbitMQ is ready, Dispatcher and Coordinator services initialize.
- After key generation completes, Party Member services (PMs) start and load keys from the shared volume.

### 4. ZK Verifier
- Relies on the generated cryptographic keys.
- Exposes the signer's public key.
- Requires appropriate access permissions to the keys folder.

## 🌐 Networking 🌐 

:::note[Note]
The docker compose configuration uses `"network_mode: host"` for simplicity.
If this doesn't work for your environment, you can define a custom docker network and use the exposed ports specified in the docker-compose files.
:::
## ⚙️ Configurations ⚙️


This local setup requires multiple configuration files, which are included in the CoFHE repository at:
https://github.com/FhenixProtocol/cofhe/tree/master/localcofhenix/configs

Your configuration folder (`CONFIG_DIR`) should contain:
1. `config.toml` - Used by Dispatcher and Coordinator
2. `pm_config_00-0x.toml` - Used by Party Members (each PM uses its own config file)
3. `zk_verifier_config.toml` - Used by the ZK Verifier

## 🔑 Keys 🔑
After the preprocessor container finishes successfully, your `KEYS_PATH` (or `./localcofhenix/keys` if not specified) will contain the cryptographic keys required by the FHEOS server, Party Members, ZK Verifier, and other components.

## 🔧 Troubleshooting 🔧
- If services fail to start, check that the preprocessor completed successfully.
- Some services may require a restart if they attempt to access keys before generation is complete.
- If you need to restart the Middleware container, be aware that contract redeployments may occur and break stuff. In this case:
  1. Stop the Middleware container
  2. Restart the blockchain nodes
  3. Restart the Middleware container
- Review the container logs for specific error messages using `docker logs [container_name]`.
- Ensure you have sufficient system resources (CPU, memory) for running the full stack.
