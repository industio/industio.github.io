---
displayed_sidebar: null
slug: /downloads
title: Downloads
sidebar_label: Overview
sidebar_position: 1
description: OS images, BSP source, schematics and tools for all INDUSTIO products.
---

# Downloads

## Per-product downloads

Images, schematics and changelogs are versioned per product. Pick your board:

| Product | Downloads |
| --- | --- |
| DEMO-BOARD (template) | [DEMO-BOARD downloads](/som/rockchip/rk357x/som-rk3576/download) |

## Global resources

| Resource | Where |
| --- | --- |
| Flash / packaging tools | [Tools](/downloads/tools) |
| Build system (`repo` manifest) | `github.com/industio/manifest` |
| Kernel source | `github.com/industio/kernel` |
| U-Boot source | `github.com/industio/u-boot` |

## Mirror policy

Primary downloads are served from this domain. If a download fails, try again before
reporting it — large files are cached at the edge and a partial first fetch is normal.

:::tip Verify before you flash
Every image ships a SHA256. Compare it. A corrupted download produces the same symptoms as
broken hardware and wastes hours.

```bash
sha256sum <file> && cat <file>.sha256
```
:::
