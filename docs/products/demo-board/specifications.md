---
title: Specifications
sidebar_label: Specifications
sidebar_position: 2
description: Full technical specifications with test conditions.
---

# Specifications

Every number needs a condition. "30 fps" is not a spec; "30 fps at 3840 × 2160, RAW10,
4-lane MIPI, 25 °C" is a spec.

## Core

| Item | Value | Condition / note |
| --- | --- | --- |
| SoC | TODO | |
| Process | TODO nm | |
| CPU | TODO | e.g. 4 × Cortex-A76 + 4 × Cortex-A55 |
| GPU | TODO | |
| NPU | TODO TOPS | INT8, per-model efficiency differs — see [NPU guide](/software/npu-ai) |
| VPU decode | TODO | |
| VPU encode | TODO | |

## Memory & storage

| Item | Value | Condition |
| --- | --- | --- |
| DRAM | TODO GB LPDDR4X | |
| eMMC | TODO GB | |
| SD card | UHS-I | |
| SPI flash | TODO MB | Optional |

## Display & audio

| Interface | Max resolution | Note |
| --- | --- | --- |
| HDMI | TODO | |
| MIPI DSI | TODO | |
| LVDS | TODO | |
| eDP | TODO | |
| Audio out | TODO | |

## Camera

| Interface | Lanes | Max throughput |
| --- | --- | --- |
| MIPI CSI | TODO | |

## Connectivity

| Item | Detail |
| --- | --- |
| Ethernet | TODO × GbE |
| Wi-Fi / BT | TODO module |
| USB | TODO |
| PCIe | TODO |
| CAN | TODO |
| UART / I²C / SPI | TODO |

## Power & environment

| Item | Value |
| --- | --- |
| Input voltage | TODO V DC |
| Typical power | TODO W (idle), TODO W (max) |
| Operating temperature | TODO °C |
| Storage temperature | TODO °C |
| Humidity | TODO %RH, non-condensing |
| Dimensions | TODO × TODO mm |
| MTBF | TODO h |

## Compliance

| Certificate | Status |
| --- | --- |
| CE | TODO |
| FCC | TODO |
| RoHS | TODO |
| REACH | TODO |

:::note
Numbers on this page must match the latest datasheet revision. When the datasheet changes,
change this page in the same commit and note it in the [changelog](/products/demo-board/download#changelog).
:::
