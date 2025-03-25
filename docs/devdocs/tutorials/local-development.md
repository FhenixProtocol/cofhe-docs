---
title: Local Development Setup
sidebar_position: 4
description: Setting up your local development environment with and without Threshold Network
---
# Local Development Setup

## Overview

This guide explains how to set up a local development environment for Fhenix, which uses CoFHE for privacy-preserving smart contracts. 

You have two options for local development:

1. **Full Stack Setup (with Threshold Network)**
   - Includes all components including decryption threshold network
   - More secure, production-like environment
   - Components:
     - Preprocessor for key generation
     - CoFHE nodes (host & registry)
     - FHEOS server
     - Threshold decryption network
     - ZK Verifier

1. **Lean Setup (without Threshold Network)**
   - Minimal version without threshold decryption
   - All features are supported, but handled differently behind the scenes
   - Faster and simpler for local development
   - Uses local decryption instead of distributed threshold network
   - Ideal for initial development and testing

Choose the setup that best fits your development needs - full stack for production-like testing, or lean setup for faster local development.

## 🐳 Docker compose steps 🐳

### 1. Preprocessor
Generate keys and preprocessed data for decryption threshold networkIf you already have the keys generated in the mounted folder, it'll skip.

If you want to force new keys creation, add `--force-creation` to the preprocessor run command in the docker compose file, like this :
`preprocessor --runtime-config test --force-creation &&`

Keys generation & serialization might take 2-4 minutes to finish, and it'll pause your next docker containers from being started until it finishes, because they require the keys.. so wait for it :)

### 2. Cofhe (host & registry nodes, fheos server, middleware that deploys contracts to the nodes & start the aggregator)
Two nodes will come up, and only after the keys are ready and preprocessor has finished successfully - `fheos_server` will come up, and then middleware (to deploy the contracts and start the aggregator)

### 3. Threshold decryption network (rabbitmq, dispatcher, coordinator, 4 pms)

Rabbit will be deployed first, and once it's ready - dispatcher and coordinator will come up.

Once keys are ready and preprocesor have finished it's generations, all pms will come up as well and load the keys.

### 4. Zk Verifier

Relies on generated keys, and gonna generate some keys as well, so has to have right access to the keys folder.

## 🛜 Networking 🛜

> [!NOTE]  
Our docker compose currently relies on `"network_mode: host"` for simplicity.
If you don't want to work like this, you'll have to define your own docker network and rely on the exposed ports.


## ⚙️ Configurations ⚙️

This local setup requires multiple config files, and all can be found here - https://github.com/FhenixProtocol/cofhe/tree/master/localcofhenix_config

Your configurations folder (`CONFIG_DIR`) should contain:
1. `config.toml` - used by dispatcher and coordinator
2. `pm_config_00-03.toml` - used by party members, each PM users it's own config file
3. `zk_verifier/config.toml` - used by zkv

## ▶️🏃‍➡️ How to run - with decryption threshold network  ▶️🏃‍➡️🔐

If you clone the cofhe repo and run from it, you don't really have to setup any configs.. it's all there by default and loaded automatically for you.

```bash
docker compose up -d
```

Or, if you wanna setup your own config keys and override the defaults, you can run like this : 

```bash
KEYS_PATH=/Users/roeezolantz/Development/fhenix/cofhe/localcofhenix_keys 
KEYS_PATH=/Users/roeezolantz/Development/fhenix/cofhe/localcofhenix_config 
docker compose up -d
```

## ▶️🏃‍➡️ How to run lean version, without decryption threshold network  ▶️🏃‍➡️🔓

Assuming that you've cloned the `cofhe` repo, you should have 2 docker-compose files, the first (`docker-compose.yml`) is for the full stack deployment, and there's another one called `no-tn.yml` which is the minimal version of the cofhe stack, without threshold decryption network, which will rely on faster & local less-safe decryptions.

```bash
docker compose -f no-tn.yml up -d
```

## 🔑 Keys 🔑
After preprocessor  docker finished succesfully , your `KEYS_PATH` (or `./localcofhenix_keys` if you haven't specified anything) should contain keys for further usage by fheos/pms/zkv and more..
