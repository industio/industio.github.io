# industio-docs

INDUSTIO 开发者文档站。基于 **Docusaurus 3.10**，四语言：English（默认）、简体中文、日本語、Deutsch。

线上地址：<https://doc.industio.com>

---

## 本地跑起来（3 条命令）

```bash
npm install          # 只需第一次
npm start            # 打开 http://localhost:3000
```

`npm start` 是热更新的：改任何 `.md` 文件，浏览器 1 秒内自动刷新，不用重启。

看其他语言：

```bash
npm run start:zh     # http://localhost:3000/zh-Hans/
npm run start:ja     # http://localhost:3000/ja/
npm run start:de     # http://localhost:3000/de/
```

## 构建生产包 / 本地预览生产效果

```bash
npm run build        # 产物在 build/，四个语言一次全出
npm run serve        # 用生产包起本地服务，http://localhost:3000
```

`npm start` 看到的是开发版（带调试信息），`npm run serve` 才是真正上线后的样子。
**上线前一定用 `npm run serve` 看一遍**，有些问题只在生产构建里出现（比如大小写敏感、
baseUrl 错误、死链）。

## 目录说明

```
docs/                          ← 英文内容（默认语言，URL 不带前缀）
├── intro.md                   ← 首页，slug: /
├── products/                  ← 产品线
│   ├── overview.md            ← /products
│   └── demo-board/            ← 一个产品 = 一个文件夹
│       ├── _category_.json    ← 产品在侧边栏的名字和位置
│       ├── overview.md
│       ├── specifications.md
│       ├── hardware.md
│       ├── software.md
│       └── download.md
├── getting-started/           ← 快速上手
├── software/                  ← BSP / Android / NPU
├── hardware/                  ← 底板设计 / 电源散热
├── downloads/                 ← 下载与工具
├── faq/                       ← 常见问题
└── community/                 ← 社区与支持政策

i18n/
├── zh-Hans/                   ← 简体中文
│   ├── docusaurus-plugin-content-docs/current/   ← 路径与 docs/ 完全镜像
│   └── docusaurus-theme-classic/                 ← 导航栏、页脚文案
├── ja/                        ← 日本語
└── de/                        ← Deutsch

src/css/custom.css             ← 全站配色、字体、表格样式
static/                        ← 直接拷贝到站点根的文件（logo、CNAME、.nojekyll）
docusaurus.config.js           ← 站点级配置（域名、语言列表、导航栏、页脚）
sidebars.js                    ← 侧边栏结构（所有语言共用一份）
.github/workflows/deploy.yml   ← 推送到 main 自动构建并发布
```

## 最常用的一些操作

| 我要 | 怎么做 |
| --- | --- |
| 加一个产品 | `cp -r docs/products/demo-board docs/products/你的产品名`，改 `_category_.json` 的 label |
| 加一个新章节 | 在 `docs/` 下建文件夹 + `overview.md`（`slug: /xxx`），再在 `sidebars.js` 加一个 category |
| 调整页面顺序 | md 前置数据写 `sidebar_position: 1` |
| 改产品在侧边栏的名字 | 改该文件夹的 `_category_.json` 里的 `label` |
| 改导航栏名字 | 改 `docusaurus.config.js` 的 `navbar.items`，再改 `i18n/*/docusaurus-theme-classic/navbar.json` |
| 改主题色 | 改 `src/css/custom.css` 里的 `--ifm-color-primary` |
| 加一种语言 | 见 `一天搭建落地手册.md` 第 3 阶段 |

## 内容写作规范

1. **一页一个任务**。需要两个"另见"框，就该拆页。
2. **数字必须带条件**。"30 fps" 不是参数，"30 fps @ 4K、RAW10、4-lane、25 °C" 是参数。
3. **占位统一写 `TODO`**，不要写"待补充""稍后完善"——`TODO` 可以全局搜索，能出清单。
4. **版本号写进文件名**：`vX.Y_YYYYMMDD`。
5. **路径全小写、连字符分隔**，不要空格、不要中文、不要下划线。

查所有待补内容：

```bash
grep -rn "TODO" docs/ i18n/ | wc -l
grep -rln "TODO" docs/
```

## 部署

推送到 `main` 分支即自动构建部署（`.github/workflows/deploy.yml`）。

首次部署需要去仓库 **Settings → Pages → Build and deployment → Source** 选
**GitHub Actions**（不要选 Deploy from a branch）。

## 许可

文档内容 CC BY 4.0；代码 MIT。
