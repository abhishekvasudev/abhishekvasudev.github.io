---
title: iOSDevUK Conference — Talks, Trains, and Takeaways
category: tech
author: Abhishek Vasudev
date: 2024-09-15
cover: /articles/iosdevuk-conference-2024/assets/railway-station.jpeg
excerpt: A recap of iOSDevUK in Aberystwyth, Wales — from Xcode Cloud and Swift macros to my lightning talk on NTTI performance metrics.
tags: [iosdevuk, conference, swift, xcode-cloud, testing, expedia]
---

# iOSDevUK Conference

This September, I attended the **iOSDevUK Conference** — a community-driven event hosting 200+ visitors in the town of **Aberystwyth** on the west coast of Wales. Getting there takes time, but the train trip is lovely. The town has a very friendly, family-like atmosphere.

[figure]
![Aberystwyth town](/articles/iosdevuk-conference-2024/assets/aberystwyth-town.jpeg)
Aberystwyth town
[/figure]

The conference is organized by **Neil Taylor** and **Chris Price** from Aberystwyth University. They provided accommodation at the university dorms — private rooms, nicely renovated — together with the conference ticket.

[figure]
![One of the conference halls](/articles/iosdevuk-conference-2024/assets/conference-hall.jpeg)
One of the conference halls
[/figure]

The conference runs two tracks in parallel, so participants could choose talks based on preference and stay in one hall throughout.

## Summaries of the Best Talks

### Ship Your Apps Faster with Xcode Cloud — Pol Piella

Pol Piella's talk provides a deep dive into leveraging **Xcode Cloud** for efficient app delivery. He introduced CI/CD concepts, highlighting benefits for automation, scalability, and secure codebases. The session explained Xcode Cloud workflows — from setting up environments and triggers to running builds and deploying to TestFlight.

**Key takeaways:**

- CI/CD automates tasks, enforces code styles, and enhances development confidence
- Xcode Cloud is Apple's CI/CD solution, deeply integrated with Xcode and App Store Connect
- Customizable workflows with flexible triggers, actions, and post-actions
- Simple onboarding, scalable across Xcode/macOS versions

### Crafting Better App Icons — Flora Damiano

Flora Damiano explored the art and science of designing app icons that leave lasting impressions — simplicity, scalability, originality, and platform-specific design principles.

**Key takeaways:**

- Icons are the app's visual identity — distinctive and memorable
- Maintain consistency between app functionality and icon design
- Tailor icons to platform guidelines for iOS, macOS, watchOS, tvOS, and visionOS
- Test and iterate continuously for optimal visibility

### Getting the Most from Swift Macros — Daniel Steinberg

Daniel Steinberg delved into the transformative potential of **Swift macros** for streamlining code — reducing boilerplate, improving diagnostics, and simplifying complex tasks.

**Key takeaways:**

- Understand freestanding vs. attached macros for effective use
- Custom macros address specific coding needs with type safety
- Nested macros enable flexible, powerful abstractions
- Macros provide immediate error checking during development

### A/B Test Bloody Everything — Matt Heaney

Matt Heaney explored the critical role of A/B testing in iOS app development — measuring feature effectiveness, avoiding false conclusions, and refining user experiences.

**Key takeaways:**

- A/B test everything to validate feature effectiveness
- Ensure responsible data handling and transparency
- Adhere to Apple's review process for smooth implementation
- Embrace experimentation and learn from failures

### Sequencing Success: Swift Sequences in Depth — Adrian Russell

Adrian Russell provided a comprehensive exploration of Swift sequences — protocols, lazy evaluation, and custom implementations for cleaner data handling.

**Key takeaways:**

- `Sequence` and `Iterator` protocols enable flexible, reusable code
- Lazy evaluation optimizes resource usage and performance
- Custom sequences address unique data structures
- Sequences can be used creatively — even for generating spirographs

### Typestate — the New Design Pattern in Swift 5.9 — Alex Ozun

Alex Ozun introduced the **Typestate** design pattern, leveraging Swift's noncopyable types and consuming functions to enforce strict state transitions at compile time.

**Key takeaways:**

- Typestate encodes object states into types, enforced by the compiler
- Noncopyable types ensure state variables are consumed properly
- Reduces reliance on runtime checks for mission-critical systems
- Swift 5.9 limitations are expected to improve in future releases

### Concurrency-Safe SwiftData — Akimu Hirai

Akimu Hirai shared strategies for using **SwiftData** safely with Swift concurrency — preventing race conditions and ensuring stable outcomes.

**Key takeaways:**

- Improper SwiftData usage with concurrency causes race conditions
- Global actors centralize data access and stabilize results
- Single write operations prevent data overwrites
- Combining SwiftData with SwiftUI requires managing main and global actors

### Kotlin Multiplatform for iOS: Myths vs. Reality — Florian Kistner

Florian Kistner explored **Kotlin Multiplatform** — selective code sharing while maintaining native UI, with adoption by companies like McDonald's and Forbes.

**Key takeaways:**

- KMP allows incremental adoption rather than a complete overhaul
- Shared code fosters better iOS/Android team collaboration
- Native UI is preserved while Kotlin handles business logic
- iOS support is still evolving with ongoing Swift interoperability work

### Zen and the Science of Debugging — Rob Napier

Rob Napier focused on the scientific nature of debugging — analytical approaches, documentation, and minimal reproducible examples.

**Key takeaways:**

- Programming is creative; debugging requires a systematic mindset
- Maintaining a detailed journal accelerates problem-solving
- Analyze actual code behavior over assumptions
- Avoid unnecessary tool and framework distractions

### Containerized macOS Workflows — Chris Chapman

Chris Chapman explored containerized macOS environments powered by tools like **Orka** — faster builds, improved collaboration, and scalable CI/CD pipelines.

**Key takeaways:**

- Containerized macOS significantly reduces build times
- Kubernetes-based orchestration brings cloud-like scalability
- Ephemeral CI pipelines with on-demand macOS environments
- Consistent, reproducible environments across teams

### Zero to Accessible in 30 Minutes — Robin Kanatzar

Robin Kanatzar demonstrated how developers can enhance app accessibility quickly — color contrast, dynamic type, focus management, and touch targets.

**Key takeaways:**

- Minimum contrast ratio of 4.5:1 for readability
- Touch targets should meet 44×44 points minimum
- Group related elements to simplify navigation
- Support both portrait and landscape orientations

### Touch — An Introduction to Interactive Widgets — Abdul Ajetunmobi

Abdul Ajetunmobi explored the evolution of widgets from static displays to interactive elements using app intents and SwiftUI.

**Key takeaways:**

- Widgets evolved from iOS 14 static displays to iOS 17 interactive widgets
- App intents enable actions without launching the app
- Optimize widgets within the 30MB memory limit

### Getting Sentimental — Sentiment Analysis in iOS — Anna Beltrami

Anna Beltrami shared insights into NLP and sentiment analysis — transformers, context challenges, and on-device solutions with Create ML.

**Key takeaways:**

- Sentiment analysis requires accounting for linguistic nuances and sarcasm
- Transformer models enhance contextual understanding
- Create ML enables custom on-device model training for privacy and cost savings

## Key Workshop: Exploring SwiftTesting — Daniel Steinberg

Daniel Steinberg's workshop showcased the simplicity and power of **Swift Testing**, using an RPN calculator example to illustrate macros, parameterized tests, and async testing.

**Key takeaways:**

1. Macros minimize repetitive boilerplate in test cases
2. Parameterized tests execute multiple scenarios dynamically
3. Async testing waits for results before evaluation
4. `expect` vs. `require` — continue on failure vs. halt immediately
5. Parallel test execution in isolated instances
6. Community feedback drives iterative framework improvements

## My Lightning Talk

The conference featured several insightful lightning talks, each distilling complex concepts into five minutes. I had the privilege of presenting on our recent advancements in **performance metrics calculation for NTTI** — a great opportunity to share the innovative work we've been doing in this space.

[youtube:_JupsLqMOFI]

## Some pics from the event

[figure]
![Conference hall interior](/articles/iosdevuk-conference-2024/assets/conference-hall-2.jpeg)
Conference hall interior
[/figure]

[figure]
![All participants gathered for a photo](/articles/iosdevuk-conference-2024/assets/group-photo.jpeg)
All participants gathered for a photo
[/figure]

[figure]
![After-session get-together](/articles/iosdevuk-conference-2024/assets/after-session.jpeg)
After-session get-together
[/figure]