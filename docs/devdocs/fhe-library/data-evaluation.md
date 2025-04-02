---
title: Data Evaluation
sidebar_position: 2
---

# Data Evaluation

## Sending computation requests

The blockchain that we write Smart Contracts on (for example, Arbitrum One) does not natively support FHE computation. This is why CoFHE is mostly an **off-chain system**, performing all the FHE heavy lifting asynchronously. All the logic that is happening on-chain is **giving instructions** for the off-chain component, CoFHE's **FHE Engine**, on what to compute. This concept is commonly referred to as [Symbolic Execution](https://en.wikipedia.org/wiki/Symbolic_execution).

#### But how the on-chain smart contracts communicate with the off-chain engine?

Through **Events**. Every FHE operation exposed in `FHE.sol` that requires an FHE computation emits an event. For example:

```sol
res = FHE.sub(first, second);
```

This code snippet above computes subtraction between two numbers. Behind the scenes, the function `FHE.sub()` is **emitting an event**, basically broadcasting "Hey FheOS! you need to compute `first - second`!". CoFHE then picks up this event, and forwards it to FheOS (the compute engine) for execution.

:::note[Some more examples]

```sol
euint8 res = FHE.asEuint8(42);
```

This command above emits an event saying "Create a trivially encrypted ciphertext representing the plaintext number `42`".

```sol
balance = FHE.add(amount, balance);
```

This command above emits an event saying "Compute the encrypted result of adding the encrypted variables `balance` and `amount`".

:::

But wait, how does CoFHE know how to connect two variables (e.g. `balance` and `amount`) and the underlying encrypted data to calculate the result? To understand this, we need to understand how encrypted data is represented in the smart contracts 👇.

## Data Representation

In the context of a Smart Contract, most FHE operation results in a new ciphertext. Let's look at an example:

```sol
function addNumbers() public view returns (euint32) {
    euint32 a = FHE.asEuint32(10); // Creating two trivially-encrypted ciphertexts
    euint32 b = FHE.asEuint32(20);
    euint32 result = FHE.add(a, b); // Add them together

    return result;
}
```

In the example above, we are:

1. Creating two trivially-encrypted 32-bit ciphertexts using `FHE.asEuint32()`.
2. Perform an FHE-addition, calculating the encrypted sum of both, using `FHE.add()`.
3. Returning the result.

We can see that the result of every operation is a value of type `euint32`, which represents a new 32-bit ciphertext. But what does `euint32` represents exactly? Let's look at the type's declaration:

```sol
type euint32 is uint256;
```

So is it actually a plaintext `uint256` integer 🤔? Well, not exactly.

The actual ciphertext values of FHE-encrypted integers are too big to be stored directly in the blockchain, or emitted in an event. That's why in your smart contracts, the ciphertexts are being represented by a 256-bit handle regardless of their encrypted type. You can think of this handle as an ID, or a pointer to the ciphertext stored off-chain. This handle is the identifier of said ciphertext. In practice, CoFHE actually stores full ciphertexts in an off-chain Data Availability (DA) layer.

So, when evaluating the following statement:

```sol
ebool isBigger = FHE.gt(newBid, currentBid);
```

FHE.sol is actually emitting the following event: "Check which number is bigger: `0xab12...` or `0xcd34..`". The result's handle (or, identifier) will be stored the variable `isBigger`, of type `ebool`.

:::tip

Wondering what to do with `ebool isBigger`? Check out the page on [conditions](select-vs-ifelse.md).

:::

:::tip[Deep Dive]

Didn't we just say that the computation is executed asynchronously? So - how can we know the ciphertext's handle in real time?

In fact, the ciphertext's handle is determined regardless of it's value. It is basically representing the operation that needs to be performed to create this value.

For example:

```sol
euint64 num = FHE.asEuint64(31);
euint64 meaning = FHE.add(num, FHE.asEuint64(11));
```

The handle of `num` is a numerical representation of "trivially-encrypted `31`", while the handle of `meaning` is a similar representation of "result of addition between `num` and trivially-encrypted `11`". The actual encrypted value is, as mentioned before, evaluated asynchronously.

:::
