---
slug: /products
title: Product overview
sidebar_label: Overview
sidebar_position: 1
description: INDUSTIO product lines — system-on-modules, single board computers and industrial edge computers.
---

# Product overview

INDUSTIO ships three product forms. Every product line gets its own folder under
`docs/products/`, and every product gets its own sub-folder with the same five pages.
That consistency is the whole point: once you learn one product, you can read any of them.

| Product line | Form factor | Typical use | Folder |
| --- | --- | --- | --- |
| SOM (system on module) | Core board + carrier board | Custom industrial designs | `products/` |
| SBC (single board computer) | Ready-to-run board | Evaluation, education, prototyping | `products/` |
| Edge computer | Fanless box | On-site deployment | `products/` |

## The five pages every product must have

Copy `products/demo-board/` as your template. Do not invent a sixth page type.

| Page | File | Answers the question |
| --- | --- | --- |
| Overview | `overview.md` | What is it, who is it for, what makes it different |
| Specifications | `specifications.md` | Exact numbers, with conditions |
| Hardware | `hardware.md` | Pinout, dimensions, power, interfaces |
| Software | `software.md` | Which BSP / OS, what works, what does not |
| Downloads | `download.md` | Images, source, schematics, changelog |

## Adding a new product (30 seconds)

```bash
mkdir -p docs/products/my-new-board
cp docs/products/demo-board/*.md docs/products/my-new-board/
```

Then in `my-new-board/_category_.json` set the `label` to the product name, and edit the
five pages. The sidebar picks it up automatically — `sidebars.js` does not need to change.
