/**
 * 框架生成器：按 src/data/catalog.js 增量维护 docs/ 目录树
 *
 * 用法：node gen-framework.js
 *  - 首次运行把旧 docs/ 备份到 .old-docs/，并从备份迁移已有正文
 *  - 可重复运行：md 文件只在缺失时创建（不会覆盖你写的真实内容），
 *    _category_.json 与 front matter 由 catalog 全量刷新
 */
const fs = require('fs');
const path = require('path');
const { categories } = require('./src/data/catalog');

const ROOT = path.join(__dirname, 'docs');
const OLD = path.join(__dirname, '.old-docs');

if (!fs.existsSync(OLD) && fs.existsSync(ROOT)) {
  fs.cpSync(ROOT, OLD, { recursive: true });
  console.log('backed up docs/ -> .old-docs/');
}
fs.mkdirSync(ROOT, { recursive: true });

// md 只在缺失时写（保护人工内容）；json 始终由 catalog 刷新
const write = (file, content) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (file.endsWith('.md') && fs.existsSync(file)) return;
  fs.writeFileSync(file, content, 'utf8');
};

const categoryJson = (label, position, linkId) => JSON.stringify({
  label,
  position,
  collapsed: true,
  ...(linkId ? { link: { type: 'doc', id: linkId } } : {}),
}, null, 2) + '\n';

const overviewMd = (title, slug, sidebarId, desc) => `---
title: ${title}
sidebar_label: Overview
sidebar_position: 1
slug: ${slug}
displayed_sidebar: ${sidebarId}
description: ${desc}
---

# ${title}

TODO — replace this placeholder with the real ${title} overview.

${
  slug === '/' ? '' : 'Use the left sidebar to browse the documentation in this section.'
}
`;

const childMd = (title, sidebarId, page) => `---
title: ${title}
sidebar_label: ${page[0].toUpperCase() + page.slice(1)}
displayed_sidebar: ${sidebarId}
---

# ${title}

TODO — ${page} documentation for this product.
`;

// 旧链接 → 新链接（迁移内容里的引用）
const linkRewrites = [
  ['/products/demo-board', '/som/rockchip/rk357x/som-rk3576'],
  ['/som/rockchip/som-rk3576', '/som/rockchip/rk357x/som-rk3576'],
  ['/som/rockchip/evb-rk3576', '/som/rockchip/rk357x/evb-rk3576'],
  ['/som/rockchip/som-rk3588', '/som/rockchip/rk3588/som-rk3588'],
  ['/som/allwinner/som-t527', '/som/allwinner/t527/som-t527'],
  ['/som/allwinner/evb-t527', '/som/allwinner/t527/evb-t527'],
  ['/edge-ai/rknn/npu-ai', '/ai-module/rknn/npu-ai'],
  ['/software/npu-ai', '/ai-module/rknn/npu-ai'],
  ['/edge-ai/rknn/ai-module-rknn', '/ai-module/rknn/ai-module-rknn'],
  ['/hardware/thermal-power', '/accessories/cooling/thermal-power'],
  ['/accessories/wireless', '/accessories/wireless-modules'],
  ['/edge-computers/box-pc/box-pc', '/edge-box/mini-box/mini-box'],
  ['/edge-computers/ai-box/ai-box', '/edge-box/ai-box/ai-box'],
  ['/community/where-to-buy', '/support'],
  ['/community/support-policy', '/support'],
  ['/community/forum', '/support/forum'],
  ['/community/blog', '/support/blog'],
  ['(/community)', '(/support)'],
];

// 生成时记录每个 overview.md 应显示的标题
const expectedTitles = {};
const markTitle = (dir, title) => {
  expectedTitles[`${path.relative(ROOT, dir).replace(/\\/g, '/')}/overview.md`] = title;
};

function rewriteLinks(text) {
  let s = text;
  for (const [from, to] of linkRewrites) s = s.split(from).join(to);
  return s;
}

/** 从 .old-docs 迁移旧内容到新目录 */
function migrate(spec, destDir) {
  if (!spec || !fs.existsSync(OLD)) return;
  const src = path.join(OLD, spec);
  if (!fs.existsSync(src)) return;
  const isFile = fs.statSync(src).isFile();
  const files = isFile ? [src] : fs.readdirSync(src).filter((f) => f.endsWith('.md')).map((f) => path.join(src, f));
  fs.mkdirSync(destDir, { recursive: true });
  for (const f of files) {
    const name = isFile ? 'overview.md' : path.basename(f);
    const dest = path.join(destDir, name);
    if (!fs.existsSync(dest)) fs.writeFileSync(dest, rewriteLinks(fs.readFileSync(f, 'utf8')), 'utf8');
  }
}

let catPos = 1;
for (const c of categories) {
  const cDir = path.join(ROOT, c.dir);
  const cId = `${c.dir}/overview`;
  write(path.join(cDir, '_category_.json'), categoryJson(c.label, catPos++, cId));
  write(path.join(cDir, 'overview.md'), overviewMd(c.label, c.href, c.id, `${c.label} documentation.`));
  markTitle(cDir, c.label);

  let gPos = 1;
  for (const g of c.groups) {
    const gDir = path.join(cDir, g.dir);
    const gId = `${c.dir}/${g.dir}/overview`;
    write(path.join(gDir, '_category_.json'), categoryJson(g.label, gPos++, gId));
    write(path.join(gDir, 'overview.md'), overviewMd(g.label, g.href, g.sidebarId, `${g.label} overview.`));
    markTitle(gDir, g.label);

    // 三级分类（series）
    let sPos = 1;
    for (const s of g.series) {
      const sDir = path.join(gDir, s.dir);
      const sId = `${c.dir}/${g.dir}/${s.dir}/overview`;
      write(path.join(sDir, '_category_.json'), categoryJson(s.label, sPos++, sId));
      write(path.join(sDir, 'overview.md'), overviewMd(s.label, s.href, g.sidebarId, `${s.label} series overview.`));
      markTitle(sDir, s.label);
      // 无产品的三级分类，本身就是一个产品，补内部页面
      if (s.pages) {
        for (const p of s.pages.filter((x) => x !== 'overview')) {
          write(path.join(sDir, `${p}.md`), childMd(`${s.label} · ${p}`, g.sidebarId, p));
        }
      }
      // 产品
      let pPos = 1;
      for (const p of s.products) {
        const pDir = path.join(sDir, p.dir);
        const pId = `${c.dir}/${g.dir}/${s.dir}/${p.dir}/overview`;
        write(path.join(pDir, '_category_.json'), categoryJson(p.name, pPos++, pId));
        migrate(p.migrate, pDir);
        const pages = p.pages || ['overview'];
        if (!fs.existsSync(path.join(pDir, 'overview.md'))) {
          write(path.join(pDir, 'overview.md'), overviewMd(p.name, p.href, g.sidebarId, `${p.name} overview.`));
        }
        markTitle(pDir, p.name);
        for (const pg of pages.filter((x) => x !== 'overview')) {
          if (!fs.existsSync(path.join(pDir, `${pg}.md`))) {
            write(path.join(pDir, `${pg}.md`), childMd(`${p.name} · ${pg}`, g.sidebarId, pg));
          }
        }
      }
    }

    // 直接挂在二级分类下的产品（无三级）
    let pPos = 1;
    for (const p of g.products) {
      const pDir = path.join(gDir, p.dir);
      const pId = `${c.dir}/${g.dir}/${p.dir}/overview`;
      write(path.join(pDir, '_category_.json'), categoryJson(p.name, pPos++, pId));
      migrate(p.migrate, pDir);
      if (!fs.existsSync(path.join(pDir, 'overview.md'))) {
        write(path.join(pDir, 'overview.md'), overviewMd(p.name, p.href, g.sidebarId, `${p.name} overview.`));
      }
      markTitle(pDir, p.name);
    }
  }
}

// 保留通用章节（不在上侧导航，也不占左侧栏）
for (const d of ['faq', 'downloads', 'getting-started', 'software', 'hardware']) {
  const src = path.join(OLD, d);
  if (fs.existsSync(src)) fs.cpSync(src, path.join(ROOT, d), { recursive: true });
}

// Support 章节
const supportDir = path.join(ROOT, 'support');
write(path.join(supportDir, '_category_.json'), categoryJson('Support', 20, 'support/overview'));
write(path.join(supportDir, 'overview.md'), `---
title: Technical support
sidebar_label: Support
sidebar_position: 1
slug: /support
displayed_sidebar: support
---

# Technical support / 技术支持

TODO — fill in real contact details and replace the QR placeholders.

## 即时通讯 / Instant messaging

<div className="support-grid">
  <div className="support-card">
    <h3>企业微信 WeCom</h3>
    <div className="support-qr">二维码占位<br />QR code placeholder</div>
    <p>扫码添加技术支持企业微信，工作日 9:00–18:00 响应。</p>
  </div>
  <div className="support-card">
    <h3>QQ 群</h3>
    <div className="support-qr">二维码占位<br />QR code placeholder</div>
    <p>群号：TODO · 交流 BSP 移植、驱动调试与镜像烧录。</p>
  </div>
  <div className="support-card">
    <h3>Telegram</h3>
    <div className="support-qr">二维码占位<br />QR code placeholder</div>
    <p>面向海外客户的英文支持频道：TODO</p>
  </div>
  <div className="support-card">
    <h3>WhatsApp</h3>
    <div className="support-qr">二维码占位<br />QR code placeholder</div>
    <p>海外客户商务与技术支持：TODO</p>
  </div>
</div>

## 邮件 / Email

| 用途 | 邮箱 |
| --- | --- |
| 技术支持 | support@industio.com（TODO 确认） |
| 商务合作 | sales@industio.com（TODO 确认） |

## 其他渠道 / Other channels

- [论坛 / Forum](/support/forum)：问题检索与社区互助
- [博客 / Blog](/support/blog)：产品教程、版本发布说明
- GitHub：源码、Issue 与资料下载（在顶部导航 Support → GitHub）
`);

write(path.join(supportDir, 'forum.md'), `---
title: Forum
sidebar_label: Forum
sidebar_position: 2
slug: /support/forum
displayed_sidebar: support
---

# Forum / 论坛

TODO — 填入论坛地址、板块说明与发帖规范。
`);
write(path.join(supportDir, 'blog.md'), `---
title: Blog
sidebar_label: Blog
sidebar_position: 3
slug: /support/blog
displayed_sidebar: support
---

# Blog / 博客

TODO — 填入博客地址与文章分类。
`);

// 首页
write(path.join(ROOT, 'intro.md'), `---
slug: /
displayed_sidebar: null
title: INDUSTIO Documentation Center
sidebar_label: Home
sidebar_position: 1
description: Official documentation for INDUSTIO SOM, SBC, edge boxes, AI modules and accessories.
keywords: [INDUSTIO, SOM, SBC, edge AI, Rockchip, Allwinner, RKNN]
---

import SearchBar from "@easyops-cn/docusaurus-search-local/dist/client/client/theme/SearchBar";
import ProductCatalog from "@site/src/components/ProductCatalog";

# INDUSTIO Documentation Center

All hardware documentation, BSP sources, images and engineering notes for INDUSTIO products.

<div className="home-search">
  <SearchBar />
</div>

<ProductCatalog />

## FAQ & downloads

<div className="cat__links">
  <a className="cat__link" href="/faq">
    <strong>FAQ</strong>
    <span>Common questions and answers</span>
  </a>
  <a className="cat__link" href="/downloads">
    <strong>Downloads</strong>
    <span>Images, BSP source, schematics</span>
  </a>
</div>

:::info Under construction
Product names marked TODO are placeholders. Categories, tabs, product cards and links
all come from \`src/data/catalog.js\`. Product photos live in \`static/img/board-*.svg\`.
:::
`);

// ---- 全量 front matter 修补：slug 与 displayed_sidebar ----
function fixFrontMatter(file, slug, sidebarId, title) {
  let text = fs.readFileSync(file, 'utf8');
  text = rewriteLinks(text);
  if (!text.startsWith('---\n')) return fs.writeFileSync(file, text, 'utf8');
  const end = text.indexOf('\n---', 4);
  if (end === -1) return fs.writeFileSync(file, text, 'utf8');
  let fm = text.slice(4, end);
  let body = text.slice(end + 4);

  const setKey = (key, value) => {
    const re = new RegExp(`^${key}:.*$`, 'm');
    if (re.test(fm)) fm = fm.replace(re, `${key}: ${value}`);
    else fm = `${key}: ${value}\n${fm}`;
  };
  if (slug) setKey('slug', slug);
  else fm = fm.replace(/^slug:.*\n?/m, '');
  setKey('displayed_sidebar', sidebarId === null ? 'null' : sidebarId);
  if (title) {
    setKey('title', title);
    body = body.replace(/^# .*$/m, `# ${title}`);
  }
  fs.writeFileSync(file, `---\n${fm}\n---${body}`, 'utf8');
}

function walk(dir, cb) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, cb);
    else if (e.name.endsWith('.md')) cb(p);
  }
}

walk(ROOT, (file) => {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const dirRel = rel.replace(/\/[^/]+$/, '');
  const isOverview = path.basename(file) === 'overview.md';
  const slug = rel === 'intro.md' ? '/' : isOverview ? `/${dirRel}` : null;

  // 找到该文件所属的大类 / 二级分类
  let sidebarId = null;
  if (rel !== 'intro.md') {
    const parts = rel.split('/');
    const cat = categories.find((c) => c.dir === parts[0]);
    if (cat) {
      const g = cat.groups.find((x) => x.dir === parts[1]);
      sidebarId = g ? g.sidebarId : cat.id;
    } else if (parts[0] === 'support') {
      sidebarId = 'support';
    }
  }
  fixFrontMatter(file, slug, rel === 'intro.md' ? null : sidebarId, expectedTitles[rel] || null);
});

console.log('generated docs/, total md:', (function count(d) {
  let n = 0;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    n += e.isDirectory() ? count(path.join(d, e.name)) : (e.name.endsWith('.md') ? 1 : 0);
  }
  return n;
})(ROOT));
