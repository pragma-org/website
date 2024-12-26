---
name: Amaru
shortDescription: |
  An alternative Rust node client for the Cardano blockchain.
summary: |
  An alternative Rust node client for the Cardano blockchain. Aimed as
  an entrypoint for client applications initially, it aspires to become
  a full block-producing node running side-by-side the Haskell nodes to
  further increase the decentralisation of the platform while fostering
  its rich open source ecosystem.
maintainers:
  - KtorZ
  - Scarmuega
links:
  - to: Source code
    href: 'https://github.com/pragma-org/amaru/'
  - to: Project tracking
    href: 'https://github.com/orgs/pragma-org/projects/1'
  - to: Documentation
    href: null
  - to: Contributing
    href: 'https://github.com/pragma-org/amaru/blob/main/CONTRIBUTING.md'
roadmap:
  type: journey
  phases:
    - name: First implementable build and private testnet
      color: '#99c2ff'
      description: >
        A node capable of **synchronizing** the chain from a (remote) trusted
        peer,

        and serve the data to client applications through an API query layer.


        Such a node is most useful for decentralised applications building on

        the blockchain. It doesn't however take part in the consensus nor help

        to propagate blocks on the network.


        A full relay node as an entrypoint to the network is still required at

        this point.
      start: Q1 2025
      packages:
        - title: 'Testnet : Private testnet setup'
          description: >
            Creating a sandbox environment for testing out the behaviours of
            Amaru
          link: 'https://github.com/pragma-org/amaru/milestone/7'
        - title: 'Mempool: Simple mempool implementation'
          description: >
            Build a basic mempool that adds, remove, gather, drain transactions
            and exposes a new ledger state
          link: 'https://github.com/pragma-org/amaru/milestone/7'
        - title: 'UTxO RPC: Specification sanity check'
          description: >
            Review and update the [UTxO spec](https://github.com/utxorpc/spec)
            based on the targetted features
          link: 'https://github.com/pragma-org/amaru/milestone/7'
        - title: 'Networking: Peer discovery'
          description: >
            Provide a mechanism to establish which peers are participating in
            the network without relying on a static topology.
          link: 'https://github.com/pragma-org/amaru/milestone/7'
    - name: Full validation and UTxO RPC implementation
      color: '#f7b262'
      description: |
        A node capable of validating blocks seen on the
        network and propagate them by taking part in the p2p gossiping between
        nodes. It can also seemingly follow the chain from multiple peers by
        performing adequate chain selection.

        Such node doesn't yet take part in the consensus and cannot produce
        blocks. It can however fully replace any relay and is, from the
        perspective of any external observer, a Cardano relay node.
      start: Q2 2025
      packages:
        - title: 'Ledger: Full validation (everything but governance)'
          description: >
            Ledger rules implementation, full validation of everything but
            governance (blocs are taken as 'valid' from a trusted peer) -private
            testnet; preview
          link: 'https://github.com/pragma-org/amaru/milestone/6'
        - title: 'Consensus: conformance testing'
          description: >
            Build a conformance testing tool and related suite of tests based on
            consensus specification and existing implementation


            Be able to run conformance testing suite against any implementation
            of Ouroboros, including existing ouroboros-consensus and future
            implementation for Amaru
          link: 'https://github.com/pragma-org/amaru/milestone/6'
        - title: UTxO RPC implementation
          description: >
            Build a standalone component that has the expected features
            integrated with Amaru
          link: 'https://github.com/pragma-org/amaru/milestone/6'
        - title: 'Testnet: Involvement of SPOs'
          description: >
            Running operations (stake distrubtion and health of the testnet has
            to be actively monitored)


            Tooling, API, operator interface development


            Maintaining continuous integration and continuous
            delivery/continuous deployment


            Periodic testing (integration/benchmarking)


            Automated testing


            Starting the preparation to make the transition out of this private
            enviornment
          link: 'https://github.com/pragma-org/amaru/milestone/6'
        - title: 'Networking: Inbound & outbound discovery'
          description: >
            Outbound routing: A component that manages the outbound traffic to
            peers using different heuristics with the goal of optimizing overall
            network efficiency.


            Inbound routing: A component that is in charge of monitoring inbound
            connections with the goal of optimizing efficiency and to mitigate
            abuses / attacks.
          link: 'https://github.com/pragma-org/amaru/milestone/6'
    - name: 'Full validation, Governance and Complex mempool modularity'
      color: '#d8829d'
      description: |
        A node that can produce blocks and take part to the consensus. It can
        monitor the leader schedule, manage a mempool, forge blocks and follow
        protocol updates (hard-forks).

        A full node is not however capable of validating the historical chain.
        Instead, it always bootstrap from a snapshot constructed from an
        archive node.
      start: Q3 2025
      milestones: []
      packages:
        - title: 'Ledger: Governance rules implementation'
          description: >
            Tracking governance and rules implementation -private testnet;
            mainnet ready
          link: 'https://github.com/pragma-org/amaru/milestone/8'
        - title: 'Consensus: Chain validation and block production'
          description: >
            Build a version of consensus that can follow the chain and validate
            blocks (include headers and transactions validation)


            Demonstrate conformance of validating node against existing node and
            network


            A version of consensus that can forge blocks with transactions from
            the mempool according to the predefined VRF-based schedule


            Conformance suite validing block production schedule and transaction
            selection logic w\.r.t existing node


            Dependencies: ledger state access and transactions validations,
            networking n2n protocols, mempool
          link: 'https://github.com/pragma-org/amaru/milestone/8'
        - title: 'UTxO RPC: Use case implementation'
          description: |
            Current use case to be demonstrated: Sundae Sync
          link: 'https://github.com/pragma-org/amaru/milestone/8'
        - title: 'Tesnet: Public vs private transition start'
          description: |
            Start to transition from private testnet to public testnet/mainnet
          link: 'https://github.com/pragma-org/amaru/milestone/8'
        - title: 'Mempool: Complex mempool implementation'
          description: >
            "Complex" mempool implementation: Build a more refined version of
            the mempool that handles features differently and optimises the
            overall resources consumption


            Mempool tooling and API: Create a tool able to manage the mempool
            and the modularity


            Node management Remote Procedure Call (RPC): Build a software that
            handles the "operator perspective" on operating the Amaru node
          link: 'https://github.com/pragma-org/amaru/milestone/8'
    - name: Feature Parity and performance improvements
      color: '#b2bec3'
      description: >
        At this point our node should be able to do everything the Haskell node
        does but with less resources usage and with better performance on most
        aspects of execution.
      start: Q4 2025
      milestones: []
      packages:
        - title: 'Ledger: Amaru as the trusted peer'
          description: |
            Start testing by using Amaru as a trusted peer/block producting node
          link: 'https://github.com/pragma-org/amaru/milestone/9'
        - title: 'Consensus: Block production performance'
          description: |
            Run all conformance tests and find optimisations
          link: 'https://github.com/pragma-org/amaru/milestone/9'
        - title: 'Mempool: Operator API and UI'
          description: |
            Adapt the tool able to manage the mempool and the modularity

            Improve the "operator perspective" of operating the Amaru node
          link: 'https://github.com/pragma-org/amaru/milestone/9'
        - title: 'Testnet: tuning down'
          description: >
            Tuning down private environment and migration to preview/preprod and
            mainnet
          link: 'https://github.com/pragma-org/amaru/milestone/9'
---

## Build a new fully interoperable block-producing Cardano node.

One of the core objectives is to achieve a full block-producing Cardano node which can run side-by-side the existing Haskell nodes in a fully interoperable manner. The project is ambitious and spans over many areas such as networking, cryptography or language theory. It is developed from several parts each covering a different aspect of the node and its surrounding ecosystem.

Besides, Amaru is also **geared towards developer experience** and aims at providing easy to grasp interfaces using widely spread technologies such as gRPC while maintaining compatibility with the strong ecosystem of middlewares, such as Ogmios or Oura, that constitutes the backbone of Cardano services.
