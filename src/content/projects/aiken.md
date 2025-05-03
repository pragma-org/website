---
# Copyright 2024 PRAGMA
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

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
  - Riley
links:
  - to: Source code
    href: 'https://github.com/aiken-lang/aiken'
  - to: Project tracking
    href: 'https://github.com/orgs/aiken-lang/projects/2'
  - to: Documentation
    href: 'https://aiken-lang.org'
  - to: Contributing
    href: 'https://github.com/aiken-lang/aiken/blob/main/CONTRIBUTING.md'
roadmap:
  type: past-present-future
  recently:
    - title: Workspaces
      description: |
        Straightforward support for workspaces via a `members` property in the root `aiken.toml` file. Glob patterns are supported.
      href: 'https://github.com/aiken-lang/aiken/releases/tag/v1.1.16'
    - title: Types as Namespaces
      description: |
        Introduces support for using types as namespaces to access constructors in patterns and value construction. This simplifies the import management; especially for types with many constructors where it can get quite cumbersome having to import each constructor independently.
      href: https://github.com/aiken-lang/aiken/pull/1119
    - title: Benchmarks
      description: |
        A new `bench` command and language keyword. The command is very similar to aiken check, and will collect and run benchmarks found across the codebase. A bench is a new type of test that takes in a Sampler. A Sampler is a scaled Fuzzer which receive a monotically increasing size as parameter. This allows fine-grained control over generated values.
      href: https://aiken-lang.org/language-tour/bench
  currently:
    - title: New LSP quickfixes
      description: |
        A variety of new automatic LSP quickfixes to cover warnings and errors such as "unexpected type holes", "unused private constant" or "unused private function".
      href: https://github.com/aiken-lang/aiken/pull/1162
    - title: Replaying Transaction with Custom Script
      description: |
        Allows users to re-run an existing transaction while overridding specific scripts (to introduce traces, for example) without altering the transaction CBOR. This comes as an extra troubleshooting mechanism when something goes wrong in production.
      href: https://github.com/aiken-lang/aiken/pull/1158
  next:
    - title: Zero-Knowledge support
      description: |
        Make Aiken capable of producing arithmetic circuits for zero-knowledge proving. Various ideas are being explored, mostly relying on the existing tooling around RISC-V and WebAssembly.
  discussions:
    - title: Uses of Case and Constr in Aiken
      href: 'https://github.com/aiken-lang/aiken/discussions/1056'
    - title: Test assertion for cpu and memory budget
      href: 'https://github.com/aiken-lang/aiken/discussions/1130'
    - title: Add support for "deprecation" declarations
      href: 'https://github.com/aiken-lang/aiken/discussions/1131'
    - title: Custom encodings for structs/records
      href: 'https://github.com/aiken-lang/aiken/discussions/1132'
---

## Foster growth in the Cardano ecosystem.

In true Open Source fashion, Aiken arose from the dedicated efforts of various individuals. After the original kickoff with the support of TxPipe on the foundational tooling, the Cardano Foundation helped in materialising the ideas behind a smart contract programming language. Both saw the potential of Aiken and how it could foster growth in the Cardano ecosystem. Over the course of its development, Aiken has rapidly grown to become one of the most loved frameworks for building smart-contracts on Cardano with many of the largest dApps migrating to it.

While Aiken-the-language has been mostly stable for a while, its ecosystem of tools keeps evolving and reshaping to ensure the best developer experience possible to its users. This is only truly achievable as a collaborative effort, with more than 40 code contributors and even more contributors providing feedback and ideas constantly. So it is only natural for Aiken to become one of the first projects hosted under PRAGMA as it already embodies the very core principles behind PRAGMA.
