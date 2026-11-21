---
title: Support policy
sidebar_label: Support policy
sidebar_position: 2
description: What INDUSTIO does and does not commit to, and for how long.
---

# Support policy

This page exists because a vague support promise is worse than a narrow one. Read it before
you design us into a product.

## Lifecycle

| Phase | Duration | What you get |
| --- | --- | --- |
| Active | From launch, TODO years | Full BSP releases, new features, bug fixes |
| Maintenance | + TODO years | Security fixes and critical bugs only |
| EOL (end of life) | After that | Documentation stays online; no fixes |

EOL is announced at least **12 months** in advance, with a last-time-buy window.

## What is covered by free community support

- Reproducible boot failures with a stock image
- Documentation errors
- Questions about documented features

## What requires a support contract

- Custom driver or device tree work
- Carrier board schematic review
- Thermal or EMC debugging of your enclosure
- Long-term maintenance of a kernel version we no longer ship
- Custom image builds and OTA infrastructure

## Response targets

| Severity | Definition | Target first response |
| --- | --- | --- |
| S1 | Board cannot boot with a stock image | 1 business day |
| S2 | Documented feature does not work | 3 business days |
| S3 | Question / enhancement request | 5 business days |

These are first-response targets, not fix deadlines. A fix deadline is agreed per case.

## Out of scope

- Hardware damaged by reverse polarity, overvoltage or modification
- Third-party modules plugged into our boards
- Software we do not ship, running on configurations we do not test
- Compliance certification for your final product (we provide the module-level reports; the
  system-level certification is yours)

## Versioning promise

BSP releases follow `vX.Y_YYYYMMDD`. We maintain the latest two minor releases. Anything
older is frozen — the source stays public, but it receives no patches.

:::tip Pick your BSP version deliberately
Upgrading a shipped product's BSP is a project, not a maintenance task. Choose a version
with remaining Active lifecycle at design time, and budget one upgrade during the product's
life.
:::
