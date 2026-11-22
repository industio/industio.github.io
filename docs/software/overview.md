---
displayed_sidebar: null
slug: /software
title: Software
sidebar_label: Overview
sidebar_position: 1
description: BSP, Linux, Android and NPU toolchains for INDUSTIO boards.
---

# Software

| Topic | Page |
| --- | --- |
| Kernel, U-Boot, device tree, build system | [Linux BSP](/software/linux-bsp) |
| Android build and customisation | [Android](/software/android) |
| NPU model conversion and inference | [NPU & AI](/ai-module/rknn/npu-ai) |

## Versioning

BSP releases are tagged `vX.Y_YYYYMMDD`. The **latest two minor releases** get security and
critical fixes. Everything older is frozen — see [support policy](/support).

## What we commit to

- Every release ships a working image for every product in that product line.
- Every release lists its known issues in the product's [Software](/som/rockchip/rk357x/som-rk3576/software) page.
- Device tree sources are public. Kernel patches are public. Bootloader is public.
- We do not silently drop features between releases. Anything removed is in the changelog.

## What we do not commit to

- Backporting vendor SoC drivers that the silicon vendor has stopped maintaining.
- Supporting a kernel version we have never shipped.
- Custom driver development under a standard support contract — that is a paid project.
