---
displayed_sidebar: som_rockchip
title: Downloads
sidebar_label: Downloads
sidebar_position: 5
description: OS images, BSP source, schematics and changelog for DEMO-BOARD.
---

# Downloads

:::tip Always download the latest image
Board failures reported to support are most often caused by an outdated image. Check the
version string in `/etc/industio-release` against this page before anything else.
:::

## OS images

| Image | Version | Date | Size | SHA256 | Download |
| --- | --- | --- | --- | --- | --- |
| Debian desktop | vTODO | YYYY-MM-DD | TODO GB | `TODO` | [.img.xz](#) |
| Debian minimal | vTODO | YYYY-MM-DD | TODO GB | `TODO` | [.img.xz](#) |
| Ubuntu server | vTODO | YYYY-MM-DD | TODO GB | `TODO` | [.img.xz](#) |
| Android | vTODO | YYYY-MM-DD | TODO GB | `TODO` | [.img.zip](#) |

Verify a download before flashing:

```bash
sha256sum industio-demo-board-debian-v1.0_20260115.img.xz
# compare with the SHA256 column above
```

## BSP source

| Component | Branch | Version | Repository |
| --- | --- | --- | --- |
| Kernel | `industio-6.1` | vTODO | `github.com/industio/kernel` |
| U-Boot | `industio-2017.09` | vTODO | `github.com/industio/u-boot` |
| Buildroot | `industio` | vTODO | `github.com/industio/buildroot` |

## Hardware documents

| Document | Version | Date | File |
| --- | --- | --- | --- |
| Datasheet | vTODO | YYYY-MM-DD | [PDF](#) |
| Schematic (module) | vTODO | YYYY-MM-DD | [PDF](#) |
| Schematic (EVB) | vTODO | YYYY-MM-DD | [PDF](#) |
| 2D/3D drawing | vTODO | YYYY-MM-DD | [STEP](#) |
| Pinout table | vTODO | YYYY-MM-DD | [XLSX](#) |

:::note Schematic availability
Module schematics are provided under NDA for volume customers. EVB schematics are public.
:::

## Tools

| Tool | Platform | Purpose |
| --- | --- | --- |
| INDUSTIO Flash Tool | Windows | Flash images over USB |
| `rkdeveloptool` | Linux / macOS | Flash images over USB |
| `balenaEtcher` | Windows / macOS / Linux | Write images to SD card |

## Changelog

### vTODO — YYYY-MM-DD

- Added: TODO
- Fixed: TODO
- Known issue: TODO

### vTODO — YYYY-MM-DD

- Initial public release.
