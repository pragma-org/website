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
    - name: Client node
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
      start: Q1 2024
      milestones:
        - when: April
          title: Workshop at Buidler Fest
          description: |
            Organize workshop(s) during the [Buidler
            Fest](https://buidl.2024.cardano.org/) second day to gather
            builders feedback and insights about what they would expect from an
            alternative node.
          link: 'https://github.com/pragma-org/amaru/milestone/2'
          pattern:
            - '0'
            - '1'
            - '10'
            - '11'
            - '20'
            - '21'
            - '30'
            - '31'
        - when: May
          title: Chain-Synchronization PoC
          description: |
            Perform basic chain-synchronization of the latest Cardano era
            through [Dolos](https://github.com/txpipe/dolos) to demonstrate the
            capabilities of the base Rust primitives.
          link: 'https://github.com/pragma-org/amaru/milestone/1'
          pattern:
            - '0'
            - '1'
            - '10'
            - '11'
            - '12'
            - '13'
            - '18'
            - '19'
            - '20'
            - '21'
            - '30'
            - '31'
        - when: June/July
          title: (Partial) validator
          description: |
            Apply a subset of the ledger rules to partially validate
            transactions sent through the node in an attempt to provide better
            user feedback, and in the longer run, prepare the ground for a
            relay node.
          link: 'https://github.com/pragma-org/amaru/milestone/3'
          pattern:
            - '0'
            - '1'
            - '6'
            - '7'
            - '10'
            - '11'
            - '12'
            - '13'
            - '18'
            - '19'
            - '20'
            - '21'
            - '24'
            - '25'
            - '26'
            - '27'
            - '28'
            - '29'
            - '30'
            - '31'
      packages:
        - title: Chain synchronization (single relay)
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
    - name: Relay node
      color: '#f7b262'
      highlight: true
      description: |
        A node capable of validating (at least partially) blocks seen on the
        network and propagate them by taking part in the p2p gossiping between
        nodes. It can also seemingly follow the chain from multiple peers by
        performing adequate chain selection.

        Such node doesn't yet take part in the consensus and cannot produce
        blocks. It can however fully replace any relay and is, from the
        perspective of any external observer, a Cardano relay node.
      start: Q3 2024
      milestones:
        - when: October
          title: First Steps
          pattern:
            [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              15,
              16,
              23,
              24,
              25,
              26,
              27,
              28,
              29,
              30,
              31,
            ]
          description: |
            A simple pipeline showcasing an Amaru node fetching blocks from the
            network, validating their header (VRF & KES) and forwarding them to
            an in-memory ledger performing UTxO management and phase-2
            validations.
          media: https://customer-3cdz2wvvptqpqk7u.cloudflarestream.com/389ac82ef40edc967760457f1f6868b5/watch

        - when: December
          title: Hybrid Testnet
          description: >
            While a relay node isn't capable of producing blocks on its own, it

            should perfectly blend in a hybrid testnet comprises of classic

            Haskell nodes acting as block producers and Amaru relay nodes.


            If you are a **stake pool operator** on Cardano, we welcome you to
            **reach out**

            and help us launch this into orbit.
          link: 'https://github.com/pragma-org/amaru/milestone/4'
          pattern:
            - '0'
            - '1'
            - '2'
            - '5'
            - '6'
            - '7'
            - '8'
            - '15'
            - '16'
            - '23'
            - '27'
            - '28'
      packages:
        - title: Dynamic peer management
          description: |
            A peer-to-peer and Byzantine fault tolerant decentralised network
            requires some specific peer management. Cardano currently uses a
            hot/warm/cold peer management system where each node maintain
            active connection with peers based on their stake and how they
            perform in their networking activities.
        - title: Consensus chain selection
          description: |
            In a decentralised network where anyone can propose not only
            addition, but past history of the chain, an algorithm for choosing
            which chain to follow is crucial.

            While relatively simple in the PoW world, it has proven a
            significant challenge in PoS systems like Cardano.
        - title: (partial) Transaction stage-1 validations
          description: |
            In order to validate blocks, one must first validate transactions
            (since blocks are mostly made of transactions). There is a variety
            of ledger rules covering all aspects of transactions from fees to
            authorized governance actions.

            At first, since we will initially operate on short-lived testnets,
            we are mostly interested in validating in actions other than
            governance and protocol changes.
        - title: Transaction stage-2 validations
          description: |
            Transaction validation in Cardano is done in two stages. The first
            stage ensures that transactions are structurally valid and can be
            fully executed (e.g. they spend valid inputs and provide the right
            amount of fees).

            If the 1st stage passes, we move on to the second validation stage
            which evaluates any scripts present in the transaction. This
            happens by running Plutus Core programs in the Plutus Virtual
            Machine.
        - title: Reward calculations
          description: |
            The ledger in the node builds and maintains a state of the
            blockchain which is commonly referred to as *the ledger state*. In
            an eUTxO blockchain like Cardano, this includes the current UTxO
            set and protocol parameters.

            It also includes the state of each reward account that are
            passively gathering rewards on every epoch. The tracking of rewards
            is a challenging task, hence why it deserves its own work package.
        - title: TestNet(s)
          description: |
            Let's test things, together. The idea behind the development of
            Amaru is to onboard as many developers and enthusiasts on the
            journey. This is only possible if we allow people to run their own
            node and interact with Amaru directly.

            While still in development, many parts may be considered unstable
            and we wouldn't want to disrupt the activities of the Cardano
            mainnet, or even the PreProd testnet. We will thus favor having
            isolated short-lived testnets at first.
    - name: Full node
      color: '#d8829d'
      description: |
        A node that can produce blocks and take part to the consensus. It can
        monitor the leader schedule, manage a mempool, forge blocks and follow
        protocol updates (hard-forks).

        A full node is not however capable of validating the historical chain.
        Instead, it always bootstrap from a snapshot constructed from an
        archive node.
      start: Q2 2025
      milestones: []
      packages:
        - title: (full) Transaction stage-1 validations
          description: |
            Any ledger rules and validations that we left aside for the Relay
            phase should be implemented, if any.

            This should mostly include protocol updates and hard-fork-related
            elements that were deemed unnecessary for relays and preliminary
            testnets.
        - title: Hard-fork combinator
          description: |
            Cardano's upgrade system is built around the well-known *Hard-Fork
            Combinator*. Behind this fancy term lies a piece of software which
            ensures that multiple protocols (a.k.a eras) can be combined into
            one sequence.

            This is done in such way that prevents elements from previous eras
            do not conflict with new eras. It also allows the switch to happen
            smoothly at runtime and works across the uncertainty that comes
            with a Byzantine fault-tolerant system.
        - title: Block forging
          description: |
            The main purpose of a block-producing node is to produce blocks!
            This is also referred to as *block forging* and includes various
            tasks such as mempool management and validation, as well as
            authentication through signing and VRF proving.
        - title: Full block validation & propagation
          description: |
            At this point in the development, we should be able to fully
            validate block headers and ensure their validity against the leader
            schedule computed at the beginning of each epoch.
    - name: Archive node
      color: '#b2bec3'
      description: >
        A node that can validate any historical part of the chain, including

        the Byron era of Cardano. Its purpose is to produce ledger and

        blockchain snapshot usable by full nodes.


        At this point, it is unclear whether we want to build this, for the
        current

        Haskell nodes already fullfil that role and there's at this point no
        clear

        benefits in building an alternative.
      milestones: []
      packages:
        - title: Historical validations
          description: |
            A working block-producing node only needs to be able to validate
            blocks of the current network era (up to a few blocks in the past).
            Yet, Cardano is live since September 2017 and has already gone
            through many eras.

            While not necessary (because software such as the Haskell node can
            already do so), being able to re-validate the entire chain is an
            interesting task that would bring a nice sense of completion to the
            project.
        - title: Snapshots aggregation & creation
          description: |
            A direct application of historical validation is the ability to
            produce configuration snapshot to bootstrap block producing and
            relay node.

            Snapshots can in the long-run be fully authenticated by
            [Mithril](https://mithril.network/doc/) which provides a robust
            stake-based threshold multi-signature mechanism.
---

## Build a new fully interoperable block-producing Cardano node.

One of the core objectives is to achieve a full block-producing Cardano node which can run side-by-side the existing Haskell nodes in a fully interoperable manner. The project is ambitious and spans over many areas such as networking, cryptography or language theory. It is developed from several parts each covering a different aspect of the node and its surrounding ecosystem.

Besides, Amaru is also **geared towards developer experience** and aims at providing easy to grasp interfaces using widely spread technologies such as gRPC while maintaining compatibility with the strong ecosystem of middlewares, such as Ogmios or Oura, that constitutes the backbone of Cardano services.
