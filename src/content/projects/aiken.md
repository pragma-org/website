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
hideReports: true
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
    - title: Aiken v1.1.23
      description: |
        The latest release refreshed UPLC execution support with protocol-aware builtin semantics, Plutus V3 PV11 cost-model parsing, updated cost models and several compiler correctness fixes.
      href: 'https://github.com/aiken-lang/aiken/releases/tag/v1.1.23'
    - title: Aiken v1.1.22
      description: |
        Aiken added blueprint export controls, a `test` alias for `check`, clearer benchmark output and projected maximum-size reporting for benches.
      href: 'https://github.com/aiken-lang/aiken/releases/tag/v1.1.22'
    - title: Compiler and tooling fixes
      description: |
        Recent releases continued improving generated documentation, custom error traces, blueprint encoding, LSP diagnostics and edge-case compiler behavior.
      href: 'https://github.com/aiken-lang/aiken/releases'
  currently:
    - title: Compiler and runtime robustness
      description: |
        Current work is focused on hardening parser, compiler and UPLC behavior, including fixes for constant folding, deeply nested expressions, EOF diagnostics and other edge cases surfaced by real users.
      href: 'https://github.com/aiken-lang/aiken/pulls'
    - title: Blueprint and export improvements
      description: |
        Open work continues around CIP-57 blueprint generation, dependency export behavior and source-map support so compiled contracts are easier to inspect, debug and integrate.
      href: 'https://github.com/aiken-lang/aiken/issues?q=is%3Aissue%20state%3Aopen%20blueprint%20OR%20export%20OR%20source-map'
    - title: Toolchain maintenance
      description: |
        Maintainers and contributors are keeping the Rust, cryptography, Nix and example-project dependency stack current so Aiken remains reliable across supported development environments.
      href: 'https://github.com/aiken-lang/aiken/pulls?q=is%3Apr%20state%3Aopen%20chore%2Fdeps%20OR%20nix'
  next:
    - title: Hard-fork and Plutus readiness
      description: |
        Keep Aiken reliable through upcoming Cardano protocol changes, including new Plutus builtins, script-context changes, compatibility tests, migration notes and release support for developers.
      href: 'https://github.com/aiken-lang/aiken/issues'
  discussions:
    - title: Aiken maintenance and protocol-readiness treasury proposal
      href: 'https://github.com/aiken-lang/aiken/discussions/1429'
---

## Foster growth in the Cardano ecosystem.

In true Open Source fashion, Aiken arose from the dedicated efforts of various individuals. After the original kickoff with the support of TxPipe on the foundational tooling, the Cardano Foundation helped in materialising the ideas behind a smart contract programming language. Both saw the potential of Aiken and how it could foster growth in the Cardano ecosystem. Over the course of its development, Aiken has rapidly grown to become one of the most loved frameworks for building smart-contracts on Cardano with many of the largest dApps migrating to it.

While Aiken-the-language has been mostly stable for a while, its ecosystem of tools keeps evolving and reshaping to ensure the best developer experience possible to its users. This is only truly achievable as a collaborative effort, with more than 40 code contributors and even more contributors providing feedback and ideas constantly. So it is only natural for Aiken to become one of the first projects hosted under PRAGMA as it already embodies the very core principles behind PRAGMA.
