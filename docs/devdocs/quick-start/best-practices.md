---
title: Best Practices
sidebar_position: 5
---

# Best Practices
This guide outlines key best practices for developing with CoFHE, based on recommendations from our development team.

## Security Considerations

### Decrypt Carefully
- **Always consider information leakage**: Before decrypting data, evaluate what information you're exposing, how your code branches based on decrypted values, and what an observer might learn.
- **Minimize decryption operations**: Only decrypt when absolutely necessary and after all sensitive computations are complete.
- **Always Update Permissions**:
    Remember to call `FHE.allowThis()` after modifying any encrypted value that needs to be accessed later:

    ```solidity
    counter = FHE.add(counter, FHE.asEuint32(1));
    FHE.allowThis(counter);  // Required!
    ```

### Avoid Code Branching Based on Encrypted Data
- **Remember there is no secure code branching with FHE**: Decrypting to make branching decisions is generally a bad practice.
- **Use constant-time algorithms**: Design your code to follow the same execution path regardless of encrypted values.
- **Prefer FHE.select over conditional logic**: Use built-in selection operations rather than decrypting for if/else decisions.
    Since conditional branching doesn't work with encrypted values, use `FHE.select()` instead:
    ```solidity
    // Instead of: if (condition) { result = a; } else { result = b; }
    result = FHE.select(condition, a, b);
    ```
    Read more about conditions [here](../fhe-library/select-vs-ifelse.md).

## Performance Optimization

### Optimize Computational Efficiency
- **Minimize FHE operations**: Each operation adds computational overhead.
- **Use the minimum bit-width necessary**: Choose the smallest integer type that can safely represent your data (e.g., euint32 instead of euint64 when possible).
- **Reuse Encrypted Constants - gas saver**:
    Encrypt constant values once and reuse them to save gas:

    ```solidity
    // Good practice
    euint32 ONE = FHE.asEuint32(1);
    FHE.allowThis(ONE);

    // Later in the code
    counter = FHE.add(counter, ONE);
    ```


### Plan for Asynchronous Operations
- **Implement loading indicators in your UI**: Due to CoFHE's asynchronous nature, operations may take time to complete.
- **Use progress indicators**: Show spinners, progress bars, or status messages to inform users when operations are in progress.
- **Consider state management**: Design your application to handle pending states gracefully.