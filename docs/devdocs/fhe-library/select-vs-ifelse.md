---
sidebar_position: 4
title: Conditions
description: Understanding why if..else isn't possible with FHE and exploring the alternatives
---

Writing code with Fully Homomorphic Encryption (FHE) introduces a fundamental shift in how we handle conditionals or branches in our code. As you already know, with FHE, we're operating on encrypted data. This means we can't use typical `if...else` branching structures, because we don't have visibility into the actual values we're comparing.

Instead, use the `select` function which works like a ternary operator (`condition ? "yes" : "no"`) but for encrypted values.

## Quick Example

```sol
euint32 a = FHE.asEuint32(10);
euint32 b = FHE.asEuint32(20);
euint32 max;

// Instead of this (won't work):
if (a.gt(b)) { // gt returns encrypted boolean (ebool), traditional if..else will result unexpected result
   max = a;
} else {
   max = b;
}

// Do this:
ebool isHigher = a.gt(b);
max = FHE.select(isHigher, a, b);
```

## Why Not If...Else?

There are two main reasons why traditional `if...else` statements don't work with FHE:

1. **Encrypted Data Visibility**: You can't directly inspect encrypted values to make branching decisions
2. **Timing Attack Prevention**: You need to consider all possible branches simultaneously to prevent timing attacks that could leak information about secret data (It's somewhat akin to writing constant-time cryptographic code, in which you prevent leaking information by obfuscating if your code execution got inside the `if` or the `else`)

## Understanding Selectors

To handle these conditionals, we use a concept called a "selector".
A selector is a function that takes in a control and two branches, and returns the result of the branch that corresponds to the condition. A selector is like a traffic signal that decides which traffic to let through based on the color of the light (control signal).

In Fhenix, we utilize this by calling the `select` function. It's a function that takes in a condition and two inputs, and returns the input that corresponds to the state of the condition. You can think of this like a ternary boolean conditional (`condition ? "yes" : "no"`), but for encrypted data.

In the example above, `FHE.select` uses the encrypted `ebool` result of `gt`, so if `isHigher` is true (encrypted true, not a plaintext one), it returns `a`, otherwise, it returns `b`.

## Key Points to Remember

- All operations take place on encrypted data, so the actual values and comparison results stay concealed
- Using traditional `if...else` on encrypted data might result in **unexpected behavior** and leak information
- The `select` function is the only way to handle conditional execution in FHE without leaking information

## Common Use Cases

Here are some common scenarios where you'll use `select`:

1. **Maximum/Minimum Operations**
```sol
euint32 max = FHE.select(a.gt(b), a, b);
```

2. **Conditional Updates**
```sol
euint32 newValue = FHE.select(shouldUpdate, newValue, currentValue);
```

3. **Threshold Checks**
```sol
ebool isAboveThreshold = value.gt(threshold);
euint32 result = FHE.select(isAboveThreshold, value, threshold);
```

## Best Practices

1. Always use `select` instead of trying to implement branching logic
2. Keep your conditional logic simple and linear
3. Remember that all operations must be performed on encrypted data
4. Consider the performance implications of complex conditional chains
