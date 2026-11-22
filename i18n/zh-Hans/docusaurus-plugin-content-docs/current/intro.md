---
slug: /
title: INDUSTIO 开发者文档
sidebar_label: 首页
sidebar_position: 1
description: INDUSTIO（触觉智能）ARM / RISC-V 核心板、开发板、单板、边缘计算机与端侧 AI 产品的官方文档。包含快速上手、BSP、硬件设计与资料下载。
keywords: [INDUSTIO, 触觉智能, 核心板, 开发板, 单板, 边缘计算机, 端侧AI, Rockchip, Allwinner, RKNN, 嵌入式 Linux]
---

import SearchBar from "@easyops-cn/docusaurus-search-local/dist/client/client/theme/SearchBar";
import ProductCatalog from "@site/src/components/ProductCatalog";

# INDUSTIO 开发者文档

INDUSTIO 全部技术资料的唯一入口：原理图、BSP 源码、镜像下载、硬件设计参考与已知问题。
每个产品固定六件事——学会一个，就能读全部。

<div className="home-search">
  <SearchBar />
</div>

<ProductCatalog />

## 常见问题与下载

<div className="cat__links">
  <a className="cat__link" href="/zh-Hans/faq">
    <strong>常见问题</strong>
    <span>现象对照表与解决办法</span>
  </a>
  <a className="cat__link" href="/zh-Hans/downloads">
    <strong>资料下载</strong>
    <span>镜像、BSP 源码、原理图</span>
  </a>
</div>

:::info 站点正在建设中
标注 **TODO** 的产品都是占位内容。本页的分类、二级分组、产品名、描述与链接
全部来自 `src/data/products.json`——改这个文件，页面就更新，不需要动代码。
占位图在 `static/img/board-*.svg`，用真实产品图同名替换即可生效。
:::
