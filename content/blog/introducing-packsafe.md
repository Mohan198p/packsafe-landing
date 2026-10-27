---
title: "Introducing PackSafe: a gatekeeper for your Python supply chain"
description: "Every pip install is a small leap of faith. PackSafe turns that leap into a decision by scoring a package before its code ever runs."
date: "2026-10-27"
author: "PackSafe Team"
tags:
  - announcement
  - supply-chain
  - python
---

A package name is not a security guarantee. It is a string that your package manager will happily resolve, download, and execute — often without asking a single question.

That is the trust gap PackSafe was built to close.

## The last moment before execution

Modern Python projects can pull in hundreds of transitive dependencies. Most are legitimate. Some are abandoned. A few are actively hostile. The install command is the last moment where you can tell the difference before code runs on your machine, in CI, or in production.

Traditional scanners usually tell you about a problem after the lockfile has already been resolved. PackSafe moves the check forward: it evaluates the package first, explains the evidence, and then lets you decide whether the install should continue.

> The goal is not to make every install slow. The goal is to make the risky ones visible.

## What PackSafe actually checks

PackSafe gathers evidence from multiple sources and combines it into a single 0–100 Safety Score. The score is intentionally explainable: every point comes from a category you can inspect.

| Category | Weight | Question it answers |
| --- | --- | --- |
| Security | 40% | Does this package have known vulnerabilities, active exploits, or malicious patterns? |
| Integrity | 25% | Can the artifact be verified, reproduced, and traced back to its source? |
| Supply chain | 20% | Do maintainer, release, and dependency signals look trustworthy? |
| Maintenance | 10% | Is the project actively maintained? |
| Adoption | 5% | Is the package widely used and depended on? |

A high score is not a guarantee of safety. A low score is not a verdict by itself. The value is in the explanation: you can see which signals fired, which evidence was missing, and whether a hard policy gate blocked the install.

## Try the gate

Install PackSafe with `uv`:

```bash
uv tool install packsafe
```

Then route an install through it:

```bash
packsafe install --uv requests
```

PackSafe fetches the package metadata and available evidence, prints the score and its contributing signals, and asks for confirmation when the result warrants it. Critical findings — malware, active exploitation, or a blocked policy gate — stop the install outright.

If you only want the analysis, use:

```bash
packsafe analyze requests
```

## What comes next

The first release focuses on doing one thing well: giving developers a fast, legible verdict before a package is installed. From here we are working on tighter CI integrations, better explanations for dependency-tree risk, and more ways to share evidence across a team.

If you want to follow along, the project is open source. Try it on a package you already trust, then try it on one you have never heard of. The difference in evidence is usually the most interesting part.
