---
title: FHE.Sol
sidebar_position: 1
---


# FHE Library Documentation

## Encrypted Data Types

The library supports the following encrypted data types:

| Type | Description |
|------|-------------|
| `ebool` | Encrypted boolean value |
| `euint8` | Encrypted 8-bit unsigned integer |
| `euint16` | Encrypted 16-bit unsigned integer |
| `euint32` | Encrypted 32-bit unsigned integer |
| `euint64` | Encrypted 64-bit unsigned integer |
| `euint128` | Encrypted 128-bit unsigned integer |
| `euint256` | Encrypted 256-bit unsigned integer |
| `eaddress` | Encrypted Ethereum address |

## Core Functions

### Type Conversion

#### asEbool (from uint/bool)
```solidity
asEbool(bool value) → ebool
asEbool(bool value, int32 securityZone) → ebool
```
Converts a plaintext boolean value to an encrypted boolean.

#### asEuint8 (from uint)
```solidity
asEuint8(uint256 value) → euint8
asEuint8(uint256 value, int32 securityZone) → euint8
```
Converts a plaintext value to an encrypted 8-bit unsigned integer.

#### asEuint16 (from uint)
```solidity
asEuint16(uint256 value) → euint16
asEuint16(uint256 value, int32 securityZone) → euint16
```
Converts a plaintext value to an encrypted 16-bit unsigned integer.

#### asEuint32 (from uint)
```solidity
asEuint32(uint256 value) → euint32
asEuint32(uint256 value, int32 securityZone) → euint32
```
Converts a plaintext value to an encrypted 32-bit unsigned integer.

#### asEuint64 (from uint)
```solidity
asEuint64(uint256 value) → euint64
asEuint64(uint256 value, int32 securityZone) → euint64
```
Converts a plaintext value to an encrypted 64-bit unsigned integer.

#### asEuint128 (from uint)
```solidity
asEuint128(uint256 value) → euint128
asEuint128(uint256 value, int32 securityZone) → euint128
```
Converts a plaintext value to an encrypted 128-bit unsigned integer.

#### asEuint256 (from uint)
```solidity
asEuint256(uint256 value) → euint256
asEuint256(uint256 value, int32 securityZone) → euint256
```
Converts a plaintext value to an encrypted 256-bit unsigned integer.

#### asEaddress (from address)
```solidity
asEaddress(address value) → eaddress
asEaddress(address value, int32 securityZone) → eaddress
```
Converts a plaintext address value to an encrypted address.

#### asEbool (from InEbool)
```solidity
asEbool(InEbool memory value) → ebool
```
Converts an encrypted input structure to an encrypted boolean.

#### asEuint8 (from InEuint8)
```solidity
asEuint8(InEuint8 memory value) → euint8
```
Converts an encrypted input structure to an encrypted 8-bit unsigned integer.

#### asEuint16 (from InEuint16)
```solidity
asEuint16(InEuint16 memory value) → euint16
```
Converts an encrypted input structure to an encrypted 16-bit unsigned integer.

#### asEuint32 (from InEuint32)
```solidity
asEuint32(InEuint32 memory value) → euint32
```
Converts an encrypted input structure to an encrypted 32-bit unsigned integer.

#### asEuint64 (from InEuint64)
```solidity
asEuint64(InEuint64 memory value) → euint64
```
Converts an encrypted input structure to an encrypted 64-bit unsigned integer.

#### asEuint128 (from InEuint128)
```solidity
asEuint128(InEuint128 memory value) → euint128
```
Converts an encrypted input structure to an encrypted 128-bit unsigned integer.

#### asEuint256 (from InEuint256)
```solidity
asEuint256(InEuint256 memory value) → euint256
```
Converts an encrypted input structure to an encrypted 256-bit unsigned integer.

#### asEaddress (from InEaddress)
```solidity
asEaddress(InEaddress memory value) → eaddress
```
Converts an encrypted input structure to an encrypted address.

### Type Conversion Between Encrypted Types

#### asEbool (from euint)
```solidity
asEbool(euint8 value) → ebool
asEbool(euint16 value) → ebool
asEbool(euint32 value) → ebool
asEbool(euint64 value) → ebool
asEbool(euint128 value) → ebool
asEbool(euint256 value) → ebool
asEbool(eaddress value) → ebool
```
Converts an encrypted integer to an encrypted boolean.

#### asEuint8 (from other encrypted types)
```solidity
asEuint8(ebool value) → euint8
asEuint8(euint16 value) → euint8
asEuint8(euint32 value) → euint8
asEuint8(euint64 value) → euint8
asEuint8(euint128 value) → euint8
asEuint8(euint256 value) → euint8
asEuint8(eaddress value) → euint8
```
Converts various encrypted types to an encrypted 8-bit unsigned integer.

#### asEuint16 (from other encrypted types)
```solidity
asEuint16(ebool value) → euint16
asEuint16(euint8 value) → euint16
asEuint16(euint32 value) → euint16
asEuint16(euint64 value) → euint16
asEuint16(euint128 value) → euint16
asEuint16(euint256 value) → euint16
asEuint16(eaddress value) → euint16
```
Converts various encrypted types to an encrypted 16-bit unsigned integer.

#### asEuint32 (from other encrypted types)
```solidity
asEuint32(ebool value) → euint32
asEuint32(euint8 value) → euint32
asEuint32(euint16 value) → euint32
asEuint32(euint64 value) → euint32
asEuint32(euint128 value) → euint32
asEuint32(euint256 value) → euint32
asEuint32(eaddress value) → euint32
```
Converts various encrypted types to an encrypted 32-bit unsigned integer.

#### asEuint64 (from other encrypted types)
```solidity
asEuint64(ebool value) → euint64
asEuint64(euint8 value) → euint64
asEuint64(euint16 value) → euint64
asEuint64(euint32 value) → euint64
asEuint64(euint128 value) → euint64
asEuint64(euint256 value) → euint64
asEuint64(eaddress value) → euint64
```
Converts various encrypted types to an encrypted 64-bit unsigned integer.

#### asEuint128 (from other encrypted types)
```solidity
asEuint128(ebool value) → euint128
asEuint128(euint8 value) → euint128
asEuint128(euint16 value) → euint128
asEuint128(euint32 value) → euint128
asEuint128(euint64 value) → euint128
asEuint128(euint256 value) → euint128
asEuint128(eaddress value) → euint128
```
Converts various encrypted types to an encrypted 128-bit unsigned integer.

#### asEuint256 (from other encrypted types)
```solidity
asEuint256(ebool value) → euint256
asEuint256(euint8 value) → euint256
asEuint256(euint16 value) → euint256
asEuint256(euint32 value) → euint256
asEuint256(euint64 value) → euint256
asEuint256(euint128 value) → euint256
asEuint256(eaddress value) → euint256
```
Converts various encrypted types to an encrypted 256-bit unsigned integer.

#### asEaddress (from euint256)
```solidity
asEaddress(euint256 value) → eaddress
```
Converts an encrypted 256-bit unsigned integer to an encrypted address.

### Arithmetic Operations

#### add (euint8)
```solidity
add(euint8 lhs, euint8 rhs) → euint8
```
Performs addition of two encrypted 8-bit unsigned integers.

#### add (euint16)
```solidity
add(euint16 lhs, euint16 rhs) → euint16
```
Performs addition of two encrypted 16-bit unsigned integers.

#### add (euint32)
```solidity
add(euint32 lhs, euint32 rhs) → euint32
```
Performs addition of two encrypted 32-bit unsigned integers.

#### add (euint64)
```solidity
add(euint64 lhs, euint64 rhs) → euint64
```
Performs addition of two encrypted 64-bit unsigned integers.

#### add (euint128)
```solidity
add(euint128 lhs, euint128 rhs) → euint128
```
Performs addition of two encrypted 128-bit unsigned integers.

#### add (euint256)
```solidity
add(euint256 lhs, euint256 rhs) → euint256
```
Performs addition of two encrypted 256-bit unsigned integers.

#### sub (euint8)
```solidity
sub(euint8 lhs, euint8 rhs) → euint8
```
Performs subtraction of two encrypted 8-bit unsigned integers.

#### sub (euint16)
```solidity
sub(euint16 lhs, euint16 rhs) → euint16
```
Performs subtraction of two encrypted 16-bit unsigned integers.

#### sub (euint32)
```solidity
sub(euint32 lhs, euint32 rhs) → euint32
```
Performs subtraction of two encrypted 32-bit unsigned integers.

#### sub (euint64)
```solidity
sub(euint64 lhs, euint64 rhs) → euint64
```
Performs subtraction of two encrypted 64-bit unsigned integers.

#### sub (euint128)
```solidity
sub(euint128 lhs, euint128 rhs) → euint128
```
Performs subtraction of two encrypted 128-bit unsigned integers.

#### sub (euint256)
```solidity
sub(euint256 lhs, euint256 rhs) → euint256
```
Performs subtraction of two encrypted 256-bit unsigned integers.

#### mul (euint8)
```solidity
mul(euint8 lhs, euint8 rhs) → euint8
```
Performs multiplication of two encrypted 8-bit unsigned integers.

#### mul (euint16)
```solidity
mul(euint16 lhs, euint16 rhs) → euint16
```
Performs multiplication of two encrypted 16-bit unsigned integers.

#### mul (euint32)
```solidity
mul(euint32 lhs, euint32 rhs) → euint32
```
Performs multiplication of two encrypted 32-bit unsigned integers.

#### mul (euint64)
```solidity
mul(euint64 lhs, euint64 rhs) → euint64
```
Performs multiplication of two encrypted 64-bit unsigned integers.

#### mul (euint128)
```solidity
mul(euint128 lhs, euint128 rhs) → euint128
```
Performs multiplication of two encrypted 128-bit unsigned integers.

#### mul (euint256)
```solidity
mul(euint256 lhs, euint256 rhs) → euint256
```
Performs multiplication of two encrypted 256-bit unsigned integers.

#### div (euint8)
```solidity
div(euint8 lhs, euint8 rhs) → euint8
```
Performs division of two encrypted 8-bit unsigned integers.

#### div (euint16)
```solidity
div(euint16 lhs, euint16 rhs) → euint16
```
Performs division of two encrypted 16-bit unsigned integers.

#### div (euint32)
```solidity
div(euint32 lhs, euint32 rhs) → euint32
```
Performs division of two encrypted 32-bit unsigned integers.

#### div (euint64)
```solidity
div(euint64 lhs, euint64 rhs) → euint64
```
Performs division of two encrypted 64-bit unsigned integers.

#### div (euint128)
```solidity
div(euint128 lhs, euint128 rhs) → euint128
```
Performs division of two encrypted 128-bit unsigned integers.

#### div (euint256)
```solidity
div(euint256 lhs, euint256 rhs) → euint256
```
Performs division of two encrypted 256-bit unsigned integers.

#### rem (euint8)
```solidity
rem(euint8 lhs, euint8 rhs) → euint8
```
Calculates the remainder when dividing two encrypted 8-bit unsigned integers.

#### rem (euint16)
```solidity
rem(euint16 lhs, euint16 rhs) → euint16
```
Calculates the remainder when dividing two encrypted 16-bit unsigned integers.

#### rem (euint32)
```solidity
rem(euint32 lhs, euint32 rhs) → euint32
```
Calculates the remainder when dividing two encrypted 32-bit unsigned integers.

#### rem (euint64)
```solidity
rem(euint64 lhs, euint64 rhs) → euint64
```
Calculates the remainder when dividing two encrypted 64-bit unsigned integers.

#### rem (euint128)
```solidity
rem(euint128 lhs, euint128 rhs) → euint128
```
Calculates the remainder when dividing two encrypted 128-bit unsigned integers.

#### rem (euint256)
```solidity
rem(euint256 lhs, euint256 rhs) → euint256
```
Calculates the remainder when dividing two encrypted 256-bit unsigned integers.

#### square (euint8)
```solidity
square(euint8 value) → euint8
```
Calculates the square of an encrypted 8-bit unsigned integer.

#### square (euint16)
```solidity
square(euint16 value) → euint16
```
Calculates the square of an encrypted 16-bit unsigned integer.

#### square (euint32)
```solidity
square(euint32 value) → euint32
```
Calculates the square of an encrypted 32-bit unsigned integer.

#### square (euint64)
```solidity
square(euint64 value) → euint64
```
Calculates the square of an encrypted 64-bit unsigned integer.

#### square (euint128)
```solidity
square(euint128 value) → euint128
```
Calculates the square of an encrypted 128-bit unsigned integer.

#### square (euint256)
```solidity
square(euint256 value) → euint256
```
Calculates the square of an encrypted 256-bit unsigned integer.

### Bitwise Operations

#### and (ebool)
```solidity
and(ebool lhs, ebool rhs) → ebool
```
Performs a bitwise AND operation on two encrypted boolean values.

#### and (euint8)
```solidity
and(euint8 lhs, euint8 rhs) → euint8
```
Performs a bitwise AND operation on two encrypted 8-bit unsigned integers.

#### and (euint16)
```solidity
and(euint16 lhs, euint16 rhs) → euint16
```
Performs a bitwise AND operation on two encrypted 16-bit unsigned integers.

#### and (euint32)
```solidity
and(euint32 lhs, euint32 rhs) → euint32
```
Performs a bitwise AND operation on two encrypted 32-bit unsigned integers.

#### and (euint64)
```solidity
and(euint64 lhs, euint64 rhs) → euint64
```
Performs a bitwise AND operation on two encrypted 64-bit unsigned integers.

#### and (euint128)
```solidity
and(euint128 lhs, euint128 rhs) → euint128
```
Performs a bitwise AND operation on two encrypted 128-bit unsigned integers.

#### and (euint256)
```solidity
and(euint256 lhs, euint256 rhs) → euint256
```
Performs a bitwise AND operation on two encrypted 256-bit unsigned integers.

#### or (ebool)
```solidity
or(ebool lhs, ebool rhs) → ebool
```
Performs a bitwise OR operation on two encrypted boolean values.

#### or (euint8)
```solidity
or(euint8 lhs, euint8 rhs) → euint8
```
Performs a bitwise OR operation on two encrypted 8-bit unsigned integers.

#### or (euint16)
```solidity
or(euint16 lhs, euint16 rhs) → euint16
```
Performs a bitwise OR operation on two encrypted 16-bit unsigned integers.

#### or (euint32)
```solidity
or(euint32 lhs, euint32 rhs) → euint32
```
Performs a bitwise OR operation on two encrypted 32-bit unsigned integers.

#### or (euint64)
```solidity
or(euint64 lhs, euint64 rhs) → euint64
```
Performs a bitwise OR operation on two encrypted 64-bit unsigned integers.

#### or (euint128)
```solidity
or(euint128 lhs, euint128 rhs) → euint128
```
Performs a bitwise OR operation on two encrypted 128-bit unsigned integers.

#### or (euint256)
```solidity
or(euint256 lhs, euint256 rhs) → euint256
```
Performs a bitwise OR operation on two encrypted 256-bit unsigned integers.

#### xor (ebool)
```solidity
xor(ebool lhs, ebool rhs) → ebool
```
Performs a bitwise XOR operation on two encrypted boolean values.

#### xor (euint8)
```solidity
xor(euint8 lhs, euint8 rhs) → euint8
```
Performs a bitwise XOR operation on two encrypted 8-bit unsigned integers.

#### xor (euint16)
```solidity
xor(euint16 lhs, euint16 rhs) → euint16
```
Performs a bitwise XOR operation on two encrypted 16-bit unsigned integers.

#### xor (euint32)
```solidity
xor(euint32 lhs, euint32 rhs) → euint32
```
Performs a bitwise XOR operation on two encrypted 32-bit unsigned integers.

#### xor (euint64)
```solidity
xor(euint64 lhs, euint64 rhs) → euint64
```
Performs a bitwise XOR operation on two encrypted 64-bit unsigned integers.

#### xor (euint128)
```solidity
xor(euint128 lhs, euint128 rhs) → euint128
```
Performs a bitwise XOR operation on two encrypted 128-bit unsigned integers.

#### xor (euint256)
```solidity
xor(euint256 lhs, euint256 rhs) → euint256
```
Performs a bitwise XOR operation on two encrypted 256-bit unsigned integers.

#### not (ebool)
```solidity
not(ebool value) → ebool
```
Performs a bitwise NOT operation on an encrypted boolean value.

#### not (euint8)
```solidity
not(euint8 value) → euint8
```
Performs a bitwise NOT operation on an encrypted 8-bit unsigned integer.

#### not (euint16)
```solidity
not(euint16 value) → euint16
```
Performs a bitwise NOT operation on an encrypted 16-bit unsigned integer.

#### not (euint32)
```solidity
not(euint32 value) → euint32
```
Performs a bitwise NOT operation on an encrypted 32-bit unsigned integer.

#### not (euint64)
```solidity
not(euint64 value) → euint64
```
Performs a bitwise NOT operation on an encrypted 64-bit unsigned integer.

#### not (euint128)
```solidity
not(euint128 value) → euint128
```
Performs a bitwise NOT operation on an encrypted 128-bit unsigned integer.

#### not (euint256)
```solidity
not(euint256 value) → euint256
```
Performs a bitwise NOT operation on an encrypted 256-bit unsigned integer.

#### shl (euint8)
```solidity
shl(euint8 lhs, euint8 rhs) → euint8
```
Performs a shift left operation on an encrypted 8-bit unsigned integer.

#### shl (euint16)
```solidity
shl(euint16 lhs, euint16 rhs) → euint16
```
Performs a shift left operation on an encrypted 16-bit unsigned integer.

#### shl (euint32)
```solidity
shl(euint32 lhs, euint32 rhs) → euint32
```
Performs a shift left operation on an encrypted 32-bit unsigned integer.

#### shl (euint64)
```solidity
shl(euint64 lhs, euint64 rhs) → euint64
```
Performs a shift left operation on an encrypted 64-bit unsigned integer.

#### shl (euint128)
```solidity
shl(euint128 lhs, euint128 rhs) → euint128
```
Performs a shift left operation on an encrypted 128-bit unsigned integer.

#### shl (euint256)
```solidity
shl(euint256 lhs, euint256 rhs) → euint256
```
Performs a shift left operation on an encrypted 256-bit unsigned integer.

#### shr (euint8)
```solidity
shr(euint8 lhs, euint8 rhs) → euint8
```
Performs a shift right operation on an encrypted 8-bit unsigned integer.

#### shr (euint16)
```solidity
shr(euint16 lhs, euint16 rhs) → euint16
```
Performs a shift right operation on an encrypted 16-bit unsigned integer.

#### shr (euint32)
```solidity
shr(euint32 lhs, euint32 rhs) → euint32
```
Performs a shift right operation on an encrypted 32-bit unsigned integer.

#### shr (euint64)
```solidity
shr(euint64 lhs, euint64 rhs) → euint64
```
Performs a shift right operation on an encrypted 64-bit unsigned integer.

#### shr (euint128)
```solidity
shr(euint128 lhs, euint128 rhs) → euint128
```
Performs a shift right operation on an encrypted 128-bit unsigned integer.

#### shr (euint256)
```solidity
shr(euint256 lhs, euint256 rhs) → euint256
```
Performs a shift right operation on an encrypted 256-bit unsigned integer.

#### rol (euint8)
```solidity
rol(euint8 lhs, euint8 rhs) → euint8
```
Performs a rotate left operation on an encrypted 8-bit unsigned integer.

#### rol (euint16)
```solidity
rol(euint16 lhs, euint16 rhs) → euint16
```
Performs a rotate left operation on an encrypted 16-bit unsigned integer.

#### rol (euint32)
```solidity
rol(euint32 lhs, euint32 rhs) → euint32
```
Performs a rotate left operation on an encrypted 32-bit unsigned integer.

#### rol (euint64)
```solidity
rol(euint64 lhs, euint64 rhs) → euint64
```
Performs a rotate left operation on an encrypted 64-bit unsigned integer.

#### rol (euint128)
```solidity
rol(euint128 lhs, euint128 rhs) → euint128
```
Performs a rotate left operation on an encrypted 128-bit unsigned integer.

#### rol (euint256)
```solidity
rol(euint256 lhs, euint256 rhs) → euint256
```
Performs a rotate left operation on an encrypted 256-bit unsigned integer.

#### ror (euint8)
```solidity
ror(euint8 lhs, euint8 rhs) → euint8
```
Performs a rotate right operation on an encrypted 8-bit unsigned integer.

#### ror (euint16)
```solidity
ror(euint16 lhs, euint16 rhs) → euint16
```
Performs a rotate right operation on an encrypted 16-bit unsigned integer.

#### ror (euint32)
```solidity
ror(euint32 lhs, euint32 rhs) → euint32
```
Performs a rotate right operation on an encrypted 32-bit unsigned integer.

#### ror (euint64)
```solidity
ror(euint64 lhs, euint64 rhs) → euint64
```
Performs a rotate right operation on an encrypted 64-bit unsigned integer.

#### ror (euint128)
```solidity
ror(euint128 lhs, euint128 rhs) → euint128
```
Performs a rotate right operation on an encrypted 128-bit unsigned integer.

#### ror (euint256)
```solidity
ror(euint256 lhs, euint256 rhs) → euint256
```
Performs a rotate right operation on an encrypted 256-bit unsigned integer.

### Comparison Operations

#### eq (ebool)
```solidity
eq(ebool lhs, ebool rhs) → ebool
```
Checks if two encrypted boolean values are equal and returns an encrypted boolean.

#### eq (euint8)
```solidity
eq(euint8 lhs, euint8 rhs) → ebool
```
Checks if two encrypted 8-bit unsigned integers are equal and returns an encrypted boolean.

#### eq (euint16)
```solidity
eq(euint16 lhs, euint16 rhs) → ebool
```
Checks if two encrypted 16-bit unsigned integers are equal and returns an encrypted boolean.

#### eq (euint32)
```solidity
eq(euint32 lhs, euint32 rhs) → ebool
```
Checks if two encrypted 32-bit unsigned integers are equal and returns an encrypted boolean.

#### eq (euint64)
```solidity
eq(euint64 lhs, euint64 rhs) → ebool
```
Checks if two encrypted 64-bit unsigned integers are equal and returns an encrypted boolean.

#### eq (euint128)
```solidity
eq(euint128 lhs, euint128 rhs) → ebool
```
Checks if two encrypted 128-bit unsigned integers are equal and returns an encrypted boolean.

#### eq (euint256)
```solidity
eq(euint256 lhs, euint256 rhs) → ebool
```
Checks if two encrypted 256-bit unsigned integers are equal and returns an encrypted boolean.

#### eq (eaddress)
```solidity
eq(eaddress lhs, eaddress rhs) → ebool
```
Checks if two encrypted addresses are equal and returns an encrypted boolean.

#### ne (ebool)
```solidity
ne(ebool lhs, ebool rhs) → ebool
```
Checks if two encrypted boolean values are not equal and returns an encrypted boolean.

#### ne (euint8)
```solidity
ne(euint8 lhs, euint8 rhs) → ebool
```
Checks if two encrypted 8-bit unsigned integers are not equal and returns an encrypted boolean.

#### ne (euint16)
```solidity
ne(euint16 lhs, euint16 rhs) → ebool
```
Checks if two encrypted 16-bit unsigned integers are not equal and returns an encrypted boolean.

#### ne (euint32)
```solidity
ne(euint32 lhs, euint32 rhs) → ebool
```
Checks if two encrypted 32-bit unsigned integers are not equal and returns an encrypted boolean.

#### ne (euint64)
```solidity
ne(euint64 lhs, euint64 rhs) → ebool
```
Checks if two encrypted 64-bit unsigned integers are not equal and returns an encrypted boolean.

#### ne (euint128)
```solidity
ne(euint128 lhs, euint128 rhs) → ebool
```
Checks if two encrypted 128-bit unsigned integers are not equal and returns an encrypted boolean.

#### ne (euint256)
```solidity
ne(euint256 lhs, euint256 rhs) → ebool
```
Checks if two encrypted 256-bit unsigned integers are not equal and returns an encrypted boolean.

#### ne (eaddress)
```solidity
ne(eaddress lhs, eaddress rhs) → ebool
```
Checks if two encrypted addresses are not equal and returns an encrypted boolean.

#### lt (euint8)
```solidity
lt(euint8 lhs, euint8 rhs) → ebool
```
Checks if the first encrypted 8-bit unsigned integer is less than the second and returns an encrypted boolean.

#### lt (euint16)
```solidity
lt(euint16 lhs, euint16 rhs) → ebool
```
Checks if the first encrypted 16-bit unsigned integer is less than the second and returns an encrypted boolean.

#### lt (euint32)
```solidity
lt(euint32 lhs, euint32 rhs) → ebool
```
Checks if the first encrypted 32-bit unsigned integer is less than the second and returns an encrypted boolean.

#### lt (euint64)
```solidity
lt(euint64 lhs, euint64 rhs) → ebool
```
Checks if the first encrypted 64-bit unsigned integer is less than the second and returns an encrypted boolean.

#### lt (euint128)
```solidity
lt(euint128 lhs, euint128 rhs) → ebool
```
Checks if the first encrypted 128-bit unsigned integer is less than the second and returns an encrypted boolean.

#### lt (euint256)
```solidity
lt(euint256 lhs, euint256 rhs) → ebool
```
Checks if the first encrypted 256-bit unsigned integer is less than the second and returns an encrypted boolean.

#### lte (euint8)
```solidity
lte(euint8 lhs, euint8 rhs) → ebool
```
Checks if the first encrypted 8-bit unsigned integer is less than or equal to the second and returns an encrypted boolean.

#### lte (euint16)
```solidity
lte(euint16 lhs, euint16 rhs) → ebool
```
Checks if the first encrypted 16-bit unsigned integer is less than or equal to the second and returns an encrypted boolean.

#### lte (euint32)
```solidity
lte(euint32 lhs, euint32 rhs) → ebool
```
Checks if the first encrypted 32-bit unsigned integer is less than or equal to the second and returns an encrypted boolean.

#### lte (euint64)
```solidity
lte(euint64 lhs, euint64 rhs) → ebool
```
Checks if the first encrypted 64-bit unsigned integer is less than or equal to the second and returns an encrypted boolean.

#### lte (euint128)
```solidity
lte(euint128 lhs, euint128 rhs) → ebool
```
Checks if the first encrypted 128-bit unsigned integer is less than or equal to the second and returns an encrypted boolean.

#### lte (euint256)
```solidity
lte(euint256 lhs, euint256 rhs) → ebool
```
Checks if the first encrypted 256-bit unsigned integer is less than or equal to the second and returns an encrypted boolean.

#### gt (euint8)
```solidity
gt(euint8 lhs, euint8 rhs) → ebool
```
Checks if the first encrypted 8-bit unsigned integer is greater than the second and returns an encrypted boolean.

#### gt (euint16)
```solidity
gt(euint16 lhs, euint16 rhs) → ebool
```
Checks if the first encrypted 16-bit unsigned integer is greater than the second and returns an encrypted boolean.

#### gt (euint32)
```solidity
gt(euint32 lhs, euint32 rhs) → ebool
```
Checks if the first encrypted 32-bit unsigned integer is greater than the second and returns an encrypted boolean.

#### gt (euint64)
```solidity
gt(euint64 lhs, euint64 rhs) → ebool
```
Checks if the first encrypted 64-bit unsigned integer is greater than the second and returns an encrypted boolean.

#### gt (euint128)
```solidity
gt(euint128 lhs, euint128 rhs) → ebool
```
Checks if the first encrypted 128-bit unsigned integer is greater than the second and returns an encrypted boolean.

#### gt (euint256)
```solidity
gt(euint256 lhs, euint256 rhs) → ebool
```
Checks if the first encrypted 256-bit unsigned integer is greater than the second and returns an encrypted boolean.

#### gte (euint8)
```solidity
gte(euint8 lhs, euint8 rhs) → ebool
```
Checks if the first encrypted 8-bit unsigned integer is greater than or equal to the second and returns an encrypted boolean.

#### gte (euint16)
```solidity
gte(euint16 lhs, euint16 rhs) → ebool
```
Checks if the first encrypted 16-bit unsigned integer is greater than or equal to the second and returns an encrypted boolean.

#### gte (euint32)
```solidity
gte(euint32 lhs, euint32 rhs) → ebool
```
Checks if the first encrypted 32-bit unsigned integer is greater than or equal to the second and returns an encrypted boolean.

#### gte (euint64)
```solidity
gte(euint64 lhs, euint64 rhs) → ebool
```
Checks if the first encrypted 64-bit unsigned integer is greater than or equal to the second and returns an encrypted boolean.

#### gte (euint128)
```solidity
gte(euint128 lhs, euint128 rhs) → ebool
```
Checks if the first encrypted 128-bit unsigned integer is greater than or equal to the second and returns an encrypted boolean.

#### gte (euint256)
```solidity
gte(euint256 lhs, euint256 rhs) → ebool
```
Checks if the first encrypted 256-bit unsigned integer is greater than or equal to the second and returns an encrypted boolean.

### Min/Max Functions

#### min (euint8)
```solidity
min(euint8 lhs, euint8 rhs) → euint8
```
Returns the smaller of two encrypted 8-bit unsigned integers.

#### min (euint16)
```solidity
min(euint16 lhs, euint16 rhs) → euint16
```
Returns the smaller of two encrypted 16-bit unsigned integers.

#### min (euint32)
```solidity
min(euint32 lhs, euint32 rhs) → euint32
```
Returns the smaller of two encrypted 32-bit unsigned integers.

#### min (euint64)
```solidity
min(euint64 lhs, euint64 rhs) → euint64
```
Returns the smaller of two encrypted 64-bit unsigned integers.

#### min (euint128)
```solidity
min(euint128 lhs, euint128 rhs) → euint128
```
Returns the smaller of two encrypted 128-bit unsigned integers.

#### min (euint256)
```solidity
min(euint256 lhs, euint256 rhs) → euint256
```
Returns the smaller of two encrypted 256-bit unsigned integers.

#### max (euint8)
```solidity
max(euint8 lhs, euint8 rhs) → euint8
```
Returns the larger of two encrypted 8-bit unsigned integers.

#### max (euint16)
```solidity
max(euint16 lhs, euint16 rhs) → euint16
```
Returns the larger of two encrypted 16-bit unsigned integers.

#### max (euint32)
```solidity
max(euint32 lhs, euint32 rhs) → euint32
```
Returns the larger of two encrypted 32-bit unsigned integers.

#### max (euint64)
```solidity
max(euint64 lhs, euint64 rhs) → euint64
```
Returns the larger of two encrypted 64-bit unsigned integers.

#### max (euint128)
```solidity
max(euint128 lhs, euint128 rhs) → euint128
```
Returns the larger of two encrypted 128-bit unsigned integers.

#### max (euint256)
```solidity
max(euint256 lhs, euint256 rhs) → euint256
```
Returns the larger of two encrypted 256-bit unsigned integers.

### Control Flow

#### select (euint8)
```solidity
select(ebool condition, euint8 ifTrue, euint8 ifFalse) → euint8
```
Conditionally selects between two encrypted 8-bit unsigned integers based on an encrypted boolean condition.

#### select (euint16)
```solidity
select(ebool condition, euint16 ifTrue, euint16 ifFalse) → euint16
```
Conditionally selects between two encrypted 16-bit unsigned integers based on an encrypted boolean condition.

#### select (euint32)
```solidity
select(ebool condition, euint32 ifTrue, euint32 ifFalse) → euint32
```
Conditionally selects between two encrypted 32-bit unsigned integers based on an encrypted boolean condition.

#### select (euint64)
```solidity
select(ebool condition, euint64 ifTrue, euint64 ifFalse) → euint64
```
Conditionally selects between two encrypted 64-bit unsigned integers based on an encrypted boolean condition.

#### select (euint128)
```solidity
select(ebool condition, euint128 ifTrue, euint128 ifFalse) → euint128
```
Conditionally selects between two encrypted 128-bit unsigned integers based on an encrypted boolean condition.

#### select (euint256)
```solidity
select(ebool condition, euint256 ifTrue, euint256 ifFalse) → euint256
```
Conditionally selects between two encrypted 256-bit unsigned integers based on an encrypted boolean condition.

#### select (ebool)
```solidity
select(ebool condition, ebool ifTrue, ebool ifFalse) → ebool
```
Conditionally selects between two encrypted boolean values based on an encrypted boolean condition.

#### select (eaddress)
```solidity
select(ebool condition, eaddress ifTrue, eaddress ifFalse) → eaddress
```
Conditionally selects between two encrypted addresses based on an encrypted boolean condition.

### Encryption and Decryption

#### encrypt (bool)
```solidity
encrypt(bool value) → ebool
```
Encrypts a plaintext boolean value.

#### encrypt (uint8)
```solidity
encrypt(uint8 value) → euint8
```
Encrypts a plaintext 8-bit unsigned integer.

#### encrypt (uint16)
```solidity
encrypt(uint16 value) → euint16
```
Encrypts a plaintext 16-bit unsigned integer.

#### encrypt (uint32)
```solidity
encrypt(uint32 value) → euint32
```
Encrypts a plaintext 32-bit unsigned integer.

#### encrypt (uint64)
```solidity
encrypt(uint64 value) → euint64
```
Encrypts a plaintext 64-bit unsigned integer.

#### encrypt (uint128)
```solidity
encrypt(uint128 value) → euint128
```
Encrypts a plaintext 128-bit unsigned integer.

#### encrypt (uint256)
```solidity
encrypt(uint256 value) → euint256
```
Encrypts a plaintext 256-bit unsigned integer.

#### encrypt (address)
```solidity
encrypt(address value) → eaddress
```
Encrypts a plaintext Ethereum address.

#### decrypt (ebool)
```solidity
decrypt(ebool value) → bool
```
Decrypts an encrypted boolean value. The caller must have permission to access the encrypted value.

#### decrypt (euint8)
```solidity
decrypt(euint8 value) → uint8
```
Decrypts an encrypted 8-bit unsigned integer. The caller must have permission to access the encrypted value.

#### decrypt (euint16)
```solidity
decrypt(euint16 value) → uint16
```
Decrypts an encrypted 16-bit unsigned integer. The caller must have permission to access the encrypted value.

#### decrypt (euint32)
```solidity
decrypt(euint32 value) → uint32
```
Decrypts an encrypted 32-bit unsigned integer. The caller must have permission to access the encrypted value.

#### decrypt (euint64)
```solidity
decrypt(euint64 value) → uint64
```
Decrypts an encrypted 64-bit unsigned integer. The caller must have permission to access the encrypted value.

#### decrypt (euint128)
```solidity
decrypt(euint128 value) → uint128
```
Decrypts an encrypted 128-bit unsigned integer. The caller must have permission to access the encrypted value.

#### decrypt (euint256)
```solidity
decrypt(euint256 value) → uint256
```
Decrypts an encrypted 256-bit unsigned integer. The caller must have permission to access the encrypted value.

#### decrypt (eaddress)
```solidity
decrypt(eaddress value) → address
```
Decrypts an encrypted Ethereum address. The caller must have permission to access the encrypted value.

### Decrypt Result Retrieval

#### getDecryptResult
```solidity
getDecryptResult(uint256 input) → uint256
```
Retrieves the decrypted result of a previously decrypted value. This function should be called after requesting decryption with `decrypt()`.
The function will revert if the decryption result is not available yet.

#### getDecryptResultSafe
```solidity
getDecryptResultSafe(uint256 input) → uint256 result, bool decrypted
```
Safely retrieves the decrypted result of a previously decrypted value. Unlike `getDecryptResult`, this function returns a boolean flag indicating whether the decryption is complete, avoiding the need to handle reverts.

Returns: `result`: The decrypted value, `decrypted`: A boolean indicating whether the decryption has completed successfully

### Access Control

#### allow (ebool)
```solidity
allow(ebool value, address account)
```
Grants permission to the specified account to access the encrypted boolean value.

#### allow (euint8)
```solidity
allow(euint8 value, address account)
```
Grants permission to the specified account to access the encrypted 8-bit unsigned integer.

#### allow (euint16)
```solidity
allow(euint16 value, address account)
```
Grants permission to the specified account to access the encrypted 16-bit unsigned integer.

#### allow (euint32)
```solidity
allow(euint32 value, address account)
```
Grants permission to the specified account to access the encrypted 32-bit unsigned integer.

#### allow (euint64)
```solidity
allow(euint64 value, address account)
```
Grants permission to the specified account to access the encrypted 64-bit unsigned integer.

#### allow (euint128)
```solidity
allow(euint128 value, address account)
```
Grants permission to the specified account to access the encrypted 128-bit unsigned integer.

#### allow (euint256)
```solidity
allow(euint256 value, address account)
```
Grants permission to the specified account to access the encrypted 256-bit unsigned integer.

#### allow (eaddress)
```solidity
allow(eaddress value, address account)
```
Grants permission to the specified account to access the encrypted Ethereum address.

#### allowThis (ebool)
```solidity
allowThis(ebool value)
```
Grants permission to the current contract to access the encrypted boolean value.

#### allowThis (euint8)
```solidity
allowThis(euint8 value)
```
Grants permission to the current contract to access the encrypted 8-bit unsigned integer.

#### allowThis (euint16)
```solidity
allowThis(euint16 value)
```
Grants permission to the current contract to access the encrypted 16-bit unsigned integer.

#### allowThis (euint32)
```solidity
allowThis(euint32 value)
```
Grants permission to the current contract to access the encrypted 32-bit unsigned integer.

#### allowThis (euint64)
```solidity
allowThis(euint64 value)
```
Grants permission to the current contract to access the encrypted 64-bit unsigned integer.

#### allowThis (euint128)
```solidity
allowThis(euint128 value)
```
Grants permission to the current contract to access the encrypted 128-bit unsigned integer.

#### allowThis (euint256)
```solidity
allowThis(euint256 value)
```
Grants permission to the current contract to access the encrypted 256-bit unsigned integer.

#### allowThis (eaddress)
```solidity
allowThis(eaddress value)
```
Grants permission to the current contract to access the encrypted Ethereum address.

#### allowGlobal (ebool)
```solidity
allowGlobal(ebool value)
```
Grants global permission to access the encrypted boolean value.

#### allowGlobal (euint8)
```solidity
allowGlobal(euint8 value)
```
Grants global permission to access the encrypted 8-bit unsigned integer.

#### allowGlobal (euint16)
```solidity
allowGlobal(euint16 value)
```
Grants global permission to access the encrypted 16-bit unsigned integer.

#### allowGlobal (euint32)
```solidity
allowGlobal(euint32 value)
```
Grants global permission to access the encrypted 32-bit unsigned integer.

#### allowGlobal (euint64)
```solidity
allowGlobal(euint64 value)
```
Grants global permission to access the encrypted 64-bit unsigned integer.

#### allowGlobal (euint128)
```solidity
allowGlobal(euint128 value)
```
Grants global permission to access the encrypted 128-bit unsigned integer.

#### allowGlobal (euint256)
```solidity
allowGlobal(euint256 value)
```
Grants global permission to access the encrypted 256-bit unsigned integer.

#### allowGlobal (eaddress)
```solidity
allowGlobal(eaddress value)
```
Grants global permission to access the encrypted Ethereum address.

#### allowSender (ebool)
```solidity
allowSender(ebool value)
```
Grants permission to the message sender to access the encrypted boolean value.

#### allowSender (euint8)
```solidity
allowSender(euint8 value)
```
Grants permission to the message sender to access the encrypted 8-bit unsigned integer.

#### allowSender (euint16)
```solidity
allowSender(euint16 value)
```
Grants permission to the message sender to access the encrypted 16-bit unsigned integer.

#### allowSender (euint32)
```solidity
allowSender(euint32 value)
```
Grants permission to the message sender to access the encrypted 32-bit unsigned integer.

#### allowSender (euint64)
```solidity
allowSender(euint64 value)
```
Grants permission to the message sender to access the encrypted 64-bit unsigned integer.

#### allowSender (euint128)
```solidity
allowSender(euint128 value)
```
Grants permission to the message sender to access the encrypted 128-bit unsigned integer.

#### allowSender (euint256)
```solidity
allowSender(euint256 value)
```
Grants permission to the message sender to access the encrypted 256-bit unsigned integer.

#### allowSender (eaddress)
```solidity
allowSender(eaddress value)
```
Grants permission to the message sender to access the encrypted Ethereum address.

#### allowTransient (ebool)
```solidity
allowTransient(ebool value, address account)
```
Grants temporary permission to the specified account to access the encrypted boolean value.

#### allowTransient (euint8)
```solidity
allowTransient(euint8 value, address account)
```
Grants temporary permission to the specified account to access the encrypted 8-bit unsigned integer.

#### allowTransient (euint16)
```solidity
allowTransient(euint16 value, address account)
```
Grants temporary permission to the specified account to access the encrypted 16-bit unsigned integer.

#### allowTransient (euint32)
```solidity
allowTransient(euint32 value, address account)
```
Grants temporary permission to the specified account to access the encrypted 32-bit unsigned integer.

#### allowTransient (euint64)
```solidity
allowTransient(euint64 value, address account)
```
Grants temporary permission to the specified account to access the encrypted 64-bit unsigned integer.

#### allowTransient (euint128)
```solidity
allowTransient(euint128 value, address account)
```
Grants temporary permission to the specified account to access the encrypted 128-bit unsigned integer.

#### allowTransient (euint256)
```solidity
allowTransient(euint256 value, address account)
```
Grants temporary permission to the specified account to access the encrypted 256-bit unsigned integer.

#### allowTransient (eaddress)
```solidity
allowTransient(eaddress value, address account)
```
Grants temporary permission to the specified account to access the encrypted Ethereum address.

#### isAllowed (ebool)
```solidity
isAllowed(ebool value, address account) → bool
```
Checks if the specified account has permission to access the encrypted boolean value.

#### isAllowed (euint8)
```solidity
isAllowed(euint8 value, address account) → bool
```
Checks if the specified account has permission to access the encrypted 8-bit unsigned integer.

#### isAllowed (euint16)
```solidity
isAllowed(euint16 value, address account) → bool
```
Checks if the specified account has permission to access the encrypted 16-bit unsigned integer.

#### isAllowed (euint32)
```solidity
isAllowed(euint32 value, address account) → bool
```
Checks if the specified account has permission to access the encrypted 32-bit unsigned integer.

#### isAllowed (euint64)
```solidity
isAllowed(euint64 value, address account) → bool
```
Checks if the specified account has permission to access the encrypted 64-bit unsigned integer.

#### isAllowed (euint128)
```solidity
isAllowed(euint128 value, address account) → bool
```
Checks if the specified account has permission to access the encrypted 128-bit unsigned integer.

#### isAllowed (euint256)
```solidity
isAllowed(euint256 value, address account) → bool
```
Checks if the specified account has permission to access the encrypted 256-bit unsigned integer.

#### isAllowed (eaddress)
```solidity
isAllowed(eaddress value, address account) → bool
```
Checks if the specified account has permission to access the encrypted Ethereum address.

## Bindings

The FHE library provides binding libraries that enable syntactic sugar for working with encrypted types. These bindings allow for more intuitive and object-oriented usage patterns.

### Available Binding Functions

With bindings, you can use encrypted types with dot notation:

```solidity
// Without bindings
euint8 sum = FHE.add(a, b);

// With bindings
euint8 sum = a.add(b);
```

Each encrypted type has a corresponding binding library that includes all the operations available for that type. For example, with `euint8` bindings:

#### Arithmetic Operations
```solidity
// Use secure encrypted input
InEuint8 encryptedInputA;  // This would be provided by the user's client-side encryption
InEuint8 encryptedInputB;  // This would be provided by the user's client-side encryption

euint8 a = FHE.asEuint8(encryptedInputA);
euint8 b = FHE.asEuint8(encryptedInputB);

euint8 sum = a.add(b);        // Addition
euint8 diff = a.sub(b);       // Subtraction
euint8 product = a.mul(b);    // Multiplication
euint8 quotient = a.div(b);   // Division
euint8 remainder = a.rem(b);  // Remainder
euint8 squared = a.square();  // Square
```

#### Bitwise Operations
```solidity
euint8 bitwiseAnd = a.and(b);   // AND
euint8 bitwiseOr = a.or(b);     // OR
euint8 bitwiseXor = a.xor(b);   // XOR
euint8 bitwiseNot = a.not();    // NOT
euint8 shiftLeft = a.shl(b);    // Shift Left
euint8 shiftRight = a.shr(b);   // Shift Right
euint8 rotateLeft = a.rol(b);   // Rotate Left
euint8 rotateRight = a.ror(b);  // Rotate Right
```

#### Comparison Operations
```solidity
ebool isEqual = a.eq(b);          // Equal
ebool isNotEqual = a.ne(b);       // Not Equal
ebool isLessThan = a.lt(b);       // Less Than
ebool isLessEqual = a.lte(b);     // Less Than or Equal
ebool isGreaterThan = a.gt(b);    // Greater Than
ebool isGreaterEqual = a.gte(b);  // Greater Than or Equal
```

#### Min/Max Functions
```solidity
euint8 minimum = a.min(b);  // Minimum
euint8 maximum = a.max(b);  // Maximum
```

#### Type Conversion
```solidity
ebool converted = a.toBool();    // Convert to ebool
euint16 toU16 = a.toU16();       // Convert to euint16
euint32 toU32 = a.toU32();       // Convert to euint32
euint64 toU64 = a.toU64();       // Convert to euint64
euint128 toU128 = a.toU128();    // Convert to euint128
euint256 toU256 = a.toU256();    // Convert to euint256
```

#### Access Control
```solidity
a.decrypt();                            // Decrypt
a.allow(address);                       // Allow access
a.allowThis();                          // Allow this contract
a.allowGlobal();                        // Allow global access
a.allowSender();                        // Allow sender
a.allowTransient(address);              // Allow transient access
bool hasAccess = a.isAllowed(address);  // Check access
```

## Security Considerations

1. **Initialization**: All FHE functions check if their inputs are initialized and set them to 0 if not.

3. **Decryption**: Decryption functions reveal the plaintext values and should be used with caution.

4. **Security Zones**: Some functions accept a `securityZone` parameter to isolate different encrypted computations. FHE operations can only be performed between ciphertexts that share the same security zone.

5. **Access Control**: The library provides fine-grained access control through the `allow*` functions.

## Example Usage

These examples show how to perform private computations (if b>a then sum else product) while keeping all intermediate values encrypted.

### Basic Usage
```solidity
// Use secure encrypted input
InEuint8 encryptedInputA;  // This would be provided by the user's client-side encryption
InEuint8 encryptedInputB;  // This would be provided by the user's client-side encryption

euint8 a = FHE.asEuint8(encryptedInputA);
euint8 b = FHE.asEuint8(encryptedInputB);

// Perform operations
euint8 sum = FHE.add(a, b);  // Encrypted addition
euint8 product = FHE.mul(a, b);  // Encrypted multiplication
ebool isGreater = FHE.gt(b, a);  // Encrypted comparison

// Conditional logic
euint8 result = FHE.select(isGreater, sum, product);

// Decrypt the result (allow the contract to access it)
result.allowThis();
uint8 decryptedResult = FHE.decrypt(result);
```

### With Bindings
```solidity
// Use secure encrypted input
InEuint8 encryptedInputA;  // This would be provided by the user's client-side encryption
InEuint8 encryptedInputB;  // This would be provided by the user's client-side encryption

euint8 a = FHE.asEuint8(encryptedInputA);
euint8 b = FHE.asEuint8(encryptedInputB);

// Perform operations using dot notation
euint8 sum = a.add(b);               // Encrypted addition
euint8 product = a.mul(b);           // Encrypted multiplication
ebool isGreater = b.gt(a);           // Encrypted comparison

// Conditional logic
euint8 result = isGreater.select(sum, product);

// Decrypt the result (allow the contract to access it)
result.allowThis();
uint8 decryptedResult = FHE.decrypt(result);
```