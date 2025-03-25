---
title: Permits Management
sidebar_position: 4
---

# Permits Management

Permits allow users to authenticate themselves when requesting on-chain data via the off-chain `sealoutput` and `decrypt` actions exposed and handled by `cofhejs`.

## Usage

For the most part, management of Permits is handled by `cofhejs`, however there are two integration points to consider:

### 1. Signatures

Permits require a user to sign a message in their connected wallet. This message is similar to an Ethereum log-in message, and will need to be presented and signed by the user.

It is important to inform the user that they will need to sign a Permit to prevent an unknown signature request. Here is an example modal:

```
Header: Sign a Permit.

Body: In order to access your encrypted data, you are required to authenticate yourself by signing a Permit. This permit can only be used by you, and will need to be refreshed when it expires in 24 hours.

CTA: SIGN PERMIT
```

The `SIGN PERMIT` button should call the following function:

```typescript
function onSignPermit() {
  await cofhejs.createPermit({
    type: 'self',
    issuer: <connected user address>,
  })
}
```

`createPermit` will then generate the Permit and prompt the user to sign it.

:::tip
See `PermitOptions` for the full list of options that can be passed to `cofhejs.createPermit`
:::

### 2. Sharing

## Permit Features

The following features explain the inner workings of Permits, however much of the information below is handled silently behind the scenes by `cofhejs`.

### Issuer authentication.

At its core, a Permit is simply a way to authenticate that a user has access to a confidential variable. `Permit.issuer` is the authenticated user, and the ACL will check to ensure that `Permit.issuer` has access to the requested encrypted data.

In order to validate `issuer`, Permits also have a `Permit.issuerSignature` field, which contains an EIP712 signature that _must_ be signed by `Permit.issuer`. This means that when integrating `cofhejs` into your dApp, your users will be prompted to sign their signature data.

See more on signing permits in the "Handling Permit Signatures" section below.

:::tip
In the future, we will release a set of React components that will help managing permits in your dApp.
:::

### SealingKey

When confidential data is returned, it is first sealed by CoFHE to prevent interception. Permits provide a public_key to seal with in the `Permit.sealingKey` field. When a permit is generated, a private_key / public_key keypair is created, and the public_key is added to `Permit.sealingKey`.

When CoFHE receives a permit with a sealingKey, the encrypted data is "re-sealed" with the user's provided `sealingKey`, which can then _only_ be unsealed with the matching private_key.

### Sharing Permits

Sometimes users are required to share their confidential data with a 3rd party such as an auditor. In this case, when the Permit is created `Permit.recipient` must be populated with the intended recipient (else it is populated with the ZeroAddress).

`Permit.recipient` is included in the hash struct used for `Permit.issuerSignature`, which ensures that only `Permit.recipient` is able to use the Permit to access confidential data.

When a permit is shared, `Permit.sealingKey` is not provided by `Permit.issuer`, instead it is left as the default 0x value and later populated by `Permit.recipient`. Therefore only `Permit.recipient` will know the associated private_key and only `Permit.recipient` can access the unsealed data returned by CoFHE.

Once `issuer` has created and signed the permit, it can be sent as cleartext to `Permit.recipient` because none of the included data is confidential.

Finally, `Permit.recipient` will add their own signature to the `Permit.recipientSignature` field, which will sign a hashed struct of `Permit.sealingKey` and `Permit.issuerSignature`.

### Security

In order to prevent leakage of confidential data, Permits must be secure by nature. `Permit.expiration` is a timestamp after which the Permit will be considered invalid, ensuring that even if a Permit is leaked, it will fail-safe and become invalid after the timestamp has passed.

:::tip
Once permit's expire, the user will need to sign a new permit to access their confidential data. The default expiration duration is 24 hours, but this can be changed when configuring `cofhejs`.
:::

Permits also have `Permit.validatorId` and `Permit.validatorContract` fields, which allow a Permit to be validated against an external contract. This is useful when sharing permits as it allows `Permit.issuer` to remotely disable a Permit, even after it has been shared with `Permit.recipient`.
