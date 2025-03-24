---
title: Inputs
sidebar_position: 1
---

# Receiving Encrypted Inputs

Writing confidential smart contracts, a trivial part would be to receive encrypted inputs from users:

```sol
function transfer(
    address to,
    inEuint32 memory inAmount // <------ encrypted input here
) public virtual returns (euint32 transferred) {
    euint32 amount = FHE.asEuint32(inAmount);
}
```

:::note[Important Note]

Notice in the example above the distinction between **`inEuint32`** and **`euint32`**.

:::

### Input Types Conversion

The **input types** `inEuintxx` (and `inEbool`, `inEaddress`) are special encrypted types that represent **user input**. Input types contain additional information required to authenticate and validate ciphertexts. For more on that, read on the [ZK-Verifier](../architecture/internal-utilities/verifier.md).

Before we can use an encrypted input, we need to convert it to a regular **encrypted type**:

```sol
euint32 amount = FHE.asEuint32(inAmount);
```

:::tip
You should avoid storing encrypted input types (e.g. `inEuint8`, etc) directly in your contract's state - it will be more expensive as these types contain more data, and it could lead to unexpected results. You should always prefer to convert it to a regular encrypted type using `FHE.asE...()`.
:::

Now that `value` is of type `euint32`, we can store or manipulate it:

```sol
toBalance = FHE.sub(toBalance, amount);
```

:::tip
Read more on the available FHE types and opreations [here](./fhe-encrypted-operations.md).
:::

### Full Example

```sol
function transfer(
    address to,
    inEuint32 memory inAmount
) public virtual returns (euint32 transferred) {
    euint32 amount = FHE.asEuint32(inAmount);

    toBalance = _balances[to];
    fromBalance = _balances[msg.sender];

    _updateBalance(to, FHE.add(toBalance, amount));
    _updateBalance(from, FHE.sub(fromBalance, amount));
}
```

### Additional Examples

#### Voting in a Poll

```solidity
  function castEncryptedVote(address poll, inEbool calldata encryptedVote) public {
    _submitVote(poll, FHE.asEbool(encryptedVote));
  }
```

#### Setting Encrypted User Preferences

```solidity
   function updateUserSetting(address user, inEuint8 calldata encryptedSetting) public {
       _applyUserSetting(user, FHE.asEuint8(encryptedSetting));
   }
```
