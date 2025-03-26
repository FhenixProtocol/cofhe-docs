---
title: Your First FHE Contract
sidebar_position: 2
---

# Your First FHE Contract

Let's take a look at a simple contract that uses FHE to encrypt a counter, and break it down into its components.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {FHE, euint64, InEuint64} from "@fhenixprotocol/cofhe-contracts/FHE.sol";

contract SimpleCounter {
    address owner;

    euint64 counter;
    euint64 delta;
    euint64 lastDecryptedCounter;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can access that function");
        _;
    }

    constructor(uint64 initial_value) {
        owner = msg.sender;
        counter = FHE.asEuint64(initial_value);
        FHE.allowThis(counter);

        // Encrypt the value 1 only once instead of every value change
        delta = FHE.asEuint64(1);
        FHE.allowThis(delta);
    }

    function increment_counter() external onlyOwner {
        counter = FHE.add(counter, delta);
        FHE.allowThis(counter);
    }

    function decrement_counter() external onlyOwner {
        counter = FHE.sub(counter, delta);
        FHE.allowThis(counter);
    }

    function reset_counter(InEuint64 value) external onlyOwner {
        counter = FHE.asEuint64(value);
        FHE.allowThis(counter);
    }

    function decrypt_counter() external onlyOwner {
        lastDecryptedCounter = counter;
        FHE.decrypt(lastDecryptedCounter);
    }

    function get_counter_value() external view returns(uint256) {
        (uint256 value, bool decrypted) = FHE.getDecryptResultSafe(lastDecryptedCounter);
        if (!decrypted)
            revert("Value is not ready");

        return value;
    }
}
```

To start using FHE, we need to import the FHE library.
In this example, we're importing the types `euint64` and `InEuint64` from the [FHE library](/docs/devdocs/solidity-api/FHEl).


```solidity
import {FHE, euint64, InEuint64} from "@fhenixprotocol/cofhe-contracts/FHE.sol";
```
We want to keep the counter encrypted at all times, so we'll use the `euint64` type.
In addition, the delta variable, which we add to or subtract from counter, must also be encrypted to avoid revealing the result.

```solidity
    euint64 counter;
    euint64 delta;
    euint64 lastDecryptedCounter;
```


In the constructor, we initialize the `counter` and `delta` variables.  
We encrypt the `delta` here to avoid calculating the same encrypted value every time we increment or decrement the counter.

```solidity
    counter = FHE.asEuint64(initial_value);
    delta = FHE.asEuint64(1);
```

For every encrypted variable, we need to call `FHE.allowThis()` to allow the contract to access it.
You can read more about this in the [FHE library](/docs/devdocs/fhe-library/acl-mechanism) documentation.
```solidity
    FHE.allowThis(counter);
    FHE.allowThis(delta);
```

In the `increment_counter` and `decrement_counter` functions, we use the `FHE.add` and `FHE.sub` functions to increment and decrement the counter, respectively.  
And we also call `FHE.allowThis()` to allow the contract to access the new counter value.

```solidity
    counter = FHE.add(counter, delta);
    FHE.allowThis(counter);
```
In the `reset_counter` function, we receive an `InEuint64` value, which is a type that represents an encrypted value that can be used to reset the counter.  
This value is an encrypted value that we created using CoFHE.js (read more about it [here](/docs/devdocs/cofhejs/encryption-operations)).



Now, let's take a look at the `decrypt_counter` and `get_counter_value` functions.  
The `decrypt_counter` function creates a new decrypt request for the counter.  
Since we want to allow users to call `get_counter_value` function at any given time, we need store the handle in the `lastDecryptedCounter` variable.  
The result will be valid until the next `decrypt_counter` call.

In the `get_counter_value` function, we use the `FHE.getDecryptResultSafe` function to get the decrypted value of the counter.  
Since the decryption is asynchronous, we need to check if the result is ready by checking the `decrypted` boolean.   
If the result is not ready, we revert the transaction with an error message.

```solidity
    function get_counter_value() external view returns(uint256) {
        (uint256 value, bool decrypted) = FHE.getDecryptResultSafe(lastDecryptedCounter);
        if (!decrypted)
            revert("Value is not ready");

        return value;
    }
```

In this contract, only the owner can request for a decryption, so everyone can read the counter's value at any given time.  
The owner needs to send a transaction to the `decrypt_counter`.  
But what if we want to allow the owner to read the value without sending a transaction every time?  
For that we need to add call for `FHE.allow(counter, owner)` every time that we change the counter's value.  
We will also need to change the `get_counter_value` function to return the encrypted counter's value.  

```solidity
    function increment_counter() external onlyOwner {
        counter = FHE.add(counter, delta);
        FHE.allowThis(counter);
        FHE.allow(counter, owner);
    }

    function get_counter_value() external view returns(euint64) {
        return counter;
    }

```
and use CoFHE.js to decrypt the counter's value.

```javascript
    
    const result = await contract.get_counter_value();
    const permit = await cofhejs.getPermit({
        type: "self",
        issuer: wallet.address,
    });
    const decrypted = await cofhejs.decrypt(result, FheTypes.Uint32, permit.data.issuer, permit.data.getHash());
```

In that case, only the owner can read the counter's value.  