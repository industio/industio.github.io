---
title: Software
sidebar_label: Software
sidebar_position: 4
description: Supported operating systems, BSP versions and a feature support matrix.
---

# Software

The single most common cause of a bad first impression is a **feature that silently does
not work**. So this page leads with a support matrix, not with a feature list.

## Supported operating systems

| OS | Version | Kernel | Status | Image |
| --- | --- | --- | --- | --- |
| Debian | TODO | TODO | Supported | [Downloads](/products/demo-board/download) |
| Ubuntu | TODO | TODO | Supported | [Downloads](/products/demo-board/download) |
| Buildroot | TODO | TODO | Community | TODO |
| Android | TODO | TODO | Supported | TODO |
| Yocto | TODO | TODO | Supported | TODO |

## Feature support matrix

| Feature | Debian | Android | Buildroot | Note |
| --- | --- | --- | --- | --- |
| HDMI out | ✅ | ✅ | ✅ | |
| MIPI DSI | ✅ | ✅ | ⚠️ | TODO: panel-specific |
| MIPI CSI | ✅ | ✅ | ⚠️ | |
| NPU (RKNN) | ✅ | ✅ | ❌ | [Guide](/software/npu-ai) |
| Hardware video decode | ✅ | ✅ | ✅ | |
| Wi-Fi | ✅ | ✅ | ⚠️ | |
| Bluetooth | ✅ | ✅ | ⚠️ | |
| CAN | ✅ | ❌ | ✅ | |
| PCIe | ✅ | ✅ | ✅ | |
| Deep sleep | ⚠️ | ⚠️ | ❌ | TODO |

Legend: ✅ works · ⚠️ partial or needs configuration · ❌ not supported

## BSP layout

```
industio-bsp/
├── kernel/            # Linux kernel, INDUSTIO defconfigs
├── u-boot/            # bootloader
├── buildroot/         # rootfs recipes
├── device/industio/   # device trees, HAL
└── tools/             # flashing and packaging scripts
```

## Build from source

```bash
# 1. Get the source
repo init -u https://github.com/industio/manifest.git -b TODO
repo sync -j8

# 2. Select the board
./build.sh lunch        # pick the DEMO-BOARD target

# 3. Build the full image
./build.sh all
```

Output image: `output/demo-board/images/`

## Known issues

| Issue | Affects | Workaround | Fixed in |
| --- | --- | --- | --- |
| TODO | TODO | TODO | TODO |

Report a new issue in the [community section](/community).

## Versioning policy

BSP releases are tagged `vX.Y_YYYYMMDD`. We support the **latest two minor releases** with
security and critical bug fixes. Older releases receive no updates — see
[support policy](/community/support-policy).
