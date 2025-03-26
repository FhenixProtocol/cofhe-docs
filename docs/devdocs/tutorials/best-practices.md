---
title: Best Practices
sidebar_position: 7
---

# Best Practices
This guide outlines key best practices for developing with CoFHE, based on recommendations from our development team.

## Security Considerations

### Decrypt Carefully
- **Always consider information leakage**: Before decrypting data, evaluate what information you're exposing, how your code branches based on decrypted values, and what an observer might learn.
- **Minimize decryption operations**: Only decrypt when absolutely necessary and after all sensitive computations are complete.

### Avoid Code Branching Based on Encrypted Data
- **Remember there is no secure code branching with FHE**: Decrypting to make branching decisions is generally a bad practice.
- **Use constant-time algorithms**: Design your code to follow the same execution path regardless of encrypted values.
- **Prefer FHE.select over conditional logic**: Use built-in selection operations rather than decrypting for if/else decisions.

## Performance Optimization

### Optimize Computational Efficiency
- **Minimize FHE operations**: Each operation adds computational overhead.
- **Use the minimum bit-width necessary**: Choose the smallest integer type that can safely represent your data (e.g., euint32 instead of euint64 when possible).


### Plan for Asynchronous Operations
- **Implement loading indicators in your UI**: Due to CoFHE's asynchronous nature, operations may take time to complete.
- **Use progress indicators**: Show spinners, progress bars, or status messages to inform users when operations are in progress.
- **Consider state management**: Design your application to handle pending states gracefully.
