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
  - Abailly
  - Wolf31o2
links:
  - to: Source code
    href: 'https://github.com/pragma-org/amaru/'
  - to: Project tracking
    href: 'https://github.com/orgs/pragma-org/projects/1'
  - to: Documentation
    href: null
  - to: Contributing
    href: 'https://github.com/pragma-org/amaru/blob/main/CONTRIBUTING.md'
demos:
  - title: First Steps
    date: 2024-10-20
    description: |
      A simple pipeline showcasing an Amaru node fetching blocks from the
      network, validating their header (VRF & KES) and forwarding them to
      an in-memory ledger performing UTxO management and phase-2
      validations.
    media: https://customer-3cdz2wvvptqpqk7u.cloudflarestream.com/389ac82ef40edc967760457f1f6868b5/watch
  - title: On-disk Ledger State & Observability
    date: 2024-12-20
    description: |
      Showcasing Amaru's on-disk ledger storage, solving a long-standing challenge of the Cardano node. The ledger state in this demo is comprised of the entire UTxO, stake pools parameters and registrations, rewards accounts and delegations. It is tracked throughout block application and persisted on-disk efficiently with regular snapshots at each epoch boundary.

      While it doesn't _yet_ calculate rewards at the epoch boundary, the on-disk state now contains all elements necessary to the calculation of rewards. It thus becomes the immediate next step.
    media: https://customer-3cdz2wvvptqpqk7u.cloudflarestream.com/c64b660a4cc01134c8190e18d8625b91/watch


roadmap:
  type: journey
  phases:
    - name: Data node
      color: '#99c2ff'
      description: >
        A node capable of **synchronizing** the chain from a (remote) trusted
        peer,

        and serve the data to client applications through an API query layer.


        Such a node is most useful for decentralised applications building on
        the blockchain. It doesn't however take part in the consensus nor help
        to propagate blocks on the network.


        A full relay node as an entrypoint to the network is still required at
        this point. This first phase is fully demonstrated by
        [Dolos](https://github.com/txpipe/dolos#readme): a data-node written
        in Rust and whose core modules will be re-used for the development of
        Amaru.
      start: Q2 2024
      packages:
        - title: Chain synchronization (single peer)
          description: |
            We must ensure that data can be synchronized from another source
            and made accessible to client applications.

            At this point, we assume that all data comes from a single trusted
            relay (i.e. a Haskell node).
          link: 'https://github.com/pragma-org/amaru/issues/1'
        - title: Read-only client APIs
          description: |
            The primary goal of a client node is to be a read-only entrypoint
            for client applications. So it must provide an API for accessing
            the stored data.

            We aim to support the legacy Ouroboros node-to-client
            mini-protocols to ensure interoperability with the existing
            ecosystem as well as the new [utxoRPC](https://utxorpc.org)
            specification.
          link: 'https://github.com/pragma-org/amaru/issues/10'
        - title: Transaction Submission Proxy
          description: |
            A read-only node is useful but relatively limited to observing the
            chain. Having easy ways to alter the blockchain state by accepting
            transaction is thus a necessary feature.

            We intend to let client applications submit through the client
            node, by proxying transactions to its underlying trusted peer,
            while performing extra validation upfront to improve the user
            experience associated with transaction submission.
          link: 'https://github.com/pragma-org/amaru/issues/8'
        - title: Minimal Viable Ledger
          description: |
            In order to provide some useful transaction submission
            capabilities, we must perform some ledger validation upfront. More
            specifically, we are interested in validation that only requires
            protocol parameters but not a full ledger state yet.
          link: 'https://github.com/pragma-org/amaru/issues/6'
        - title: Packaging & distribution
          description: |
            A software is meant to be used. Which means that we must ensure
            prompt delivery and make it easy to consume and operate.

            This work packages covers anything from build artifacts to
            monitoring.
          link: 'https://github.com/pragma-org/amaru/issues/9'
        - title: Companion dApp examples
          description: |
            The best way to ensure that we build *the right software* is by
            using it. With the alternative node, we want to build applications
            that make use of it and witness the product of our making.

            Such example applications also serve a double-purpose of being
            useful documentation pieces.
          link: 'https://github.com/pragma-org/amaru/issues/11'

    - name: Client node
      start: Q3 2024
      color: '#99c2ff'
      description: >
        A node capable of synchronizing the chain from a remote trusted peer
        while maintaining its own state and performing some ledger validations.
        So while it can only follow a single chain (provided by its single
        peer), it is fully autonomous in validating that this chain is conform
        to the protocol.


        It can, in particular, validate a slot-leader schedule and check for
        consensus rewards in full autonomy. Such a node is most useful as a
        step towards a relay. It doesn't however take part in the consensus nor
        help to propagate blocks on the network yet.
      packages:
        - title: 'Adhoc testnet/devnet'
          description: >
            Create a sandbox environment for testing out Amaru's behavior in a controlled setting.
          link: 'https://github.com/pragma-org/amaru/milestone/7'
        - title: 'Simple mempool implementation'
          description: >
            Build a basic mempool that adds, remove, gather, drain transactions
            and exposes a transient ledger view to consumers (e.g. consensus / tx-submission protocol).
          link: 'https://github.com/pragma-org/amaru/milestone/7'
        - title: 'UTxO RPC: Specification sanity check'
          description: >
            Review and update the [UTxO RPC spec](https://github.com/utxorpc/spec)
            based on the targetted features.
          link: 'https://github.com/pragma-org/amaru/milestone/7'
        - title: 'Networking: Peer management'
          description: >
            Provide a mechanism to discover, select and manage network peers without
            relying on a static topology or a trusted intermediary.
          link: 'https://github.com/pragma-org/amaru/milestone/7'
        - title: 'Ledger: on-disk state tracking'
          description: >
            Re-construction of the ledger state from an initial snapshot, with
            tracking block-by-block through an hybrid on-disk / in-memory
            storage solution.
          link: 'https://github.com/pragma-org/amaru/milestone/3'
        - title: 'Ledger: (almost) full validation'
          description: >
            Ledger rules implementation, full validation (phase-1 & phase-2) of
            transactions except governance rule.
          link: 'https://github.com/pragma-org/amaru/milestone/6'
    - name: Relay node
      color: '#f7b262'
      description: |
        A node capable of validating blocks seen on the
        network and propagate them by taking part in the p2p gossiping between
        nodes. It can also seemingly follow the chain from multiple peers by
        performing adequate chain selection.

        Such node doesn't yet take part in the consensus and cannot produce
        blocks. It can however fully replace any relay. From the
        perspective of any external observer, it is a Cardano relay node.
      start: Q2 2025
      packages:
        - title: 'Ledger: Governance rules implementation'
          description: >
            Finalize ledger rules completeness by including remaining parts
            related to governance (votes counting, governance action
            ratification, etc..)
          link: 'https://github.com/pragma-org/amaru/milestone/8'
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
            Demonstrates UTxO RPC features served through Dolos+Amaru to client
            applications by building (or porting) a standalone component successfully
            leveraging this new stack.
          link: 'https://github.com/pragma-org/amaru/milestone/6'
        - title: 'SPOs involvment'
          description: >
            Seek SPOs willing to pioneer Amaru for their running operations
            (observability and monitoring). Refine with them tooling,
            interfaces and methods of deployments/delivery.
          link: 'https://github.com/pragma-org/amaru/milestone/6'
        - title: 'Networking: Inbound & outbound discovery'
          description: >
            - Outbound routing: A component that manages the outbound traffic to
            peers using different heuristics with the goal of optimizing overall
            network efficiency.

            - Inbound routing: A component that is in charge of monitoring inbound
            connections with the goal of optimizing efficiency and to mitigate
            abuses / attacks.
          link: 'https://github.com/pragma-org/amaru/milestone/6'
    - name: 'Block producing node'
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
        - title: 'Consensus: Chain validation and block production'
          description: >
            Build a version of consensus that can follow the chain and validate
            blocks (include headers and transactions validation).


            Demonstrate its conformance against an existing node and network.


            Forge blocks with transactions from the mempool according to the
            predefined VRF-based schedule.


            _**Dependencies**: ledger state access and transactions validations,
            networking n2n protocols, mempool_
          link: 'https://github.com/pragma-org/amaru/milestone/8'
        - title: 'UTxO RPC: Use case implementation'
          description: |
            Integrate _Sundae Sync_ with the UTxO RPC stack.
          link: 'https://github.com/pragma-org/amaru/milestone/8'
        - title: 'Public testnet validation'
          description: |
            Validate Amaru's full implementation through participating and monitoring activity on the existing global testnets (Preview & PreProd).
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

    - name: Soft-forks & performance improvements
      color: '#b2bec3'
      description: >
        At this point our node should be able to do everything the Haskell node
        does but with less resources usage and with better performance on most
        aspects of execution.
      start: Q4 2025
      milestones: []
      packages:
        - title: 'Soft forks'
          description: |
            Explore ways of shipping new features without breaking consensus, a.k.a soft forks.
          link: 'https://github.com/pragma-org/amaru/milestone/9'
        - title: 'Block production/validation performances'
          description: |
            Optimize block production & validations, and perform new analysis
            of protocol parameters from the perspective of Amaru.
          link: 'https://github.com/pragma-org/amaru/milestone/9'
        - title: 'Better operator interface'
          description: |
            Further adapt spans, metrics & other observability signals to SPO's needs and demands.
          link: 'https://github.com/pragma-org/amaru/milestone/9'
---

## Build a new fully interoperable block-producing Cardano node.

One of the core objectives is to achieve a full block-producing Cardano node which can run side-by-side the existing Haskell nodes in a fully interoperable manner. The project is ambitious and spans over many areas such as networking, cryptography or language theory. It is developed from several parts each covering a different aspect of the node and its surrounding ecosystem.

Besides, Amaru is also **geared towards developer experience** and aims at providing easy to grasp interfaces using widely spread technologies such as gRPC while maintaining compatibility with the strong ecosystem of middlewares, such as Ogmios or Oura, that constitutes the backbone of Cardano services.
