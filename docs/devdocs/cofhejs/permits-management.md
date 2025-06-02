---
title: Permits Management
sidebar_position: 4
---

# Permits Management

Permits are a crucial security mechanism in Fhenix that allow users to authenticate themselves when accessing encrypted data through off-chain operations like `sealoutput` and `decrypt`. These operations are exposed and handled by `cofhejs`.

## Quick Start

### Basic Integration

In a development environment, permit management can be handled automatically by `Cofhejs`. When initialized with a valid provider and signer, the SDK will prompt users to sign a new permit, granting them access to their encrypted data:

```typescript
// initialize your web3 provider
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:42069')
const wallet = new ethers.Wallet(PRIVATE_KEY, provider)

// initialize cofhejs Client with ethers (it also supports viem)
await cofhejs.initializeWithEthers({
	ethersProvider: provider,
	ethersSigner: wallet,
	environment: 'TESTNET',
})
```

### Production Setup

For production environments, you'll want more control over the permit generation process. Disable automatic permit generation by setting `generatePermit: false`:

```typescript
// initialize your web3 provider
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:42069')
const wallet = new ethers.Wallet(PRIVATE_KEY, provider)

// initialize cofhejs Client with ethers (it also supports viem)
await cofhejs.initializeWithEthers({
	provider: provider,
	signer: signer,
	environment: 'MAINNET',
	generatePermit: false,
})
```

After initialization, you'll need to manually call `cofhe.createPermit()` to generate user permits. It's recommended to inform users about the purpose of permits before requesting their signature.

### User Interface Example

Here's an example modal that explains permits to users:

```jsx
const PermitModal = () => (
	<div className='permit-modal'>
		<h2>Sign a Permit</h2>
		<p>Permits grant secure access to your encrypted data on Fhenix by authenticating you with your signature. Each permit:</p>
		<ul>
			<li>Is valid for 24 hours</li>
			<li>Can only be used by you</li>
			<li>Ensures your data remains private</li>
		</ul>
		<button onClick={handleSignPermit}>Sign Permit</button>
	</div>
)
```

The sign permit action should call:

```typescript
const handleSignPermit = async () => {
	const result = await cofhejs.createPermit({
		type: 'self',
		issuer: userAddress,
	})

	if (!result.success) {
		console.error('Failed to create permit:', result.error)
		return
	}
	// Permit created successfully
}
```

This will trigger the user's wallet to prompt for their signature. Once signed, the permit will be automatically stored and used for subsequent `cofhe.unseal` operations.

## Sharing Permits

### Overview

Sharing permits enables users to grant others access to their encrypted data in a secure way. The sharing process involves three steps:

1. Original data owner creates a sharing permit.
2. Owner sends the permit to the recipient.
3. Recipient activates the permit with their signature.

### Implementation

Here's how to implement permit sharing:

1. Data owner creates a sharing permit:

```typescript
const createSharingPermit = async (ownerAddress: string, recipientAddress: string) => {
	const result = await cofhejs.createPermit({
		type: 'sharing',
		issuer: ownerAddress,
		recipient: recipientAddress,
	})

	if (!result.success) {
		throw new Error(`Failed to create sharing permit: ${result.error}`)
	}

	return result.data
}
```

2. The permit data can be safely transmitted to the recipient as plaintext since it contains no confidential information.

3. Recipient activates the permit:

```typescript
const activateReceivedPermit = async (sharingPermit: Permit) => {
	const result = await cofhejs.createPermit({
		...sharingPermit,
		type: 'recipient',
	})

	if (!result.success) {
		throw new Error(`Failed to activate permit: ${result.error}`)
	}

	return result.data
}
```

## Advanced Features

### Permit Validation

Permits include built-in validation mechanisms:

- **Expiration**: Permits automatically expire after 24 hours (configurable).
- **Signature Verification**: Ensures permits are only used by authorized parties.
- **Chain Validation**: Permits are bound to specific networks.

### Custom Validators

You can implement custom validation logic by specifying a validator contract:

```typescript
const permitWithValidator = await cofhejs.createPermit({
	type: 'self',
	issuer: userAddress,
	validatorContract: '0x...', // Your validator contract address
	validatorId: 1, // Custom validation identifier
})
```

### Error Handling

Always handle permit operations with proper error checking:

```typescript
const handlePermitCreation = async () => {
	try {
		const result = await cofhejs.createPermit({
			type: 'self',
			issuer: userAddress,
		})

		if (!result.success) {
			console.error('Permit creation failed:', result.error)
			return
		}

		// Handle successful permit creation
	} catch (error) {
		console.error('Unexpected error:', error)
	}
}
```

## API Reference

See `PermitOptions` interface for the complete list of options available when creating permits:

```typescript
interface PermitOptions {
	type: 'self' | 'sharing' | 'recipient'
	issuer: string
	recipient?: string
	expiration?: number
	validatorId?: number
	validatorContract?: string
	name?: string
}
```
