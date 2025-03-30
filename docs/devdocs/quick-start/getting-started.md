---
title: Getting Started with Cofhejs
sidebar_position: 4
description: Setup instructions for cofhejs
---
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";


## Overview

cofhejs is a TypeScript package designed to enable seamless interaction between clients and the Fhenix's co-processor (CoFHE). It is an essential component for engineers working with FHE-enabled smart contracts, as it facilitates the encryption and decryption processes required for secure data handling in decentralized applications (dApps). cofhejs ensures that data remains private throughout its journey from input to output in the blockchain ecosystem.
FHE-enabled contracts require three primary modifications to the client/frontend:

* Encrypting Input Data: Before passing data to the smart contract, input must be encrypted to ensure its confidentiality. To read more about encrypted inputs, go [here](/docs/devdocs/cofhejs/encryption-operations).
* Creating Permits and Permissions: The client must generate permits and permissions that determine who can interact with or view the data. Read more about [permits](/docs/devdocs/cofhejs/permits-management).
* Unsealing Output Data: After the contract processes the data, the client must decrypt the output for it to be used or displayed. For more, refer to our page on [sealing and unsealing](/docs/devdocs/cofhejs/sealing-unsealing).

cofhejs allows encryption to begin and end privately in a dApp, while FHE-enabled contracts do work on and with these encrypted values.

## Mental Model

To understand how **cofhejs** fits into the Fhenix framework, we will create a simple mental model to show how data moves through Fhenix-powered dApps.

Consider a smart contract called "**Counter**". Each user has an individual counter, and users increment and read their own counters with complete privacy. In this example, a **public key** is like a lock, and a **private key** is the corresponding key to unlock it.

### Adding to the User's Counter

When users want to add a value to their counter, say "5," they first place this value inside a sort-of "box". Using cofhejs, this box is secured by locking it with Fhenix Co-Processor's **public key** (encryption). The locked box is then sent to the smart contract. Thanks to Fully Homomorphic Encryption (FHE), Fhenix can perform mathematical operations directly on these sealed boxes—without accessing the raw data inside. So, the user's encrypted value, "5," can be added to the user’s encrypted counter while remaining private.

### Retrieving the User's Counter

To retrieve the counter value, the user needs to read the data inside the box without breaking the encryption. Here’s the clever part: the user sends a second “lock” (their own public key) along with the request to read its data. This second lock is applied to the box (now the box has two locks). Fhenix can now remove its own lock (the Co-Processor's public key), leaving the box secured by only the user’s public key. The box remains locked and the data remains private, but now only the user can open it using its private key.


## Installation

To get started with cofhejs, you need to install it as a dependency in your JavaScript project. You can do this using npm (Node Package Manager) or Yarn. Open your terminal and navigate to your project's directory, then run the following:

<Tabs>
  <TabItem value="yarn" label="yarn">
    ``` yarn add cofhejs ```
  </TabItem>
  <TabItem value="npm" label="npm">
    ``` npm install cofhejs ```
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    ``` pnpm add cofhejs ```
  </TabItem>
</Tabs>

## Setup

To use **cofhejs** for interacting with FHE-enabled smart contracts, the `cofhejs` must be initialized. This client handles key operations such as encrypting input data, creating permits, and decrypting output data from the blockchain.
First, the client must be initialized. Below is an example setup:

<Tabs>
  <TabItem value="node" label="Node.js">
      ```javascript
      const { cofhejs } = require("cofhejs/node");
      const { ethers } = require("ethers");

      // initialize your web3 provider
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:42069");
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider);


      // initialize cofhejs Client with ethers (it also supports viem)
      await cofhejs.initializeWithEthers({
          ethersProvider: provider,
          ethersSigner: wallet,
          environment: "LOCAL",
      });
      ```
  </TabItem>
  <TabItem value="web" label="Browser">
    ```javascript
    const { cofhejs } = require("cofhejs/web");
    const { ethers } = require("ethers");

    // initialize your web3 provider
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = (await provider.getSigner()) as ethers.JsonRpcSigner;


    // initialize cofhejs Client with ethers (it also supports viem)
    await cofhejs.initializeWithEthers({
        ethersProvider: provider,
        ethersSigner: wallet,
        environment: "LOCAL",
    });
    ```
  </TabItem>
</Tabs>



## Encrypting Input Data

This step secures the data before sending it to the smart contract. Remember--all data sent to a smart contract on a blockchain is inherently public, which means that anyone can see it. However, Fhenix operates differently. To maintain user confidentiality and protect sensitive input data, Fhenix utilizes **cofhejs** to provide built-in encryption methods that must be applied before sending any data to an FHE-enabled contract (Learn more [here](/docs/devdocs/cofhejs/encryption-operations)).

In the following example, we will encrypt a multiple values and pass them to a smart contract.
The function logState is a callback function that will be called with the current state of the encryption process.

```javascript
const logState = (state: EncryptStep) => {
    console.log(`Log Encrypt State :: ${state}`);
};

// This will encrypt only the encrypted values (total 4 in this case)
const encryptedValues = await cofhejs.encrypt(logState, [
    { a: Encryptable.bool(false), b: Encryptable.uint64(10n), c: "hello" },
    ["hello", 20n, Encryptable.address(contractAddress)],
    Encryptable.uint8("10"),
] as const);

const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);
// Use the encrypted value of 10n
const tx = await contract.add(encryptedValues.data[1]);
```

The return value of encrypt will look like this:

```javascript
[
    {
      "a": {
        "ctHash": "92636554511857607772139288161981437465043939725198943672216405239183126770909",
        "securityZone": 0,
        "utype": 0,
        "signature": "0xe040cd35add28cf6ecb7f69ed438d0336c93bc89969e3ef48c6695f761d873ef063fb09f14bf63756a3c5e025ea844068d3e4dc6484f4217b1ced06f96491ff61c"
      },
      "b": {
        "ctHash": "15202056784520109157082582003083232820505141574251474146694023601812035142599",
        "securityZone": 0,
        "utype": 5,
        "signature": "0x54441075bc03dc98f70934741d166589d8525917f7d800c9a8b5ed108a1837c034e22659f11436769b0a95d075456a8d7d3f0a7e04c15a7cc04fc588f1a99f5b1b"
      },
      "c": "hello"
    },
    [
      "hello",
      "20",
      {
        "ctHash": "26787795621375665874272976868854952388518195120549843442998819116218678940297",
        "securityZone": 0,
        "utype": 7,
        "signature": "0x0c834cdbaf79541d70da7b59b4159a0826e5480ed443e6a2f98c0e8aa751dad9181f696ca2a977097be23d71c014a60dd3467608a71a73bd5436ccf00830b7571c"
      }
    ],
    {
      "ctHash": "67711896118023138060842665752834850025450825328971592073572755047963992273547",
      "securityZone": 0,
      "utype": 2,
      "signature": "0x1f9af51d7f007b2841c303239f42deb4d9672d8eda42cbe312e3f0fefd7258c235484b0d6a6900ecc1ba7e2e8bf73c8c5ce7113a87eb94bf053d933ef35d90381b"
    }
  ]
```

By encrypting user data before sending it to a contract, Fhenix ensures that data remains private throughout its lifecycle in the blockchain environment.

## Creating Permits

After encryption, values can be passed into FHE-enabled smart contracts, and the contract can operate on this data securely, within its own logic. However, to ensure that only the respective user can view the processed (encrypted) data, **permissions** and **sealing** mechanisms are used. These ensure that data remains private and viewable exclusively by the user who owns it. Learn more at [Permits Management](/docs/devdocs/cofhejs/permits-management) and [Sealing and Unsealing](/docs/devdocs/cofhejs/sealing-unsealing).

Permissions serve two main purposes:
- **Verify User Identity**: They ensure that the data access request comes from the correct user by verifying that the message is signed with the user's private key.
- **Sealing User Data**: They provide a **public key** to "seal" the encrypted data, meaning it is encrypted in such a way that only the user holding the corresponding **private key** (stored securely on the user's client) can decrypt it later.

**Note**: Fhenix uses **EIP712**, a widely used Ethereum standard for signing structured data. This means: first, a user must sign a permit in their wallet to authenticate themselves and authorize the creation of the permit; second, permits are stored locally in local storage and can be reused for future interactions with the same contract. Currently, each contract that the user interacts with requires its own unique permit (subject to change).

 Here's the code for this process:

```javascript
const permit = await cofhejs.createPermit({
    type: "self",
    issuer: wallet.address,
});
```

## Unsealing Data

After encryption, the data can be securely processed by the contract and sealed with the user's **public key** (from their permit), and it is returned to the user when the user requests it. To access and interpret this data, the user must **unseal** it using their private key, which is securely stored on their device. The unsealing process is essential to ensure that only the intended user can view the final result.

When the contract returns the encrypted data to the user, it remains sealed. This means the data is still encrypted with the user's **public key** and cannot be read until the corresponding **private key** is used to unlock it. **cofhejs** provides a simple method to handle this.

Here's example code to show how the unsealing process works:

```javascript
const permit = await cofhejs.getPermit({
    type: "self",
    issuer: wallet.address,
});

const result = await contract.getSomeEncryptedValue();
const unsealed = await cofhejs.unseal(result, FheTypes.Uint32, permit.data.issuer, permit.data.getHash());
```

## End-to-End Example

This example demonstrates a full interaction between a dApp and an FHE-enabled smart contract using the `cofhejs`. It walks through how to set up the client, encrypt data, send it to the contract, create a permit for accessing sealed data, and finally unseal the returned data for the user.

<Tabs>
  <TabItem value="node" label="Node.js">
    ```javascript

        const { cofhejs, FheTypes } = require("cofhejs/node");
        const { ethers } = require("ethers");

        // initialize your web3 provider
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:42069");
        const wallet = new ethers.Wallet(PRIVATE_KEY, provider);


        // initialize cofhejs Client with ethers (it also supports viem)
        await cofhejs.initializeWithEthers({
            ethersProvider: provider,
            ethersSigner: wallet,
            environment: "LOCAL",
        });

        const logState = (state) => {
            console.log(`Log Encrypt State :: ${state}`);
        };

        const encryptedValues = await cofhejs.encrypt(logState, [Encryptable.uint64(10n)]);
        
        const writeToContract = async () => {
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);
            const tx = await contract.someFunction(encryptedValues.data[0]);
            console.log("Transaction hash:", tx.hash);
            const receipt = await tx.wait();
            console.log("Transaction receipt:", receipt);    
        }
        await writeToContract();

        const readFromContract = async () => {
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
            const result = await contract.getSomeEncryptedValue();
            console.log("Result:", result);
            const permit = await cofhejs.createPermit({
                type: "self",
                issuer: wallet.address,
            });        
            const unsealed = await cofhejs.unseal(result, FheTypes.Uint64, permit.data.issuer, permit.data.getHash());
            console.log(unsealed);
        }
        await readFromContract();
    ```
  </TabItem>
</Tabs>


## Troubleshoot

TBD