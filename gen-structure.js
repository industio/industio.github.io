/**
 * 一次性结构生成器：为新的 docs 目录树批量创建
 *   - _category_.json（侧边栏分类配置）
 *   - overview.md（分类落地页 / 产品占位页）
 * 运行一次即可，之后加内容直接复制现有文件改文字。
 */
const fs = require("fs");
const path = require("path");

const DOCS = path.join(__dirname, "docs");

const cat = (dir, label, position, linkId) => {
  fs.mkdirSync(path.join(DOCS, dir), { recursive: true });
  const cfg = { label, position };
  if (linkId) cfg.link = { type: "doc", id: linkId };
  fs.writeFileSync(
    path.join(DOCS, dir, "_category_.json"),
    JSON.stringify(cfg, null, 2) + "\n"
  );
};

const page = (dir, title, body, file = "overview.md") => {
  fs.mkdirSync(path.join(DOCS, dir), { recursive: true });
  const fm = `---\ntitle: ${title}\nsidebar_label: Overview\nsidebar_position: 1\ndescription: ${title} documentation (placeholder).\n---\n\n`;
  fs.writeFileSync(path.join(DOCS, dir, file), fm + body);
};

const placeholder = (title, examplePath) => `# ${title}

:::caution Placeholder page
This product page is a placeholder. When real content is ready, replace this page and add
the standard five pages next to it — copy them from
[${examplePath}](/${examplePath}):

| Page | File |
| --- | --- |
| Overview | \`overview.md\` |
| Specifications | \`specifications.md\` |
| Hardware | \`hardware.md\` |
| Software | \`software.md\` |
| Downloads | \`download.md\` |
:::

## What it is

TODO — one paragraph, no marketing adjectives: form factor, SoC, memory, target environment.

## Key specs

| Item | Value |
| --- | --- |
| SoC | TODO |
| NPU | TODO |
| Memory | TODO |
| OS support | TODO |
| Operating temperature | TODO |
`;

/* ---------- 一级分类 ---------- */
cat("som", "SOM & development boards", 1, "som/overview");
cat("sbc", "Single board computers", 2, "sbc/overview");
cat("edge-computers", "Edge computers", 3, "edge-computers/overview");
cat("edge-ai", "Edge AI modules", 4, "edge-ai/overview");
cat("accessories", "Accessories", 5, "accessories/overview");
cat("getting-started", "Getting started", 6, "getting-started/overview");
cat("software", "Software (BSP)", 7, "software/overview");
cat("hardware", "Hardware design", 8, "hardware/overview");
cat("downloads", "Downloads", 9, "downloads/overview");
cat("faq", "FAQ", 10, "faq/overview");
cat("community", "Community & support", 11, "community/overview");

/* ---------- 二级分组 ---------- */
cat("som/rockchip", "Rockchip", 1);
cat("som/allwinner", "Allwinner", 2);
cat("sbc/entry-level", "Entry level", 1);
cat("sbc/mid-range", "Mid range", 2);
cat("sbc/high-performance", "High performance", 3);
cat("edge-computers/box-pc", "Industrial box PC", 1);
cat("edge-computers/ai-box", "Edge AI box", 2);
cat("edge-computers/hmi", "Industrial HMI", 3);
cat("edge-ai/rknn", "RKNN", 1);
cat("accessories/displays", "Displays", 1, "accessories/displays/overview");
cat("accessories/cameras", "Cameras", 2, "accessories/cameras/overview");
cat("accessories/wireless", "Wireless modules", 3, "accessories/wireless/overview");
cat("accessories/cooling", "Cooling", 4, "accessories/cooling/thermal-power");
cat("accessories/enclosures", "Enclosures", 5, "accessories/enclosures/overview");

/* ---------- 分类落地页 ---------- */
page(
  "som",
  "SOM & development boards",
  `Core modules and evaluation boards for custom carrier designs, grouped by SoC vendor.

| Vendor | Products |
| --- | --- |
| [Rockchip](/som/rockchip) | SOM RK3576, SOM RK3588, EVB RK3576 |
| [Allwinner](/som/allwinner) | SOM T527, EVB T527 |
`
);
page(
  "sbc",
  "Single board computers",
  `Ready-to-run single board computers, grouped by performance tier.

| Tier | Products |
| --- | --- |
| [Entry level](/sbc/entry-level) | TODO SBC Entry |
| [Mid range](/sbc/mid-range) | TODO SBC Mid |
| [High performance](/sbc/high-performance) | TODO SBC High |
`
);
page(
  "edge-computers",
  "Edge computers",
  `Fanless industrial computers for on-site deployment.

| Type | Products |
| --- | --- |
| [Industrial box PC](/edge-computers/box-pc) | TODO Box PC |
| [Edge AI box](/edge-computers/ai-box) | TODO AI Box |
| [Industrial HMI](/edge-computers/hmi) | TODO HMI Panel |
`
);
page(
  "edge-ai",
  "Edge AI modules",
  `NPU modules for on-device inference, plus the RKNN toolchain documentation.

| Group | Content |
| --- | --- |
| [RKNN](/edge-ai/rknn) | AI module + model conversion guide |
`
);
page(
  "accessories",
  "Accessories",
  `Displays, cameras, wireless modules, cooling and enclosures.

| Group | Content |
| --- | --- |
| [Displays](/accessories/displays) | LVDS / MIPI panels |
| [Cameras](/accessories/cameras) | MIPI camera modules |
| [Wireless modules](/accessories/wireless) | Wi-Fi, Bluetooth, LTE |
| [Cooling](/accessories/cooling) | Heatsinks, thermal design |
| [Enclosures](/accessories/enclosures) | Boxes and mounting |
`
);

/* ---------- 配件分组占位页 ---------- */
const accIntro = (group) => `# ${group}

Placeholder — list the ${group.toLowerCase()} products INDUSTIO offers for INDUSTIO boards.

| Model | Compatible with | Status |
| --- | --- | --- |
| TODO | TODO | TODO |
`;
page("accessories/displays", "Displays", accIntro("Displays"));
page("accessories/cameras", "Cameras", accIntro("Cameras"));
page("accessories/wireless", "Wireless modules", accIntro("Wireless modules"));
page("accessories/enclosures", "Enclosures", accIntro("Enclosures"));

/* ---------- 产品占位页 ---------- */
page("som/rockchip/som-rk3588", "TODO SOM RK3588", placeholder("TODO SOM RK3588", "som/rockchip/som-rk3576"));
page("som/rockchip/evb-rk3576", "TODO EVB RK3576", placeholder("TODO EVB RK3576", "som/rockchip/som-rk3576"));
page("som/allwinner/som-t527", "TODO SOM T527", placeholder("TODO SOM T527", "som/rockchip/som-rk3576"));
page("som/allwinner/evb-t527", "TODO EVB T527", placeholder("TODO EVB T527", "som/rockchip/som-rk3576"));
page("sbc/entry-level/sbc-entry", "TODO SBC Entry", placeholder("TODO SBC Entry", "som/rockchip/som-rk3576"));
page("sbc/mid-range/sbc-mid", "TODO SBC Mid", placeholder("TODO SBC Mid", "som/rockchip/som-rk3576"));
page("sbc/high-performance/sbc-high", "TODO SBC High", placeholder("TODO SBC High", "som/rockchip/som-rk3576"));
page("edge-computers/box-pc/box-pc", "TODO Box PC", placeholder("TODO Box PC", "som/rockchip/som-rk3576"));
page("edge-computers/ai-box/ai-box", "TODO AI Box", placeholder("TODO AI Box", "som/rockchip/som-rk3576"));
page("edge-computers/hmi/hmi-panel", "TODO HMI Panel", placeholder("TODO HMI Panel", "som/rockchip/som-rk3576"));
page("edge-ai/rknn/ai-module-rknn", "TODO AI Module RKNN", placeholder("TODO AI Module RKNN", "som/rockchip/som-rk3576"));

/* ---------- 社区二级页 ---------- */
page(
  "community",
  "How to buy",
  `Where and how to buy INDUSTIO products.

| Channel | Contact |
| --- | --- |
| Official store | TODO |
| Distributors | TODO list by region |
| Volume pricing | sales@industio.com |
`,
  "where-to-buy.md"
);
page(
  "community",
  "Forum",
  `Community forum for questions and project sharing.

:::note Placeholder
Forum URL goes live with the community launch. Until then, use GitHub Issues.
:::
`,
  "forum.md"
);
page(
  "community",
  "Blog",
  `Release notes, engineering deep-dives and announcements.

:::note Placeholder
Blog goes live with the docs site launch. Release notes are currently in each product's
[download page](/som/rockchip/som-rk3576/download).
:::
`,
  "blog.md"
);

console.log("structure generated OK");
