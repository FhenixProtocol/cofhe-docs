---
title: Security Zones
sidebar_position: 8
---

## Why we need Security Zones

In various use cases, scenarios, and applications, different levels of security, trust, and performance may be required. However, it is preferable to have everything operate within a single blockchain, as deploying across multiple networks (blockchains) is cumbersome and has its own unique challenges, such as bridging, coordination and more. Furthermore, different parts of a single application may require unique combinations of various configurations. Settling on a single configuration would typically compromise overall security and performance—leaving the application only as secure as its weakest or as fast as its slowest component.

## What are Security Zones

Fhenix developed Security Zones to address this problem. With Fhenix, multiple encryption key sets (i.e., Security Zones) can coexist on a single network. Previously, we were limited to optimizing a single cryptographic key set to meet average security and performance needs. Now, with multiple Security Zones, Fhenix can tailor encryption configurations to specific use cases, eliminating the need to compromise on security, performance, or trust.

For example, highly sensitive information can be protected with maximum security guarantees by using a Threshold Network for encryption. For less sensitive data, a local key set controlled by the sequencer may suffice, offering better performance with slightly lower but acceptable trust assumptions. Similarly, some applications may prefer an encryption scheme that specializes in small ciphertext sizes but slower computation, while apps may need to optimize for transaction price above everything else. Security zones will allow having different schemes with different configurations, all under one roof.

:::warning[Important Dev Hint]
An important nuance of Security Zones is that two ciphertexts that are encrypted using two different security zones are not compatible, since every Zone represents a different set of **FHE keys**. For example, we cannot compute enc(a) + enc(b), where a and b were encrypted using different Zones.
:::
:::info[Note]
Currently, creating new Security Zones is not dynamically supported, which means that users cannot implement this feature on their own. Rather, they must choose between the existing, pre-generated Security Zones available with CoFHE on launch. However, we may add a dynamic Security Zones feature in the future.
:::

:::note[Current Status]
CoFHE currently provides a single Security Zone optimized for general use cases, balancing security and performance. Additional Security Zones may be introduced in future releases to support different security and performance requirements.
:::


