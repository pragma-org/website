---
name: Aiken

shortDescription: |
  A modern smart contract platform for Cardano

summary: |
  Aiken is a modern and accessible programming language, specifically
  created to both simplify and enhance the development of smart
  contracts on Cardano. It comes in an easy to learn syntax, designed
  for effortless integration with other tools and languages, plus
  includes various state-of-the-art features that meet the current
  expectations of developers.

maintainers:
  - KtorZ
  - rvcas
  - MicroProofs

links:
  - to: Source code
    href: https://github.com/aiken-lang/aiken

  - to: Project tracking
    href: https://github.com/orgs/aiken-lang/projects/2

  - to: Installation instructions
    href: https://aiken-lang.org/installation-instructions

  - to: Documentation
    href: https://aiken-lang.org

roadmap:
  type: past-present-future
  recently:
    - title: Plutus V3 integration
      description: |
        Introduce new Plutus V3 crypto primitives for blst381-12, as detaild in
        [CIP-0381](https://cips.cardano.org/cip/CIP-0381), new bitwise
        primitives and revised Plutus virtual machine semantic.
      href: https://github.com/aiken-lang/aiken/milestone/9?closed=1

    - title: Property-based testing framework
      description: |
        Supercharge the existing unit testing framework with built-in
        property-based testing capabilities for writing powerful tests executed
        directly on the Plutus virtual machine.
      href: https://github.com/aiken-lang/aiken/discussions/787

    - title: Improved safety and devX on boundaries
      description: |
        Perform additional checks to prevent common mistakes with
        unserialization of data provided to validators. Include also new
        mechanism for deferring deserialization while preserving useful type
        information.
      href: https://github.com/aiken-lang/aiken/milestone/10?closed=1

  currently:
    - title: Functions export
      description: |
        Export any Aiken function as a standalone Untyped Plutus Core (UPLC)
        program to be be evaluated via the virtual machine.
      href: https://github.com/aiken-lang/aiken/milestone/11

    - title: Separate pairs from 2-tuples
      description: |
        Ensure that UPLC pairs have a different syntax and semantic than
        2-tuples. The latter are currently treated as pairs, leading to
        confusion down the line.
      href: https://github.com/aiken-lang/aiken/milestone/12

    - title: Marlowe acceptance
      description: |
        Marlowe is a great example of a non-trivial validator that comes with a
        large test suite agnostic to the implementation language. It is,
        therefore, an ideal test bench to ensure conformance of generated UPLC
        against an agnostic test suite.
      href: https://github.com/aiken-lang/aiken/milestone/13

  next:
    - title: Road to β
      description: |
        Aiken is technically still in Alpha. There are various changes to be
        brought to the compiler which we've enumerated and gathered under a 'Road to Beta'.
      href: https://github.com/aiken-lang/aiken/issues/754

  discussions:
    - title: Constraining generic type arguments
      href: https://github.com/aiken-lang/aiken/discussions/99

    - title: Function specialization
      href: https://github.com/aiken-lang/aiken/discussions/666

    - title: Wrapped redeemers in foreign validators
      href: https://github.com/aiken-lang/aiken/discussions/665

    - title: Constant reference to script hashes
      href: https://github.com/aiken-lang/aiken/discussions/676

    - title: Allow upper case constants
      href: https://github.com/aiken-lang/aiken/discussions/288
---

## Foster growth in the Cardano ecosystem.

In true Open Source fashion, Aiken arose from the dedicated efforts of various individuals. After the original kickoff with the support of TxPipe on the foundational tooling, the Cardano Foundation helped in materialising the ideas behind a smart contract programming language. Both saw the potential of Aiken and how it could foster growth in the Cardano ecosystem. Over the course of its development, Aiken has rapidly grown to become one of the most loved frameworks for building smart-contracts on Cardano with many of the largest dApps migrating to it.

While Aiken-the-language has been mostly stable for a while, its ecosystem of tools keeps evolving and reshaping to ensure the best developer experience possible to its users. This is only truly achievable as a collaborative effort, with more than 40 code contributors and even more contributors providing feedback and ideas constantly. So it is only natural for Aiken to become one of the first projects hosted under PRAGMA as it already embodies the very core principles behind PRAGMA.
