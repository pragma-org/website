---
name: Amaru

shortDescription:  |
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
    href: https://github.com/pragma-org/amaru/

  - to: Project tracking
    href: https://github.com/orgs/pragma-org/projects/1

  - to: Installation instructions
    href: '#'

  - to: Documentation
    href: '#'

roadmap:
  type: phases
  phases:
    - name: Client node
      color: '#99c2ff'
      description: |
        A node capable of **synchronizing** the chain from a (remote) trusted peer,
        and serve the data to client applications through an API query layer.

        Such a node is most useful for decentralised applications building on
        the blockchain. It doesn't however take part in the consensus nor help
        to propagate blocks on the network.

        A full relay node as an entrypoint to the network is still required at
        this point.
      start: Q1 2024
      milestones:
        - when: mid-April
          title: Chain-Synchronization PoC
          description: |
            Perform basic chain-synchronization of the latest Cardano era
            through [Dolos](https://github.com/txpipe/dolos) to demonstrate the
            capabilities of the base Rust primitives.
          link: https://github.com/pragma-org/amaru/milestone/1

        - when: Buidler Fest
          title: Workshop
          description: |
            Organize workshop(s) during the [Buidler
            Fest](https://buidl.2024.cardano.org/) second day to gather
            builders feedback and insights about what they would expect from an
            alternative node.
          link: https://github.com/pragma-org/amaru/milestone/2

        - when: June
          title: (Partial) validator
          description: |
            Apply a subset of the ledger rules to partially validate
            transactions sent through the node in an attempt to provide better
            user feedback, and in the longer run, prepare the ground for a
            relay node.
          link: https://github.com/pragma-org/amaru/milestone/3

      packages:
        - title: Chain synchronization (single relay)
          link: https://github.com/pragma-org/amaru/issues/1
          description: |
            We must ensure that data can be synchronized from another source
            and made accessible to client applications.

            At this point, we assume that all data comes from a single trusted
            relay (i.e. a Haskell node).

        - title: Read-only client APIs
          link: https://github.com/pragma-org/amaru/issues/10
          description: |
            The primary goal of a client node is to be a read-only entrypoint
            for client applications. So it must provide an API for accessing
            the stored data.

            We aim to support the legacy Ouroboros node-to-client
            mini-protocols to ensure interoperability with the existing
            ecosystem as well as the new [utxoRPC](https://utxorpc.org)
            specification.

        - title: Transaction Submission Proxy
          link: https://github.com/pragma-org/amaru/issues/8
          description: |
            A read-only node is useful but relatively limited to observing the
            chain. Having easy ways to alter the blockchain state by accepting
            transaction is thus a necessary feature.

            We intend to let client applications submit through the client
            node, by proxying transactions to its underlying trusted peer,
            while performing extra validation upfront to improve the user
            experience associated with transaction submission.

        - title: Minimal Viable Ledger
          link: https://github.com/pragma-org/amaru/issues/6
          description: |
            In order to provide some useful transaction submission
            capabilities, we must perform some ledger validation upfront. More
            specifically, we are interested in validation that only requires
            protocol parameters but not a full ledger state yet.

            This is because the communication between Amaru and its trusted
            peer happens through node-to-node protocols.

            Submitting an invalid transaction has therefore no visible effects
            and doesn't generate feedback for the submitter.

        - title: Packaging & distribution
          link: https://github.com/pragma-org/amaru/issues/9
          description: |
            A software is meant to be used. Which means that we must ensure
            prompt delivery and make it easy to consume and operate.

            This work packages covers anything from build artifacts to
            monitoring.

        - title: Companion dApp examples
          link: https://github.com/pragma-org/amaru/issues/11
          description: |
            The best way to ensure that we build _the right software_ is by
            using it. With the alternative node, we want to build applications
            that make use of it and witness the product of our making.

            Such example applications also serve a double-purpose of being
            useful documentation pieces.

    - name: Relay node
      color: '#f7b262'
      start: Q3 2024
      description: |
        A node capable of validating (at least partially) blocks seen on the
        network and propagate them by taking part in the p2p gossiping between
        nodes. It can also seemingly follow the chain from multiple peers by
        performing adequate chain selection.

        Such node doesn't yet take part in the consensus and cannot produce
        blocks. It can however fully replace any relay and is, from the
        perspective of any external observer, a Cardano relay node.
      milestones: []
      packages:
        - title: Dynamic peer management
          description: |
            TODO

        - title: Consensus chain selection
          description: |
            TODO

        - title: (partial) Transaction stage-1 validations
          description: |
            TODO

        - title: Transaction stage-2 validations
          description: |
            TODO

        - title: Reward calculations
          description: |
            TODO

        - title: TestNet(s)
          description: |
            TODO

    - name: Full node
      color: '#d8829d'
      start: Q1 2025
      description: |
        A node that can produce blocks and take part to the consensus. It can
        monitor the leader schedule, manage a mempool, forge blocks and follow
        protocol updates (hard-forks).

        A full node is not however capable of validating the historical chain.
        Instead, it always bootstrap from a snapshot constructed from an
        archive node.

      milestones: []

      packages:
        - title: (full) Transaction stage-1 validations
          description: |
            TODO

        - title: Hard-fork combinator
          description: |
            TODO

        - title: Block forging
          description: |
            TODO

        - title: Full block validation & propagation
          description: |
            TODO

    - name: Archive node
      color: '#0d0a0b'
      description: |
        A node that can validate any historical part of the chain, including
        the Byron era of Cardano. Its purpose is to produce ledger and
        blockchain snapshot usable by full nodes.

        At this point, it is unclear whether we want to build this, for the current
        Haskell nodes already fullfil that role and there's at this point no clear
        benefits in building an alternative.

      milestones: []

      packages:
        - title: Historical validations
          description: |
            TODO

        - title: Snapshots aggregation &  creation
          description: |
            TODO
---

Amaru aspires to bring an alternative node to operate the Cardano blockchain in order to further increase the decentralisation of the platform while fostering an even more rich open source ecosystem.

The project is ambitious and spans over many areas such as networking, cryptography or language theory. It is developed from several parts each covering a different aspect of the node and its surrounding ecosystem. One of the core objectives is to achieve a full block-producing Cardano node which can run side-by-side the existing Haskell nodes in a fully interoperable manner.

Besides, Amaru is also geared towards developer experience and aims at providing easy to grasp interfaces using widely spread technologies such as gRPC while maintaining compatibility with the strong ecosystem of middlewares, such as Ogmios or Oura, that constitutes the backbone of Cardano services.
