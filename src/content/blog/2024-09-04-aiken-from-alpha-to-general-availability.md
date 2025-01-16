---
title: 'The Evolution of Aiken: From Alpha to General Availability'
image: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/cover.webp
author: KtorZ
publishDate: 2024-09-03T22:00:00.000Z
excerpt: >-
  Aiken has transformed from a promising alpha into a powerful tool for smart
  contract development on Cardano. This leap brings Plutus V3 support,
  conditional modules, logical operator chaining, and innovative features like
  backpassing and soft-casting for improved readability and flexibility. With
  performance optimizations, enhanced tracing, and new tooling, Aiken simplifies
  development while boosting efficiency. Now powering over 63% of Cardano's
  smart contract traffic, Aiken is embraced by leading projects like Minswap and
  Jpg.store. Explore how Aiken is revolutionizing smart contract development and
  fostering innovation in the Cardano ecosystem. Dive into the full article to
  learn more!
---

We're excited to announce a significant evolution in Aiken's development journey—from a promising alpha to a robust, generally available tool. This leap marks Aiken's readiness for broader adoption. It underscores our commitment to delivering a powerful platform for smart contract development on the Cardano blockchain. In this article, we’ll look at the journey since we first announced the Aiken alpha release. While the language essence hasn't changed much, we fine-tuned the compiler and surrounding tooling thanks to the feedback we received from developers. Aiken started as an idea and desire to better the smart contract landscape on Cardano, and the past year has turned it into a great and useful platform.

### What's New in Aiken?

#### Core Language changes

Without further ado, let’s start our exploration with the most significant language and tooling enhancements that we introduced in the last year.

##### Plutus V3

This time, the focus was on governance and introducing new smart contract capabilities around on-chain voting. New useful built-in functions such as support for fast integer to bytes transformation, as well many new primitives to work with BLS-381 elliptic curve paving the way for zero-knowledge logic on Cardano.

Along with those new capabilities, Plutus V3 also changed the way the ledger and smart contract interface with one another. The nature of this change is described in further detail in [CIP-0069](https://github.com/cardano-foundation/CIPs/tree/master/CIP-0069). From Aiken’s perspective, this change has allowed us to simplify and unify the way developers define multi-purpose validators. One of Aiken’s unique selling points has long been its ability to define hybrid validators under a single script. This simplifies a lot the composition of validators by ensuring that minting and spending policies would share the same code, and thus the same hash. Yet, to make this work, we had to work around some of the limitations present in previous versions of Plutus and it required developers a few extra steps when interacting with their contracts.

![][image1]

CIP-0069 allowed us to considerably simplify the developer experience around multi-validators. We took this opportunity to revamp some of the syntax around validators to make the definition and audit of validators more straightforward.

##### Conditional modules

Validators often need to be parameterized. One way to do this is through the use of a datum as prescribed in the eUTxO model. Yet, datums present two major drawbacks. First, they are the responsibility of whoever creates and submits the transaction interacting with a validator. In many cases, it may not be safe to assume that they will provide the right parameters expected of the underlying protocol. Second, datums are only available to _spend_ validators, which is only one of the 6 purposes available on Cardano.

Hence, in many situations, developers prefer embedding those parameters directly within their validator. Aiken has long provided a way to do this by allowing validators to receive parameters. Values for those parameters can then be applied to a compiled validator to instantiate it. This approach has been sufficient to enable developers to build complex parameterized applications. Yet, it was deemed inconvenient in some situations, in particular because parameter application happens _after_ the compilation, in the Untyped Plutus Core realm where Aiken's nice syntax and type system are no longer available.

What we observed was in fact that developers would often know precisely which parameters to apply upfront, but they would simply vary based on the environment they deploy the contract to. Thus, what was needed in most situations wasn’t the ability to apply arbitrary parameters to a validator but only the ability to conditionally include a well-known value based on some configuration. Although the former is strictly more powerful, it requires developers to carefully handle parameter applications which would get rapidly cumbersome as the number of parameters increases.

We tackled the problem from two angles: conditional environment modules and conditional configuration modules. The former takes the form of Aiken modules located under a special folder `env` at the root of the project. And the latter comes as special configuration arguments defined in the `toml` configuration of the project. Environment modules are like normal Aiken modules in the sense that they can use all features of the language and even import other modules. The only difference regards how they are compiled. In fact, only one module from all those available under env will be compiled for the entire project. Users can select which one thanks to a new --env flag on the command-line that is available for the build and check commands.

This allows to conditionally inject modules in a project and since modules can not only export constants but also functions, it may even be used to define slightly different behaviours for different environments. The configuration in the `aiken.toml` file works similarly but is limited to the syntax and types provided by the `toml` language. So they are handy for defining and sharing simple constants without resorting to full-blown modules.

Developers can now use either or both approaches and still reach for validator parameters when they truly have to. Overall, conditional modules greatly simplify the parameterization of smart contracts with an intuitive interface.

##### Logical operator chaining

Long chains of logical operators are quite common when building validators. We noticed so many validators ending in long chains mixing && with || that we felt the need to make them more readable.

In this example, one could derive the final boolean after thinking for a little but it also requires that you carefully consider how precedence affects the expression grouping. Although this specific example may be simple, in practice those True and False literals would actually be expressions of type Bool. Considering that these kinds of boolean checks are a huge cornerstone of validator logic, we've introduced keywords that increase the readability of these so-called logical operator chains to further increase smart contract auditability.

| ![][image2] | ![][image3] |
| :---------: | :---------- |

With these keywords, the grouping becomes immediately obvious at a glance resulting in more readable and maintainable logical operator chains. This shines especially when composing large numbers of logical operators (i.e. four or more) but is less impactful when there are one or two logical operators.

Note that, like their analogous boolean operators, logical operator chains are amongst the few places in Aiken which have a non-strict evaluation. Said differently, when one writes A or B, the expression B is only ever evaluated if A evaluates to False.

##### Backpassing

The lack of proper statements in a functional programming style tends to promote a continuation-passing style as a mechanism to articulate source code. For complex expressions, code inherently ends up heavily nested with many levels of callbacks. Developers have commonly been referring to this problem as the “_callback hell_” or the “_pyramid of Doom_” in the past. In Aiken, this problem was exacerbated with the development of the property-based testing framework and the writing of complex fuzzers – we will come back to these in another article. Inasmuch as code started to become uncomfortable to read, we felt the impulse to provide an elegant solution.

Using novel syntax, we’ve come up with a way to flatten the look of the code to increase readability without introducing too many new concepts. In Haskell, for example, this problem has been addressed with the introduction of the do-notation and monadic binds. While convenient, it is well known that the concept of Monad has driven developers away from functional programming lands and has proven to be a great barrier to entry for newcomers. Instead, Aiken embraces a syntax known as backpassing. The core idea is to provide a syntactic sugar that treats callbacks as assignments, thus removing unnecessary nesting. Let’s look at an example:

![][image4]

It’s only two levels of nesting here, but we can see how it’s already getting out of hand. With backpassing, this can be re-written as such:

![][image5]

Notice the reversed arrow `<-` and how the callback argument is being assigned from the back of the function calls (passed from the back, hence backpassing).

##### Soft-casting

On-chain, every execution step matters. Unlike traditional applications, handling errors isn’t usually on the menu. Instead, smart contract developers tend to adopt a _“fail fast”_ strategy where any unexpected behaviour immediately terminates the contract execution with a failure, indicating to the ledger an invalid execution. This is partly why there’s no concept of exception in Plutus, nor is it possible to manipulate errors as values. An error, when encountered, halts the execution.

Aiken provides various primitives that encourage this behaviour, and its most notable one is the expect keyword, which has primarily two functions:

- It can be used to enforce that an object has a specific shape. Or, in functional programming jargon, it allows for non-exhaustive pattern matching – halting the execution in case of an invalid match.

- It can also perform a structural cast from one type to another. Remember that Aiken is a statically typed language.

A type defines the realm of possible values that a specific object can take, as well as the methods that are accessible to it. Under the hood, values have a runtime representation, and the compiler keeps that illusion alive for the developer. While something is believed to be of a given type, the compiler will enforce that it is treated as such by the developer and raise errors when misused. For example, you could imagine boolean values represented at runtime by an integer `0` or `1`. Yet, in a typed language, the compiler would not allow arithmetic operations mixing boolean values and integers – even if their runtime representation is fundamentally compatible. What should be the result of `True + 42`? Some languages might say `43`, and some might say `”True42”`. Like most other strongly statically typed languages, Aiken would reject this code and requires developers to clarify their intent. Note that there’s not necessarily a good answer to this question, only different choices and flavour.

![][image6]

Yet, indicating to the compiler that we are willing to treat a particular value as a different type can be helpful. With a statically typed language, we must convince the compiler that the transformation (or cast) is valid. This is where the `expect` keyword comes into play. It informs the compiler that we are willing to morph a type into another by looking at their structural runtime representation. If possible, the compiler will allow it and, at runtime, inject a variety of checks to ensure it. If it's not, it halts.

Now, that is useful, but we noted situations where developers wanted the ability to cast without necessarily halting the entire program when not possible, but rather, execute a different chunk of logic. Enters: soft-casting.

![][image7]

Soft-casting, also dubbed `if/is`, is a new syntax which allows to perform structural cast like `expect`, but specifies the behaviour to adopt in case of failure. The syntax piggybacks on the `if/else` and `when/is` syntaxes to provide one intuitive way of casting values while providing a soft failing path..

##### Supercharged constants

Aiken’s constant system has always been quite limited from the start. Constants were limited to integers, byte strings, and text string literals, making them only suitable for hard-coded values, so much so that we saw little use for them in the wild.

![][image8]

Plus, their impact was dwarfed by the so-called zero-arg functions (functions of arity 0, with no arguments), which have been evaluated at compilation time for a while, thus providing a mechanism for defining complex constant values from a runtime perspective.

This didn’t feel right and confused various developers who were not expecting such behaviour. Plus, it made the constant look like a somewhat redundant language artefact rather than a handy feature. At the same time, the behaviour around zero-arg functions would lead to counter-intuitive errors and inherent complexity in the compiler.

![][image9]

So, we reworked constants entirely to allow any pure Aiken expression to be constant and behave similarly to zero-arg functions. Any constant expression is evaluated at compile-time and reduced to its minimal runtime representation. Moreover, constants can now refer to other constants so long as they are defined earlier in the source code. In addition, the compiler will also no longer evaluate functions at compile time. As a side-effect, one can introduce laziness (or non-strict evaluation) on demand thanks to this change.

These two transformations restore a nice balance between the language semantics and the general developer intuition when dealing with constant values or zero-arg functions. In particular, they play nicely with conditional modules we presented earlier, for one can now embed relatively complex constants that are environment-specific without much boilerplate.

##### Type-alias preservation

Aiken’s type system is strong and static but also flexible when needed. In particular, Aiken has been supporting type aliases since day one. Simply put, a type alias is a different name given to a type, yet underneath, the types carry no difference. Aliases are often combined with primitive types as a cheap and convenient way to make type annotations more readable. They mainly serve as documentation but do not provide extra type safety to the developers.

![][image10]

Since a type alias is _in fine_, identical to the aliased type, the first versions of the Aiken compiler would not preserve any information about aliases beyond parsing. This resulted in error messages and warnings that could sometimes be confusing and diminished the added value of type aliases. This was particularly observable when aliasing complex types such as generic functions found around fuzzers and property testing.

Similarly, type aliases would not live long enough to appear anywhere in the final Plutus blueprint artefact. Even if the blueprint is, in principle, not meant to be human-readable, it is routinely used by developers to inspect the application binary interface of their validators and to construct values from their favourite off-chain framework. And losing information associated with type-alias was a bummer.

Since `v1.0.25-alpha`, this is no longer an issue. Information about type aliases is now preserved and carried across the compiler until error messages and even blueprint generation. This tiny change in appearance has dramatically improved the readability of errors and the friendliness of the feedback given to developers.

##### Datatype reification

It should be no secret by now that Aiken is particularly attentive to user feedback and errors returned to the users. Errors are the primary mechanism for communicating problems between programs and users. Similarly, Aiken’s integrated testing framework comes with a handful of automatic assertions, resulting in a helpful message on failure. In fact, any binary operator and a combination thereof is automatically turned into a pleasantly readable assertion by the testing framework:

| ![][image11] | ![][image12] |
| :----------- | :----------- |
| ![][image13] | ![][image14] |

This behaviour is already good and provides useful outputs to developers. Yet, it wasn’t enough and came particularly short after the introduction of the property-based testing framework and the need to show large counterexamples.

One thing that isn’t obvious at this point is how tests in Aiken aren’t emulated in any way; they are actual Untyped Plutus Core (abbrev. UPLC) programs that are executed through the Plutus virtual machine, very much like actual smart contracts on the Cardano blockchain. Their output is collected and nicely formatted, but behind the scenes, it is all real *smart contract bytecode being e*xecuted. Consequently, any type and high-level definitions from Aiken have been erased during compilation. Hence, the values manipulated at this level are raw UPLC values, which are cumbersome and inconvenient to read. It would be much nicer to show nicely formatted Aiken values instead of their UPLC-compiled equivalents.

Fortunately, this is precisely what data-type reification is about in Aiken. It allows the compiler to make a low-level UPLC value corresponding to its Aiken definition so that developers don’t have to do this gymnastic in their heads. So, for example, instead of showing a cryptic serialised UPLC value:

![][image15]

We can reify it back into its Aiken representation as:

![][image16]

A lot more readable, isn't it? This is possible when running tests because the compiler still holds information about how the test program was generated and can thus recover from it. Extracting those very details from an arbitrary script generated in the wild wouldn't be possible because the types information has long been lost at this point. Techniques known as source mapping may help alleviate these limitations, and they are being worked on right now by the Aiken community!

##### Flawless tracing

An on-chain validator, once compiled, is like a black box, and it can be hard to comprehend what’s going wrong when things don’t go as planned. This is why good tracing and, more generally, tools for troubleshooting issues are paramount to developing smart contracts.

With Aiken, we knew that from the start and made tracing a first-class citizen very early in the project. The introduction of the trace-if-false operator `?` has been greatly enjoyed by developers and has proven useful. It makes adding traces easy and lets the compiler strip them out of the final optimised code.

Yet, this was still not enough. As programs become more complex, developers need more than static literal trace values. Inspecting runtime values and composing traces together to generate detailed debug outputs is incredibly useful. While this was possible through the standard library and by writing a few custom function helpers, it was cumbersome and repetitive. It needlessly raised the barrier to entry for new joiners.

To overcome this, we have internalised various tracing aspects and made it easier for developers to compose them. Since `1.1.0`, it is therefore possible to debug any serialisable value in Aiken in a simple trace:

![][image17]

In fact, we went as far as making the `trace` keyword behave like a variadic function. That is, a function that can take a variable number of arguments and adapt its behaviour accordingly:

![][image18]

Notice the use of `:` in the example, which may appear odd at first glance but will soon make sense. Traces in Aiken are, in fact, structured. The first element of the trace is called the trace label, and the rest are the trace arguments. The distinction works hand in hand with the compiler options that allow the user to select between three trace levels: `verbose`, `compact` and `silent`. In silent mode, traces are entirely removed from the final program. This is typically used after rounds and rounds of testing when one has strong confidence about the correctness of the validator. The `verbose` is mainly used for development and will fully preserve the traces. The `compact` is a subtle middle choice that preserves only the label.

The motivation for this stems from the trade-offs between traces' usefulness and their actual runtime cost. Indeed, everything comes at a price, and while inspecting values at runtime is helpful, it is also costly in terms of execution units. For large validators, the cost of tracing, added to the cost of the validator logic itself, may be too high for running in pre-production environments like testnets. So, while `verbose` is useful during development and in contexts where execution costs don't matter. The `compact` proves useful for real execution environments or even production environments should one want to keep some degree of observability on live contracts.

#### Tooling improvements

Alongside changes to the language we just went through, we have also been working on various improvements in the command line and tooling surrounding the language to ensure that Aiken delivers the best possible experience to developers. We’ve already mentioned the rework of the tracing capabilities at the language level, which goes hand-in-hand with new command-line options `--filter-traces` and `--trace-level.` As you can expect, there is much more. So, let’s proceed with the overview.

##### Property-based testing framework

One of the critical innovations that Aiken brings in tooling is its embedded property-based testing framework with integrated shrinking and case labelling. It is quite a mouthful and significant enough piece to which we will eventually dedicate an entire blog post. Its design is heavily inspired by research work and, in particular, the work of _MacIver & Donaldson_ on [MiniThesis](https://drmaciver.github.io/papers/reduction-via-generation-preview.pdf). So stay tuned as we come back for a deep dive into this framework, its design, its benefits and how to use it to bring smart contract testing to another level.

##### New command: export

Aiken now supports exporting regular function definitions, a significant enhancement that promotes code reusability and modularity. This feature has been requested by several developers who wanted to go further with their on-chain testing and validation with their off-chain choice.

##### Interactive parameter application

It is now possible to apply arguments to a parameterized validator in an interactive manner with the “blueprint apply” command. The command line parses and interprets the blueprint generated as a compilation artefact by the build step and prompts the necessary arguments in a friendly manner. This comes at the rescue of developers with complex contract parameterization and is part of the general overhaul we did around the parameterization of validators, such as conditional modules.

![][image19]

##### Watch mode

It isn’t particularly complex to run the `aiken check` command. Still, during the course of a project, one ends up repeatedly calling this command every couple of minutes, if not more. While language server protocols have greatly helped to improve this experience by bringing checks and compilation directly into code editors, it is still quite common for developers to regularly compile or run build commands via the terminal.

So, we’ve introduced a `--watch` flag to the `build`, `check` and `docs` commands, which instructs Aiken to watch for file changes and automatically perform the command as soon as a change is detected. Handy!

##### Enhanced Language Server Protocol (LSP) Support

Like any modern programming language, Aiken embraces the Language Server Protocol (LSP), a compiler-to-text-editor protocol designed by Microsoft to turn any text editor into a full-blown Integrated Development Environment (IDE). LSP is large and featureful. It defines many features that may or may not be supported by the client (the editor) or the server (the compiler). When both communicate, they initially agree on the features they both know and can resolve.

Aiken started small and with the essentials: on-the-fly compilation, go-to definitions and automatic formatting on save. Over time, we added more and more features such as automatic import management, automatic quick fixes for various compiler warnings, and type information on hover.

![][image20]
![][image21]

We are committed to continuing to enhance the development experience by providing more intuitive interactions with the code, and LSP is the perfect tool for it. Hence, we and the Aiken community will keep leveraging LSP to keep the experience of developing with Aiken a bliss.

##### Dependencies pruning

Aiken package management is quite singular for a programming language. First of all, there's no transitive fetching of dependencies in Aiken. Suppose your project depends on a package `"foo"`, itself depending on a package `"bar"`. In that case, you are responsible for explicitly depending on `"foo"` and `"bar"`. It is not solely due to our laziness to implement a proper package manager, but also a calculated choice.

The truth is that we evolve in a singular context: blockchains. The keyword in the blockchain industry is trust. Package management in an open-source landscape heavily relies on trust. Trust in maintainers for maintaining decent packages and trust in them for not trying to install backdoors and other malware on our system. So-called supply chain attacks are relatively common, and widely used packages are common targets for hackers who seek entry points in larger projects with dependencies.

In this context, we find it too risky to implicitly pull dependencies from every other part of the world into people's projects. If you must include a dependency, it should be your explicit desire, and it is your responsibility as a smart contract developer to verify the provenance of these dependencies.

Language ecosystems such as Unison experiment with content-addressing for all language imports. While we find this idea extremely appealing, we have yet to find a way to materialize it for Aiken in a manner that suits the platform. Nor has it been an extremely high priority due to the relatively small size of Aiken projects – primarily constrained by the maximum size of transactions on the Cardano blockchain.

However, these explorations have led to other exciting developments for Aiken projects. We noticed developers tend to treat Aiken projects and their dependencies as a single big project. That view is pretty close to reality and to how the compiler operates behind the scenes.

Yet, depending on a specific package seldom means using every single functionality exposed by that package. Often, one requires a handful of helper functions defined in a package and does not care about other elements exposed by the package. Still, most package managers define dependencies at the package level. Thus, depending on a package, even for just a single function, brings in all the dependencies of that package as transitive dependencies.

Ecosystems like JavaScript have coped with that problem by splitting packages to the extreme, often having packages be a single function. Others, like Rust, let developers conditionally include dependencies via "feature flags", which gives some degree of dependency customization.

With Aiken, we have made that process happen by default: dependencies in Aiken only truly exist at the module level, not packages. While developers still specify packages in their `aiken.toml` project configuration to pull in external dependencies, they mostly behave as namespaces and bundles of modules that become available to the project. From there, we construct a dependency graph between modules, pruning out any module that isn't used by one's project (either explicitly or transitively).

The effect of this module-level pruning means that if a project depends on a package `P1`, which itself depends on `P2`, such that the base project uses no modules from `P1` that require `P2`, then the project doesn't need `P2` as a dependency at all. Indeed, no features from `P2` are needed by the base project.

Therefore, a certain level of thinking is demanded of library authors in terms of module splitting and organization in their projects – which has positive effects on Aiken’s package ecosystem overall.

This alone is a compelling yet often unspoken feature of Aiken. As we like to put it: "it just works". Not only does it work, but it has proven to be an effective strategy for dependency management, striking, for now, the right balance between the complexity of a fully content-addressed ecosystem and the fear of automatic transitive dependencies pulling.

##### Simplifying installation & upgrade

To further streamline the development process, Aiken has introduced a tiny companion command line called `aikup`, which simplifies the installation and management of Aiken projects. With `aikup`, developers can easily install Aiken on their devices and switch between different versions of Aiken should they work on different projects. Like Aiken, it works cross-platforms and is straightforward to use.

On top of that, we extended the installation methods across multiple package managers such as [npm](https://www.npmjs.com/)) and [Homebrew](https://brew.sh/), making it even more accessible to developers. Whether you're using Homebrew, Cargo, npm, Nix, or compile from sources, Aiken's installation has become more straightforward, removing barriers for new users and facilitating streamlined updates for existing ones.

##### Documentation and Usability

Documentation matters. Aiken's commitment to documentation goes well beyond providing great resources and tutorials; it also puts emphasis on giving developers the right tools to produce documentation for their projects.

The first version of Aiken came with a built-in `docs` command that would take care of that and generate beautiful documentation ready to be deployed as static websites. The website's content is extracted from the source code annotated and inferred types, as well as doc comments left by developers along the way. Since the alpha release, we have iterated several times on these documentation exports to ensure we could embed as much information as possible.

Most notably, the documentation now comes with a source linker, which allows us to bridge the hosted documentation with actual sources hosted on a code repository. We've also added support for extended markdown syntax, including support for math equations via [MathJax](https://www.mathjax.org/), as well as admonitions to leave notes, tips or warnings in the documentation for developers.

![][image22]

The sidebar has also been reworked, and we've given developers some level of freedom in how they organize it. Initially, the sidebar would be automatically generated and contain every exported identifier from a module, alphabetically sorted. When modules get larger than a few functions – that is, most of the time – this can become hard to navigate, even with the presence of a search bar.

Developers can now break down functions into sections that make sense from the module's context. On top of that, the modules' navigation has been considerably reworked to be more hierarchical and ensure maximum readability even with many levels of nesting.

#### Hidden improvements

The frustrating part of improving software quality and performance is that it often goes unnoticed. However, a large portion of the efforts that followed the alpha release were allocated mainly to quality assurance and ensuring that Aiken not only provides the best developer experience possible but does it securely and in a way that maintains correctness.

##### Conformance testing

Part of the effort to continuously raise the bar of quality and robustness porting over from Haskell to Rust all the conformance tests of the Plutus Virtual Machine developed by the Plutus Core at Input Output Global, as well as the port to Aiken of non-trivial validators such as the Marlowe runtime interpreter. Being thoroughly tested projects makes them particularly suited to control the compiler's production of code with expected behaviour, building on top of the hard work other teams offer as open-source projects.

##### Regression & acceptance testing

Since the alpha version, the compiler's internal test suite has grown significantly on all fronts. We leverage techniques such as snapshot testing to prevent regressions and conduct surgical property testing in places where it is most needed.

The compiler is tested at many levels, from the parser down to the UPLC generation, looking in depth at the generated bytecode. There are also various benchmarks which serve as Northstar for optimizations.

On top of that, we have key projects written in Aiken, such as the standard library, which gives another layer of validation through their own testing. Overall, every release of the compiler goes through a lot of scrutiny until we reach sufficient stability to call the end of the alpha period.

##### Optimizations

Beyond the access to new features, a side benefit of upgrading Aiken is leveraging the improvements made to smart contract performance. The goal is to allow developers to focus on writing correct code while the compiler makes it performant. Indeed, the on-chain budget for contract execution is extremely limited. So, the compiler does its best to produce optimized UPLC. Hence, we regularly add optimizations or adjust existing ones based on observed behaviour in an effort to produce even more efficient code.

Since the release of alpha, we've introduced up to 20% performance improvements in the memory dimension and up to 50% improvements in CPU units. It is worth noting that some of those improvements are shared victories, as they also come from the brilliant work that the Plutus core team does on the base language of Cardano (a.k.a UPLC) and that we later harness within Aiken.

##### Formalization

There are still noteworthy next steps to tackle for the Aiken project. One is the finalization and formalization of the Aiken Intermediary Representation (AIR), an internal language the Aiken compiler uses before producing the final UPLC. If you've followed along the development of Plutus, this is very similar to the PIR (Plutus Intermediary Representation) language.

In fact, you can think of a compiler as a pipeline of language transformation, going from a high-level language that is most expressive down to the bytecode (or, in the case of Cardano, UPLC) that the machine understands. Writing this machine language by hand is cumbersome and error-prone, but so is going from a very high-level language to machine language directly. So compilers typically do this in steps, and Aiken is no different in that regard.

For each of those steps, there's room for mistakes. So careful testing is paramount. And the closest we get to the machine language, the easiest it becomes to formalize languages and go beyond testing. We can prove properties and theorems. This is where tools like Agda, Coq or Lean come into play.

There is already some work happening on reducing the Aiken IR and formally verifying the production of UPLC from Aiken IR using Lean – a proof assistant tool. Lean makes writing theorems easy and keeps track of the possible paths and values that a program can take. This allows us to rule out edge cases for scenarios that might easily escape one's scrutiny.

#### Community and Ecosystem Growth

The general availability of Aiken also reflects its growing adoption within the Cardano ecosystem. With these new features and tools, developers are better equipped to build robust, secure, and scalable smart contracts. The continued enhancements to Aiken underscore the Cardano Foundation's commitment to fostering a vibrant and innovative development community.

##### KPIs

As of October 2024, we count more than 300 open-source projects on GitHub made with Aiken. Moreover, the Aiken website receives about 1000 visitors weekly – a number that has steadily grown since we launched.

Last June, we celebrated an important milestone of one million transactions interacting with an Aiken smart contract, a bit more than a year after the launch of the alpha version. Two months later, in August, we crossed the bar of two million transactions, demonstrating the significant growth in the adoption of Aiken.

In fact, over July, August and September 2024, Aiken powered 52%, 55% and 63% of the smart contract traffic, respectively, a testament to Aiken's adoption across key players in the ecosystem.

<iframe
  src="https://customer-3cdz2wvvptqpqk7u.cloudflarestream.com/fea39a5f2a2ad8ef64eb822f54258d60/iframe?poster=https%3A%2F%2Fcustomer-3cdz2wvvptqpqk7u.cloudflarestream.com%2Ffea39a5f2a2ad8ef64eb822f54258d60%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
  loading="lazy"
  style="border: none; height: 22.5rem;"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
></iframe>

##### Who's using Aiken?

These metrics clearly show Aiken's adoption over time. But this is also something that we've experienced firsthand, connecting with builders and supporting projects in their integration, watching them drive innovation and performance of the smart contract landscape to new heights.

Feedback has been overwhelmingly positive, and projects have implemented features they never thought possible due to performance or maintainability constraints. The most prominent decentralized applications adopted Aiken as a core part of their growth strategies. Notable mentions include [Jpg Store](https://jpg.store), [Sundae Labs](https://sundae.fi/), [Minswap](https://minswap.org/), [DexHunter](https://www.dexhunter.io/), [Lenfi](https://lenfi.io/) and many more. That's quite the accomplishment within the past year, and we aren't seeing any signs of slowing down.

##### Open source

We aren't ashamed to take our part of responsibility for Aiken's success. We are proud of the journey and happy to have created a tool that is useful not only to us but also to many others. Nonetheless, it is essential to highlight the numerous contributions we received from an ever-growing Aiken community. More than 200 developers contributed to one of the Aiken core repositories, from helping with proofreading content to implementing custom features or improving the existing tooling.

We are tremendously thankful for those contributors and the many voices in Aiken's Discord server that relentlessly provide help and support to the new joiners. We are blessed to have such a community of enthusiasts and benevolent people. Although, we expected no less of the Cardano community.

Besides, [Aiken's Awesome List](https://github.com/aiken-lang/awesome-aiken) materializes a fraction of the output of this community, showcasing libraries, projects, articles and tutorials submitted by Aiken developers all around the ecosystem. From this list, it is already pretty clear that Aiken has grown beyond our expectations and is much larger than we are. As open-source maintainers, there is no better sentiment than seeing our work be helpful to others.

[image1]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image11.png
[image2]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image20.png
[image3]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image21.png
[image4]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image15.png
[image5]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image10.png
[image6]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image4.png
[image7]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image22.png
[image8]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image1.png
[image9]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image8.png
[image10]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image7.png
[image11]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image21.png
[image12]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image18.png
[image13]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image12.png
[image14]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image17.png
[image15]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image13.png
[image16]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image3.png
[image17]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image19.png
[image18]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image9.png
[image19]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image16.png
[image20]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image2.png
[image21]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image5.png
[image22]: /img/blog/2024-09-04-aiken-from-alpha-to-general-availability/image14.png
