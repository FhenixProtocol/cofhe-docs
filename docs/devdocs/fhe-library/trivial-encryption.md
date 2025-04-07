---
title: Trivial Encryption
sidebar_position: 2
description: What is the difference between trivially encrypted numbers and encrypted inputs
---

# Trivial Encryption

Sometimes we want to use encrypted numbers with plaintext numbers we have in the contract, for example:
```solidity
euint16 double = FHE.mul(single, 2);
```

However, the above example will not work because `FHE` operations currently support only encrypted types.
To do this, we must first convert the plaintext number to an encrypted type, in this case `euint16`,
using one of the `FHE.asEuint` functions, which accept built-in, plaintext types too.

```solidity
euint16 multiplier = FHE.asEuint16(2);
euint16 double = FHE.mul(single, multiplier);
```

## Privacy considerations
The conversion from plaintext types to encrypted types is called **Trivial Encryption**.

Note that anyone observing the contract execution knows the underlying value of trivially encrypted variables.
Therefore, **trivially encrypted values are not confidential**. 
This is an important concept to keep in mind when developing confidential contracts.

In this case, `multiplier` should be considered public, even though it is stored in encrypted format.

:::important[Important]
`euints` are only confidential when they are formed from encrypted `inEuint` inputs, which are encrypted off-chain.
:::

When two trivially-encrypted numbers are combined in an FHE operation, the result is still not confidential, because an observer can keep track of the calculations.

### Example
```solidity
function doSomeCalculations(InEuint16 calldata input) {
    euint16 var1 = FHE.asEuint16(2);             // public
    euint16 var2 = FHE.asEuint16(3);             // public
    euint16 var3 = FHE.add(var1, var2);          // public

    euint16 var4 = FHE.asEuint16(input);         // private
    euint16 var5 = FHE.mul(var4, var3);          // private
    
    euint16 var6 = FHE.asEbool(false);           // public
    euint16 var7 = FHE.select(var6, var5, var4); // Observer knows that var7 = var4
                                                 // but not what the value is
}
```
