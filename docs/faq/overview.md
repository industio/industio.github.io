---
displayed_sidebar: docsSidebar
slug: /faq
title: FAQ
sidebar_label: Overview
sidebar_position: 1
description: Frequently asked questions about INDUSTIO boards, orders, warranty and technical support.
---

# FAQ

## Ordering & logistics

**What is the minimum order quantity?**
Samples ship from stock in single units. Volume pricing starts at TODO pcs — talk to sales.

**Do you ship to my country?**
TODO — list supported regions and the distributor network.

**What is the lead time?**
Samples: TODO days. Volume: TODO weeks, confirmed at PO.

## Technical

**Which OS should I start with?**
The Debian image with the desktop environment. It has the most testing behind it. Move to
Buildroot or Yocto when you have a fixed feature set and want to cut boot time.

**Can I run without a heatsink?**
For short bench work, yes. For anything continuous — no. See
[power & thermal](/accessories/cooling/thermal-power).

**Does the NPU support my model?**
Most ONNX-exportable models convert. Unusual operators do not. Test the conversion early;
see [NPU & AI](/edge-ai/rknn/npu-ai).

**Can I get the module schematic?**
EVB schematics are public in [Downloads](/downloads). Module schematics are NDA-gated for
volume customers.

**Is the board CE / FCC certified?**
TODO — see the compliance table on the product [specifications](/som/rockchip/som-rk3576/specifications).

## Warranty & RMA

| Item | Policy |
| --- | --- |
| Warranty period | TODO months from shipment |
| Covers | Manufacturing defects |
| Does not cover | Reverse polarity, overvoltage, liquid damage, physical damage, unauthorised modification |
| RMA process | TODO — where to submit, what to include |

Before opening an RMA, run through the [first boot troubleshooting](/getting-started/first-boot#troubleshooting)
table. Roughly half of returned boards work on arrival, and every return costs both sides
weeks.

## Still unanswered?

Ask in [Community & support](/community). Include: product name, image version from
`/etc/industio-release`, and the full serial log.
