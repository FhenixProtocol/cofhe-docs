---
title: Error Handling
sidebar_position: 7
---

# Error Handling

`cofhejs` uses a consistent error handling pattern based on the `Result` type to provide predictable and type-safe error handling throughout the library. This guide explains how error handling works and how to properly handle errors in your applications.

## The Result Type

`cofhejs` uses a functional approach to error handling with the `Result` type. This pattern avoids exceptions and provides explicit error information.

```typescript
export type Result<T, E = string> = { success: true; data: T; error: null } | { success: false; data: null; error: E }
```

The `Result` type is a discriminated union that represents either:

- A successful operation with data (`success: true`).
- A failed operation with an error message (`success: false`).

### Helper Functions

`cofhejs` provides two helper functions to create Result objects:

```typescript
// Creates a Result representing a failure
export const ResultErr = <T, E>(error: E): Result<T, E> => ({
	success: false,
	data: null,
	error,
})

// Creates a Result representing a success
export const ResultOk = <T, E>(data: T): Result<T, E> => ({
	success: true,
	data,
	error: null,
})
```

## Where Result is Used

Most asynchronous operations in `cofhejs` return a `Result` type, including:

- Initialization functions (`initializeWithEthers`, `initializeWithViem`, `initialize`)
- Permit operations (`createPermit`, `getPermit`, `getPermission`)
- Encryption and decryption operations

## Handling Errors

When working with functions that return a `Result`, always check the `success` property before accessing the data.

### Basic Error Handling Pattern

```typescript
const result = await cofhejs.initialize({
	provider: ethersProvider,
	signer: wallet,
	environment: 'TESTNET',
})

if (!result.success) {
	console.error('Initialization failed:', result.error)
	// Handle the error appropriately
	return
}

// Safe to access result.data only after checking success
const permit = result.data
// Continue with your application logic
```

### Error Handling with Destructuring

You can use destructuring to make your code more concise:

```typescript
const {
	success,
	data: permit,
	error,
} = await cofhejs.createPermit({
	type: 'self',
	issuer: userAddress,
})

if (!success) {
	console.error('Failed to create permit:', error)
	return
}

// Use permit safely
console.log('Permit created successfully:', permit)
```

## Common Error Scenarios

`Cofhejs` may return errors in various scenarios, including:

1. **Initialization Errors**:
   - Missing provider or signer
   - Network connectivity issues
   - Unsupported environment

2. **Permit Errors**:
   - Invalid permit parameters
   - Missing signer
   - Unauthorized operations

3. **Encryption Errors**:
   - Missing FHE public key
   - Invalid input types
   - Network service unavailability

## Complete Example

Here's a complete example of initializing `cofhejs` and handling potential errors:

```typescript
async function initializeCoFHE() {
	try {
		// initialize your web3 provider
		const provider = new ethers.BrowserProvider(window.ethereum)
		const signer = (await provider.getSigner()) as ethers.JsonRpcSigner

		// initialize cofhejs Client with ethers (it also supports viem)
		await cofhejs.initializeWithEthers({
			provider: window.ethereum,
			signer: wallet,
			environment: 'TESTNET',
		})

		if (!result.success) {
			// Handle specific error cases
			if (result.error.includes('missing provider')) {
				console.error('Provider not available. Please install a wallet extension.')
			} else if (result.error.includes('failed to initialize cofhejs')) {
				console.error('FHE initialization failed. The network may not be FHE-enabled.')
			} else {
				console.error('Initialization error:', result.error)
			}
			return null
		}

		console.log('`cofhejs` initialized successfully')
		return result.data // The permit, if generated
	} catch (unexpectedError) {
		// Catch any unexpected errors not handled by the Result pattern
		console.error('Unexpected error during initialization:', unexpectedError)
		return null
	}
}

// Example of creating and using a permit with error handling
async function createAndUsePermit(userAddress) {
	const permitResult = await cofhejs.createPermit({
		type: 'self',
		issuer: userAddress,
	})

	if (!permitResult.success) {
		console.error('Permit creation failed:', permitResult.error)
		return
	}

	const permit = permitResult.data
	console.log('Permit created successfully:', permit)

	// Continue with operations that require the permit
	// ...
}
```

## Testing Error Cases

When writing tests, `cofhejs` provides utility functions to validate error results:

```typescript
import { expectResultError } from 'cofhejs/test'

test('should return error for invalid parameters', async () => {
	const result = await cofhejs.initialize({
		// Missing required parameters
	})

	expectResultError(result, 'initialize :: missing provider - Please provide an AbstractProvider interface')
})
```

By consistently checking the `success` property and appropriately handling errors, you can build robust applications that gracefully handle failure cases when working with `cofhejs`.
