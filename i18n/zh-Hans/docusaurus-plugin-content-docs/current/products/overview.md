---
slug: /products
title: 产品总览
sidebar_label: 总览
sidebar_position: 1
description: INDUSTIO 产品线 —— 核心板（SOM）、单板计算机（SBC）与工业边缘计算整机。
---

# 产品总览

INDUSTIO 提供三种产品形态。每条产品线在 `docs/products/` 下有自己的文件夹，
每个产品下面再建子文件夹，并固定包含同样的五个页面。
这种一致性就是重点：学会一个产品，任何一个产品你都能读。

| 产品线 | 形态 | 典型用途 |
| --- | --- | --- |
| SOM 核心板 | 核心板 + 底板 | 客户自定义工业产品 |
| SBC 单板计算机 | 开箱即用整板 | 评估、教学、打样 |
| 边缘计算整机 | 无风扇整机 | 现场部署 |

## 每个产品必备的五个页面

新做产品时直接复制 `products/demo-board/`，不要自创第六种页面。

| 页面 | 文件 | 回答什么问题 |
| --- | --- | --- |
| 产品概述 | `overview.md` | 是什么、给谁用、差异点在哪 |
| 规格参数 | `specifications.md` | 精确数字，且带测试条件 |
| 硬件 | `hardware.md` | 引脚、尺寸、供电、接口 |
| 软件 | `software.md` | 用哪个 BSP / 系统，什么能用、什么不能用 |
| 资料下载 | `download.md` | 镜像、源码、原理图、变更记录 |

## 新增一个产品（30 秒）

```bash
mkdir -p docs/products/my-new-board
cp docs/products/demo-board/*.md docs/products/my-new-board/
```

然后把 `my-new-board/_category_.json` 里的 `label` 改成产品名，再改五个页面。
侧边栏会自动收进来，`sidebars.js` 不需要动。
