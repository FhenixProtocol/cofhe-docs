---
title: Inputs
sidebar_position: 1
---

# Receiving Encrypted Inputs

One key aspects of writing confidential smart contract is receiving encrypted inputs from users:


```sol
function transfer(
    address to,
    InEuint32 memory inAmount // <------ encrypted input here
) public virtual returns (euint32 transferred) {
    euint32 amount = FHE.asEuint32(inAmount);
}
```

:::note[Important Note]

Notice in the example above the distinction between **`InEuint32`** and **`euint32`**.

:::

### Input Types Conversion

The **input types** `InEuintxx` (and `InEbool`, `InEaddress`) are special encrypted types that represent **user input**. Input types contain additional information required to authenticate and validate ciphertexts. For more on that, read on the [ZK-Verifier](../architecture/internal-utilities/verifier.md).

Before we can use an encrypted input, we need to convert it to a regular **encrypted type**:

```sol
euint32 amount = FHE.asEuint32(inAmount);
```

:::tip
Avoid storing encrypted input types in contract state. These types carry extra metadata, which increases gas costs and may cause unexpected behavior. Always convert them using `FHE.asE...()`.
:::

Now that `amount` is of type `euint32`, we can store or manipulate it:

```sol
toBalance = FHE.sub(toBalance, amount);
```

:::tip
Read more on the available FHE types and operations [here](./fhe-encrypted-operations.md).
:::

### Full Example

```sol
function transfer(
    address to,
    InEuint32 memory inAmount
) public virtual returns (euint32 transferred) {
    euint32 amount = FHE.asEuint32(inAmount);

    toBalance = _balances[to];
    fromBalance = _balances[msg.sender];

    _updateBalance(to, FHE.add(toBalance, amount));
    _updateBalance(from, FHE.sub(fromBalance, amount));
}
```

:::note

For the example above to logically work, you will also need to manage access to the newly created ciphertexts in the `_updateBalance()` function. Read further on the [ACL component](acl-mechanism.md).

:::

### Additional Examples

#### Voting in a Poll

```solidity
  function castEncryptedVote(address poll, InEbool calldata encryptedVote) public {
    _submitVote(poll, FHE.asEbool(encryptedVote));
  }
```

#### Setting Encrypted User Preferences

```solidity
   function updateUserSetting(address user, InEuint8 calldata encryptedSetting) public {
       _applyUserSetting(user, FHE.asEuint8(encryptedSetting));
   }
```
