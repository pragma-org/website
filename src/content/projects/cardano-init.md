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

name: cardano-init
shortDescription: |
  A setup CLI for starting Cardano projects with working tool integrations.
summary: |
  cardano-init helps developers go from zero to a running Cardano protocol in
  one command. It generates a wired project structure across on-chain,
  off-chain, devnet, infrastructure and formal-methods tools, with runnable
  examples, dependency checks and agent-friendly project context.
maintainers:
  - Robertino
goalLayout: centered
links:
  - to: Source code
    href: 'https://github.com/input-output-hk/cardano-init'
  - to: DevX tracker
    href: 'https://input-output-hk.github.io/devx-updates/'
  - to: Ecosystem map
    href: 'https://input-output-hk.github.io/devx-updates/map/table/'
  - to: Documentation
    href: 'https://github.com/input-output-hk/cardano-init/tree/main/docs'
roadmap:
  type: past-present-future
  recently:
    - title: PRAGMA onboarding approved
      description: |
        PRAGMA's Administrative Board approved cardano-init for onboarding in September 2026. The Project Committee can now begin the onboarding process, including Guide assignment, incubation conditions and documented next steps.
      href: 'https://github.com/input-output-hk/cardano-init'
    - title: First releases shipped
      description: |
        The DevX tracker reports that the first cardano-init releases shipped with a CLI-first surface, generated release notes and early external contributions.
      href: 'https://input-output-hk.github.io/devx-updates/'
  currently:
    - title: Setup CLI / TUI workstream
      description: |
        cardano-init is part of the Cardano DevX Initiative's setup CLI/TUI deliverable, focused on making new Cardano project setup faster and easier to run.
      href: 'https://input-output-hk.github.io/devx-updates/'
    - title: Ecosystem integration
      description: |
        The project is designed to work across Cardano tooling roles, including on-chain, off-chain, devnet and infrastructure components. PRAGMA can support this by connecting maintainers, testing real workflows and surfacing documentation or integration gaps.
      href: 'https://github.com/input-output-hk/cardano-init'
  next:
    - title: Incubation support
      description: |
        PRAGMA's next role is to support the onboarding process without taking ownership of the project: clarify expectations, connect the work to maintainers and help make useful feedback visible.
      href: 'https://github.com/pragma-org/PDRs/tree/main/PDR-0003-Prospective-Projects'
---

## Make Cardano project setup easier to start and easier to support.

cardano-init is being onboarded through PRAGMA because it addresses a practical
developer-experience problem: new Cardano projects often need several tools to
work together before a developer can build, test and iterate. A setup tool that
generates a working project structure can reduce early friction and make it
easier for developers to reach the point where they are building real protocol
logic.
