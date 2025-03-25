---
sidebar_position: 4
title: 🌴 Select vs If...else
description: Understanding why if..else isn't possible with FHE and exploring the alternatives
---

Writing code with Fully Homomorphic Encryption (FHE) introduces a fundamental shift in how we handle conditionals or branches in our code. As you already know, with FHE, we're operating on encrypted data. This means we can't use typical `if...else` branching structures, because we don't have visibility into the actual values we're comparing.

For example, this will not work:

```Javascript
euint32 a = FHE.asEuint32(10);
euint32 b = FHE.asEuint32(20);
if (a.lt(b)) { // lt returns encrypted boolean (ebool), not regular boolean value, hence can't be used by if...else 
   return FHE.decrypt(a);
} else {
   return FHE.decrypt(b);
}
```

When writing Solidity contracts with our FHE capabilities, you'll need to consider all possible branches of a conditional at the same time. It's somewhat akin to writing constant-time cryptographic code, where you want to avoid timing attacks that could leak information about secret data.

To handle these conditionals, we use a concept called a "selector".
A selector is a function that takes in a control and two branches, and returns the result of the branch that corresponds to the condition. A selector is like a traffic signal that decides which traffic to let through based on the color of the light (control signal).

In Fhenix, we utilize this by calling the `select` function. It's a function that takes in a condition and two inputs, and returns the input that corresponds to the state of the condition. You can think of this like a ternary boolean conditional (`condition ? "yes" : "no"`), but for encrypted data.

## Example Usage

Let's take a look at an example of `select` usage from a Blind Auction Smart Contract:

```Javascript
ebool isHigher = existingBid.lt(value);
bids[msg.sender] = FHE.select(isHigher, value, existingBid);
```

In this snippet, the bidder is trying to place a new bid that is higher than their existing one. The `lt` function checks if the existing bid is less than the new value and assigns the result to `isHigher` (the result is of type `ebool`).

Then `FHE.select` takes over. If `isHigher` is true (remember, this is still an encrypted boolean, not a plaintext one), it returns the `value` (the new bid), otherwise, it returns `existingBid`. This gets assigned to `bids[msg.sender]`, effectively replacing the old bid with the new one if the new one is higher.

## Key Points to Remember

- All operations take place on encrypted data, so the actual values and comparison results stay concealed
- The `select` function is the primary way to handle conditional execution in FHE
- This pattern maintains privacy without sacrificing functionality
- It's similar to constant-time programming patterns used in cryptography

## Common Use Cases

Here are some common scenarios where you'll use `select`:

1. **Maximum/Minimum Operations**
```Javascript
euint32 max = FHE.select(a.gt(b), a, b);
```

2. **Conditional Updates**
```Javascript
euint32 newValue = FHE.select(shouldUpdate, newValue, currentValue);
```

3. **Threshold Checks**
```Javascript
ebool isAboveThreshold = value.gt(threshold);
euint32 result = FHE.select(isAboveThreshold, value, threshold);
```

## Best Practices

1. Always use `select` instead of trying to implement branching logic
2. Keep your conditional logic simple and linear
3. Remember that all operations must be performed on encrypted data
4. Consider the performance implications of complex conditional chains
