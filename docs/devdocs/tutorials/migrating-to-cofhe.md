---
title: Migrating to CoFHE
sidebar_position: 3
---


# Migrating Your Contract to CoFHE - It's Easy!

Want to upgrade your Fhenix L2 contract to use CoFHE? Let's walk through it with a simple example - a privacy-enabled ERC20 token.

## The Key Change: Async Operations

The main difference is that CoFHE uses asynchronous operations under the hood. But don't worry - the core logic stays almost exactly the same! Let's look at a Wrapping ERC20 contract that:

- Lets users wrap public tokens into encrypted ones
- Enables private transfers between users
- Allows checking encrypted balances securely

## Key Migration Considerations

When migrating your contracts from Fhenix L2 to CoFHE, keep these important points in mind:

### 1. Add allows where necessary

In CoFHE, you need to explicitly allow the contract to use encrypted numbers that it will operate on during its lifetime. This is done using the `FHE.allowThis()` function:

```Solidify
 FHE.allowThis(_encBalances[msg.sender]);
```

### 2. Remove `FHE.req()`

In Fhenix L2, you could use `FHE.req()` to enforce conditions on encrypted values, but this requires synchronus operation and also reveals some information about the encrypted value.\
In CoFHE, which uses symbolic execution and operates asynchronously, this approach needs to be reimagined. There are several ways to handle this:

1. **Conditional Operations**: Instead of requiring conditions, implement logic that naturally enforces constraints

   - Use select to conditionally process values: `FHE.select(condition, valueIfTrue, valueIfFalse)`

2. **Neutral Transformations**: Apply operations that don't change values for valid inputs but neutralize invalid ones
   - Add or subtract zero: `value + FHE.asEuint(0)`
   - Multiply by one: `value * FHE.asEuint(1)`

This approach is compatible with asynchronous operations and preserves privacy.

### 3. Remove `FHE.sealoutput()`

Sealoutput will be available through Cofhejs only, make sure to allow the issuer of the permit, in order to be able to request sealoutput later. \
For more info see [permit management](../cofhejs/permits-management.md) and [sealing-unsealing](../cofhejs/sealing-unsealing.md)

```Solidity
    // Transfers an encrypted amount.
    function _transferImpl(address from, address to, euint128 amount) internal returns (euint128) {
        // Make sure the sender has enough tokens.
        euint128 amountToSend = FHE.select(amount.lte(_encBalances[from]), amount, FHE.asEuint128(0));
        // Add to the balance of `to` and subract from the balance of `from`.
        _encBalances[to] = _encBalances[to] + amountToSend;
        _encBalances[from] = _encBalances[from] - amountToSend;
        // diff-add
        // The addresses of the balances should have ownership on their balance.
        // diff-add
        FHE.allow(_encBalances[from], from);
        // diff-add
        FHE.allow(_encBalances[to], to);
        return amountToSend;
    }
    // diff-remove
    function balanceOfEncrypted(
    // diff-remove
       address account, Permission memory auth
    // diff-remove
    ) virtual public view onlyPermitted(auth, account) returns (string memory) {
    // diff-remove
        return _encBalances[account].seal(auth.publicKey);
   // diff-remove
    }
```

Here's how it works:

## Original Fhenix L2 Contract - updated

First, let's look at the original Fhenix L2 contract:

```javascript
pragma solidity ^0.8.20;

import "@fhenixprotocol/contracts/access/Permissioned.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@fhenixprotocol/contracts/FHE.sol";

contract WrappingERC20 is ERC20, Permissioned {

    mapping(address => euint32) internal _encBalances;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 100 * 10 ** uint(decimals()));
    }

    function wrap(uint32 amount) public {
        // Make sure that the sender has enough of the public balance
        require(balanceOf(msg.sender) >= amount);
        // Burn public balance
        _burn(msg.sender, amount);

        // convert public amount to encrypted by encrypting it
        euint32 encryptedAmount = FHE.asEuint32(amount);
        // Add encrypted balance to his current balance
        _encBalances[msg.sender] = _encBalances[msg.sender] + encryptedAmount;
        // diff-add
        // Allow the contract to operate on the encrypted balance for future operations
        // diff-add
        FHE.allowThis(_encBalances[msg.sender]);
        // diff-add
        // Allow the users to to use decrypt\sealoutput on their balances
        // diff-add
        FHE.allow(_encBalances[msg.sender], msg.sender);
    }

    function unwrap(InEuint32 memory amount) public {
        euint32 _amount = FHE.asEuint32(amount);
        // diff-remove
        // verify that our encrypted balance is greater or equal than the requested amount
        // diff-remove
        FHE.req(_encBalances[msg.sender].gte(_amount));
        // diff-add
        // Using select to avoid leaking the result balance
        // diff-add
        _amount = FHE.select(_encBalances[msg.sender].gte(_amount), _amount, FHE.asEuint(0));
        // subtract amount from encrypted balance
        _encBalances[msg.sender] = _encBalances[msg.sender] - _amount;
        // diff-add
        // Allow the contract to operate on the encrypted balance for future operations
        // diff-add
        FHE.allowThis(_encBalances[msg.sender]);
        // diff-add
        // Allow the users to to use decrypt\sealoutput on their balances
        // diff-add
        FHE.allow(_encBalances[msg.sender], msg.sender);
        // add amount to caller's public balance by calling the `mint` function
        _mint(msg.sender, FHE.decrypt(_amount));
    }

    function transferEncrypted(address to, InEuint32 calldata encryptedAmount) public {
        euint32 amount = FHE.asEuint32(encryptedAmount);
        // diff-remove
        // Make sure the sender has enough tokens.
        // diff-remove
        FHE.req(amount.lte(_encBalances[msg.sender]));
        // diff-add
        // Using select to avoid leaking the result balance
        // diff-add
        amount = FHE.select(_encBalances[msg.sender].gte(amount), amount, FHE.asEuint(0));
        // Add to the balance of `to` and subract from the balance of `from`.
        _encBalances[to] = _encBalances[to] + amount;
        _encBalances[msg.sender] = _encBalances[msg.sender] - amount;
        // diff-add
        // Allow the contract to operate on the encrypted balance for future operations
        // diff-add
        FHE.allowThis(_encBalances[msg.sender]);
        // diff-add
        FHE.allowThis(_encBalances[to]);
        // diff-add
        // Allow the users to to use decrypt\sealoutput on their balances
        // diff-add
        FHE.allow(_encBalances[msg.sender], msg.sender);
        // diff-add
        FHE.allow(_encBalances[to], to);
    }

    // diff-remove
    function getBalanceEncrypted(Permission calldata perm) public view onlySender(perm) returns (uint256) {
    // diff-remove
        return FHE.decrypt(_encBalances[msg.sender]);
    // diff-remove
    }
}
```

In the above example since allowing the users on every step of the way, the users can use decrypt/sealoutput directly from cofhejs or using fhe.decrypt as above while listening on the event `DecryptResult`.

## Frontend Fhenix.js to Cofhejs

The main difference between Fhenix.js and Cofhejs is that Cofhejs is asynchronous and uses symbolic execution.  
This means that the encrypted values are not revealed until the user requests a decryption.

### 1. Initialization

```javascript
// diff-remove
const fhenixClient = new fhenixjs.FhenixClient({ provider: provider })
// diff-add
await cofhejs.initializeWithEthers({
	// diff-add
	provider,
	// diff-add
	signer,
	// diff-add
	environment: 'LOCAL',
	// diff-add
})
```

### 2. Encrypting values

With Cofhejs the encryption is done asynchronously, for this reason we can provide a callback function to log the encryption state (read about it [here](../cofhejs/encryption-operations.md))

```javascript
// diff-remove
const envValue = await fhenixClient.encrypt_uint128(value)
// diff-add
const logState = (state) => {
	// diff-add
	console.log(`Log Encrypt State :: ${state}`)
	// diff-add
}
// diff-add
const encryptedValues = await cofhejs.encrypt(logState, [Encryptable.uint32(10n), Encryptable.uint64(20n)])
```

### 3. Permits and Unsealing

In Fhenix.js the permit system was tied to contract address.  
The application required to request a permit for each contract address.  
In addition, to unseal the value, the contract function needs to use the permit in order to seal the value.

In Cofhejs the permit system is tied to the user address (issuer).  
The user can use default permit or create a new one using the `createPermit` function (read about it [here](../cofhejs/permits-management)).  
To unseal the value, the contract need to return the encrypted value handle and the sealing process done off-chain.

```javascript
// diff-remove
const getExtractedPermit = async (contractAddress: string) => {
	// diff-remove
	if (fhenixClient != null && provider != null) {
		// diff-remove
		try {
			// diff-remove
			let permit = await fhenixjs.getPermit(contractAddress, provider)
			// diff-remove
			fhenixClient.storePermit(permit)
			// diff-remove
			return fhenixClient.extractPermitPermission(permit)
			// diff-remove
		} catch (err) {
			// diff-remove
			console.log(err)
			// diff-remove
		}
		// diff-remove
	}
	// diff-remove
	return null
	// diff-remove
}
// diff-remove
const permit = await getExtractedPermit(CONTRACT_ADDRESS)
// diff-remove
const sealedValue = await contract.getSealedValue(permit)

// diff-add
// use default permit
// diff-add
const encryptedValueHandle = await contract.getEncryptedValue()
// diff-add
const unsealed = await cofhejs.unseal(encryptedValueHandle, FheTypes.Uint32)
// diff-add
// or generate a new permit
// diff-add
const permit = await cofhejs.createPermit({
	// diff-add
	type: 'self',
	// diff-add
	issuer: wallet.address,
	// diff-add
})
// diff-add
const encryptedValueHandle = await contract.getEncryptedValue()
// diff-add
const unsealed = await cofhejs.unseal(encryptedValueHandle, FheTypes.Uint32, permit.data.issuer, permit.data.getHash())
// diff-add
```

### 4. Decryption

In Fhenix L2 the decryption was done on-chain using the `FHE.decrypt` function.  
With Fhenix Co-Processor the decryption can be done in two ways:

1. Using `FHE.decrypt` in your solidity contract.
2. Off-chain using the `cofhejs.decrypt` function.

```javascript
// diff-add
const encryptedValueHandle = await contract.getEncryptedValue()
// diff-add
const decrypted = await cofhejs.decrypt(encryptedValueHandle, FheTypes.Uint32)
```
