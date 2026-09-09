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

name: Amaru
shortDescription: |
  An alternative Rust node client for the Cardano blockchain.
summary: |
  An alternative Rust node client for the Cardano blockchain. Aimed as
  an entrypoint for client applications initially, it aspires to become
  a full block-producing node running side-by-side with the Haskell nodes to
  further increase the decentralisation of the platform while fostering
  its rich open source ecosystem.
maintainers:
  - KtorZ
  - Abailly
  - Quantumplation
  - Dam-CZ
links:
  - to: Source code
    href: 'https://github.com/pragma-org/amaru/'
  - to: Project tracking
    href: 'https://amaru.global/roadmap'
  - to: Treasury
    href: 'https://amaru.global/treasury/'
  - to: Documentation
    href: 'https://amaru.global'
  - to: Contributing
    href: 'https://github.com/pragma-org/amaru/blob/main/CONTRIBUTING.md'
fundingMilestones:
  title: Funding and milestone transparency
  summary: |
    Amaru development has been supported through Cardano treasury funding for alternative node implementation work. PRAGMA supports Amaru through project governance, maintainer committee structure, reporting expectations, legal and operational support, and ecosystem coordination.
  status: |
    Current technical work is tracked on the Amaru roadmap and in GitHub milestones. PRAGMA uses quarterly reports and public milestones to follow progress, surface support needs, and keep project governance visible. PRAGMA is not the treasury fund custodian and does not receive earmarked project donations for Amaru.
  links:
    - to: Current roadmap
      href: 'https://amaru.global/roadmap/'
    - to: Treasury overview
      href: 'https://amaru.global/treasury/'
    - to: GitHub milestones
      href: 'https://github.com/pragma-org/amaru/milestones'
demos:
  - title: Multi-peer (new) networking and block propagation
    media: https://customer-3cdz2wvvptqpqk7u.cloudflarestream.com/8fd60f5a12b16c092a586ec54053c2bb/watch
    date: 2026-02-27
    description: |
      This demo showcases block propagation between a set of Amaru and Haskell nodes, with various topologies:

      - cardano-node -> amaru -> amaru
      - cardano-node -> amaru -> cardano-node
      - cardano-node + amaru -> amaru -> cardano-node + amaru

      This demonstrates Amaru acting sometimes as an upstream peer, sometimes
      as a downstream peer while also performing chain selection. We also show
      to which extend the pipeline can be visualised in real-time through the
      tracing system.
  - title: Simulating executions and pre-summit preparation
    media: https://customer-3cdz2wvvptqpqk7u.cloudflarestream.com/556a8761eee58ce4575dbe93b9f7727a/watch
    date: 2025-11-07
    description: |
      In this recording, we go over the simulation and visualisation of the Amaru multi-stage execution pipeline.

      Then, an overview of the latest version of Amaru doctor and the Pi deployment, as well as a sneak peek onto the brand new website at https://amaru.global.

  - title: More ledger rules, distributed traces and conformance testing
    media: https://customer-3cdz2wvvptqpqk7u.cloudflarestream.com/4524e0849eed85b22557fbd5b349cf79/watch
    date: 2025-09-23
    description: |
      The recording from the demo happening live at the end of the 2nd node diversity workshop in Toulouse.

      The demo showcases the latest progress with the chain synchronisation and conformance tests, as well as an update on the consensus simulation and implementation.

  - title: Ledger rules, time travelling & node-to-node conversations.
    media: https://customer-3cdz2wvvptqpqk7u.cloudflarestream.com/2a7c0c55cf017ca87b5de8cc41275245/watch
    date: 2025-06-27
    description: |
      A demo showcasing the latest progress on the ledger rules and the Rust-agnostic testing approach used for conformance. Then, we dive into some preliminary
      visualisation of the simulation engine, with auto-generated sequence diagrams and a terminal user interface that allows exploring execution traces.

      Finally, another look at some of the Amaru metrics, obtained from running a cluster of Amaru nodes talking to one another. This demonstrates how our observability stack
      is particularly well suited for aggregating distributed traces from multiple processes.
  - title: Deterministic simulations, ledger rules&  P2P Networking
    date: 2025-03-28
    media: https://customer-3cdz2wvvptqpqk7u.cloudflarestream.com/2c6eb0d4b68fce9d220446325ea3035a/watch
    description: |
      First, an overview showcasing the latest progress on deterministically simulating the consensus, using pre-generated blockchain trees.

      Then, a tour of the ledger rules and the separation of concerns between block validation and state management and how Amaru tackles this nicely.

      Finally, an update on the ongoing work on the Peer-to-Peer (P2P) networking stack being designed not only for Amaru, but for the wider Rust blockchain ecosystem.

  - title: Stake distribution, multi-chain consensus & simulation testing.
    date: 2025-02-07
    media: https://customer-3cdz2wvvptqpqk7u.cloudflarestream.com/5ad2552d092b3faa260ec4974ce354e0/watch
    description: |
      Three contributions covering:

        1. Progresses on the ledger state tracking and the stake distribution reconstruction now complete up to the first governance proposal refund;
        2. A focus on the consensus with a basic chain selection strategy between two chains coming from two distinct peers;
        3. An introduction to our simulation testing approach inspired from Jepsen's Maelstrőm.
  - title: On-disk Ledger State & Observability
    date: 2024-12-20
    media: https://customer-3cdz2wvvptqpqk7u.cloudflarestream.com/c64b660a4cc01134c8190e18d8625b91/watch
    description: |
      Showcasing Amaru's on-disk ledger storage, solving a long-standing challenge of the Cardano node. The ledger state in this demo is comprised of the entire UTxO, stake pools parameters and registrations, rewards accounts and delegations. It is tracked throughout block application and persisted on-disk efficiently with regular snapshots at each epoch boundary.

      While it doesn't _yet_ calculate rewards at the epoch boundary, the on-disk state now contains all elements necessary to the calculation of rewards. It thus becomes the immediate next step.
  - title: First Steps
    date: 2024-10-20
    media: https://customer-3cdz2wvvptqpqk7u.cloudflarestream.com/389ac82ef40edc967760457f1f6868b5/watch
    description: |
      A simple pipeline showcasing an Amaru node fetching blocks from the
      network, validating their header (VRF & KES) and forwarding them to
      an in-memory ledger performing UTxO management and phase-2
      validations.

roadmap:
  type: journey
  phases:
    - name: 2025 funded foundation
      color: '#99c2ff'
      description: |
        Amaru was successfully funded for ₳1,500,000 in 2025 to establish the
        foundation for a Rust Cardano node. That work moved the project through
        chain synchronization, ledger state tracking, conformance testing,
        simulations, observability, peer-to-peer networking and relay-oriented
        behavior.
      start: 2025 first proposal
      milestones:
        - when: Q1 2025
          title: Stake distribution, consensus and simulation testing
          description: |
            Early 2025 work continued ledger state tracking, stake distribution
            reconstruction, basic chain-selection behavior and simulation
            testing practices for Amaru.
          link: 'https://amaru.global/roadmap/'
          pattern: ['1', '4', '9', '14']
        - when: Q2 2025
          title: Ledger rules and node-to-node conversations
          description: |
            The project advanced ledger-rule implementation, conformance testing
            and node-to-node behavior, with public demos showing the pieces
            coming together.
          link: 'https://amaru.global/roadmap/'
          pattern: ['2', '5', '10', '15']
        - when: Q3 2025
          title: More ledger rules, traces and conformance work
          description: |
            Amaru continued filling out chain synchronization, conformance tests,
            distributed tracing and consensus simulation work during the second
            node diversity workshop period.
          link: 'https://amaru.global/roadmap/'
          pattern: ['3', '6', '11', '16']
        - when: Q4 2025
          title: Simulation pipeline and pre-summit preparation
          description: |
            The end of the 2025 funded phase emphasized the simulation and
            visualization pipeline, Amaru doctor, constrained deployments and
            public preparation for the next funded stage.
          link: 'https://amaru.global/roadmap/'
          pattern: ['0', '7', '12', '17']
      packages:
        - title: Chain sync and ledger state
          description: |
            The first proposal funded the groundwork for synchronizing from the
            chain, tracking ledger state, validating blocks and building the
            ledger-rule coverage needed for an independent implementation.
          link: 'https://github.com/pragma-org/amaru/milestones'
        - title: Simulations and conformance testing
          description: |
            Deterministic simulations, conformance work and test fixtures helped
            compare Amaru behavior against expected Cardano node semantics and
            made progress easier to inspect publicly.
          link: 'https://amaru.global/roadmap/'
        - title: Observability and demos
          description: |
            Distributed traces, metrics, demo recordings and visual execution
            tooling made the 2025 work visible to maintainers, reviewers and
            the wider ecosystem.
          link: 'https://amaru.global/roadmap/'
        - title: Relay-oriented progress
          description: |
            By the end of the first funded phase, Amaru had demonstrated core
            relay-oriented behavior, including mixed Amaru and Haskell-node
            topologies for synchronization, validation and block propagation.
          link: 'https://amaru.global/roadmap/'

    - name: 2026 core development
      color: '#f7b262'
      highlight: true
      description: |
        Amaru was funded for ₳10,142,000 in 2026 to close the gap between a
        relay-capable node and a production-ready alternative implementation.
        The core development track covers relay wrap-up, hard-fork readiness,
        block-production work, security review and mainnet-readiness fixes.
      start: Q1-Q3 2026
      milestones:
        - when: Q1 2026
          title: Relay wrap-up and intra-era hard-fork readiness
          description: |
            The 2026 proposal begins with relay wrap-up, remaining ledger-rule
            stabilization, transaction diffusion, peer management, observability
            polish and readiness for expected protocol and Plutus changes.
          link: 'https://amaru.global/treasury/'
          pattern: ['1', '6', '8', '13']
        - when: Q2 2026
          title: Path to block production
          description: |
            Q2 focuses on the remaining functionality needed to move from relay
            behavior toward block production, including key management, block
            forging, mempool and peer-management work, conformance tests and
            the beginning of external security review.
          link: 'https://amaru.global/treasury/'
          pattern: ['2', '7', '9', '14']
        - when: Q3 2026
          title: Mainnet readiness
          description: |
            Q3 is aimed at production confidence: security-audit completion,
            fixes requested by SPOs, performance tuning, monitoring improvements
            and zero unpatched major vulnerabilities or major defects.
          link: 'https://amaru.global/treasury/'
          pattern: ['3', '4', '10', '15']
        - when: Q3-Q4 2026
          title: Explore new horizons
          description: |
            Later 2026 work can evaluate protocol-level updates and future
            integrations, such as Peras, Phalanx, Leios or StarStream, where
            they fit Amaru's funded scope and technical readiness.
          link: 'https://amaru.global/treasury/'
          pattern: ['0', '5', '11', '16']
      packages:
        - title: Relay wrap-up
          description: |
            Deliver a relay-capable Amaru node that can select and follow the
            chain, diffuse transactions and blocks, validate well-formedness and
            ledger compliance, and operate with manageable peer connectivity.
          link: 'https://amaru.global/treasury/'
        - title: Hard-fork readiness
          description: |
            Follow upcoming protocol upgrades, Plutus virtual-machine changes
            and agreed CIPs, including support for new builtins and uninterrupted
            synchronization through the transition.
          link: 'https://amaru.global/treasury/'
        - title: Path to block production
          description: |
            Implement the remaining node functionality needed for block
            production, including key management, block forging, SPO-facing
            governance tooling, performance optimization and conformance tests.
          link: 'https://amaru.global/treasury/'
        - title: Mainnet readiness
          description: |
            Build confidence for production use through security audit work,
            SPO-requested fixes, monitoring improvements and performance tuning.
          link: 'https://amaru.global/treasury/'

    - name: Operations and use cases
      color: '#d8829d'
      description: |
        The 2026 proposal also funds work that makes Amaru easier to operate,
        test and understand outside the core engineering team. This includes
        constrained hardware, workshops, browser experiments, SPO-facing
        playgrounds, bug bounty work, financial audit, project management and
        communication.
      start: 2026
      packages:
        - title: Constrained hardware deployments
          description: |
            Continue Raspberry Pi and other constrained-hardware work so Amaru's
            resource profile is visible, testable and useful to operators.
          link: 'https://github.com/pragma-org/amaru/pull/58'
        - title: Node diversity workshops
          description: |
            Use public workshops to bring maintainers, SPOs and ecosystem
            engineers into direct review of node-diversity progress and gaps.
          link: 'https://github.com/pragma-org/amaru/milestone/15'
        - title: SPO playground and browser experiments
          description: |
            Explore approachable ways for operators and developers to inspect,
            test and understand Amaru behavior before production use.
          link: 'https://github.com/pragma-org/amaru/milestone/16'
        - title: Bug bounty and financial audit
          description: |
            Add external scrutiny through bug-bounty activity and independent
            financial audit of treasury-funded work.
          link: 'https://github.com/pragma-org/amaru/milestone/17'

    - name: Compliance and integrations
      color: '#b2bec3'
      description: |
        Amaru's second funded proposal recognizes that an alternative node is
        only useful if it behaves correctly on the Cardano network and works
        with surrounding infrastructure. This track covers network behavior
        analysis, Antithesis support, Cardano-level testing and middleware
        integrations.
      start: 2026
      packages:
        - title: Network behavior analysis
          description: |
            Analyze real Cardano network behavior and use the findings to guide
            Amaru's peer-management, diffusion and conformance work.
          link: 'https://github.com/pragma-org/amaru/milestone/18'
        - title: Antithesis and Cardano-level testing
          description: |
            Support simulation, white-hacking and Cardano-level testing so
            failures are found before production deployment.
          link: 'https://github.com/pragma-org/amaru/issues/667'
        - title: Kupo and Dolos
          description: |
            Maintain practical integration paths with surrounding Cardano
            infrastructure that developers and operators already rely on.
          link: 'https://github.com/pragma-org/amaru/milestone/19'
        - title: Mithril
          description: |
            Keep Amaru's synchronization and bootstrap flows aligned with
            Mithril-based snapshots and related operational expectations.
          link: 'https://github.com/pragma-org/amaru/milestone/20'
        - title: Future integration experiments
          description: |
            Explore later-stage integrations such as StarStream and L2-related
            work where they fit the funded scope and technical readiness.
          link: 'https://github.com/pragma-org/amaru/milestones'
---

## Build a new fully interoperable block-producing Cardano node.

One of the core objectives is to achieve a full block-producing Cardano node which can run side-by-side the existing Haskell nodes in a fully interoperable manner. The project is ambitious and spans over many areas such as networking, cryptography or language theory. It is developed from several parts each covering a different aspect of the node and its surrounding ecosystem.

Besides, Amaru is also **geared towards developer experience** and aims at providing easy to grasp interfaces using widely spread technologies such as gRPC while maintaining compatibility with the strong ecosystem of middlewares, such as Ogmios or Oura, that constitutes the backbone of Cardano services.
