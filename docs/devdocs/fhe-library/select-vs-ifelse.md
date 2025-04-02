---
sidebar_position: 4
title: Conditions
description: Understanding why if..else isn't possible with FHE and exploring the alternatives
---
## Overview

Writing smart contracts with Fully Homomorphic Encryption (FHE) changes how we handle conditionals. Since all data is encrypted, we can’t use traditional `if...else` statements—there’s no way to view the values being compared.

Moreover, conditionals in FHE must evaluate both branches simultaneously. This is similar to constant-time cryptographic programming, where branching can leak information through timing attacks—for example, if one path takes longer to execute, an observer could infer which condition was true.

## Basic Usage
To handle encrypted conditionals, Fhenix uses a concept called a selector—a function that takes an encrypted condition and two possible values, returning one based on the encrypted result.

In practice, this is done with the select function. It behaves like a ternary operator (condition ? a : b) but works entirely on encrypted data.

For example, `FHE.select` takes the encrypted ebool returned by `gt`. If `isHigher` represents encrypted true, it returns a; otherwise, it returns b—all without revealing which path was taken.

### Quick Start

```sol
euint32 a = FHE.asEuint32(10);
euint32 b = FHE.asEuint32(20);
euint32 max;

// Instead of this (won't work) :
// diff-remove
if (a.gt(b)) { // gt returns encrypted boolean (ebool), traditional if..else won't work as expected
// diff-remove
   max = a;
// diff-remove
} else {
// diff-remove
   max = b;
// diff-remove
}

// Do this:
// diff-add
ebool isHigher = a.gt(b);
// diff-add
max = FHE.select(isHigher, a, b);
```

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
