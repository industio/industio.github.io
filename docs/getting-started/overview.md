---
displayed_sidebar: null
slug: /getting-started
title: Getting started
sidebar_label: Overview
sidebar_position: 1
description: From unboxing to a shell prompt in under 30 minutes.
---

# Getting started

The goal of this section: get from a sealed box to a working shell prompt without reading
anything else. Three pages, in order.

| Step | Page | Time |
| --- | --- | --- |
| 1 | [Flash an image](/getting-started/flash-image) | 10 min |
| 2 | [First boot](/getting-started/first-boot) | 10 min |
| 3 | [Network & package updates](/getting-started/first-boot#network) | 5 min |

## What you need

- The board, plus its 12 V / TODO A DC adapter (**not** a phone charger — see below)
- A microSD card, 16 GB or larger, class 10 / A1
- A USB-C or micro-USB data cable (for flashing and for the serial console)
- A computer running Windows 10+, Ubuntu 20.04+ or macOS 12+

:::warning Power supply is the #1 cause of "it won't boot"
UNDERPOWERED (欠压) boards boot-loop, drop USB devices and corrupt SD cards. Use a supply
rated for at least the peak current on the [specifications page](/som/rockchip/rk357x/som-rk3576/specifications),
with a short, thick cable.
:::

## Which board do I have?

Look at the silkscreen on the top of the module. The part number starts with `ID-`.
Match it against [Product overview](/som).

## Stuck?

- Board does not power on → [FAQ](/faq)
- Board powers on, no display → [First boot, troubleshooting](/getting-started/first-boot#troubleshooting)
- Needs a serial console → [First boot, serial console](/getting-started/first-boot#serial-console)
