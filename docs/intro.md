---
slug: /
title: INDUSTIO Developer Documentation
sidebar_label: Home
sidebar_position: 1
description: Official documentation for INDUSTIO ARM & RISC-V system-on-modules, single board computers and industrial edge computers. Getting started guides, BSP, hardware design references and downloads.
keywords: [INDUSTIO, SOM, SBC, ARM, RISC-V, edge computing, embedded Linux]
---

# INDUSTIO Developer Documentation

Welcome. This site is the single source of truth for everything you need to design in,
bring up and deploy an INDUSTIO board: pinouts, device trees, BSP releases, image
downloads, thermal data and known issues.

:::info This site is under construction
The framework is live. Pages marked **TODO** are placeholders being filled in.
If something is missing, tell us in the [community section](/community).
:::

## Pick your path

| I want to… | Go here |
| --- | --- |
| Choose a board for my product | [Product overview](/products) |
| Power on a board for the first time | [Getting started](/getting-started) |
| Flash an OS image | [Flash an image](/getting-started/flash-image) |
| Build my own carrier board | [Hardware design guide](/hardware/design-guide) |
| Download BSP source, images, schematics | [Downloads](/downloads) |
| Bring up NPU / camera / display | [Software](/software) |
| Something is not working | [FAQ](/faq) |

## Documentation conventions

- **Versioned filenames** — release assets use `vX.Y_YYYYMMDD` (example: `industio-bsp-v1.2_20260115.tar.gz`)
  so two files with the same name never mean different things.
- **One page = one task.** If a page needs two "you should also read" boxes, it should be two pages.
- **Every page ends with a feedback line.** Silence is not confirmation.

## Not sure where to start?

If you have a board in hand, start with [Getting started](/getting-started).
If you are still choosing, start with [Product overview](/products).
If you are an integrator evaluating us for a product, read
[support policy](/community/support-policy) first — it explains what we do and do not
commit to, which matters more than a spec table.
