// @ts-check
// `@type` JSDoc 注释可让编辑器自动补全 Docusaurus 配置项
const { navMenus, supportMenu } = require('./src/data/catalog');
/** @type {import('@docusaurus/types').Config} */
const config = {
  /* ---------------- 站点基本信息 ---------------- */
  title: 'INDUSTIO Developer Docs',
  tagline: 'Open-source ARM & RISC-V SOMs, SBCs and industrial edge computers',
  favicon: 'img/favicon.svg',

  /* ---------------- 部署地址（务必与你真实域名一致） ---------------- */
  // url  = 协议 + 域名，结尾不要带斜杠
  // baseUrl = 站点根路径。自定义域名是 "/"；如果部署在 https://xxx.github.io/docs/ 则填 "/docs/"
  url: 'https://doc.industio.com',
  baseUrl: '/',

  // 仓库信息：右上角 "Edit this page" 链接和 docusaurus deploy 会用到
  organizationName: 'industio',
  projectName: 'industio-docs',

  // 关闭末尾斜杠，URL 更干净：/products/demo-board/overview
  trailingSlash: false,

  // 死链策略：上线后强制体检，任何失效链接直接让 CI 构建失败（本地已验证 0 死链）
  onBrokenLinks: 'throw',

  /* ---------------- 多语言核心配置 ---------------- */
  // defaultLocale 的语言内容直接放在 docs/ 下
  // 其余语言放在 i18n/<locale>/docusaurus-plugin-content-docs/current/ 下，路径与 docs/ 完全镜像
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans', 'ja', 'de'],
    localeConfigs: {
      en: { label: 'English', direction: 'ltr', htmlLang: 'en-US' },
      'zh-Hans': { label: '简体中文', direction: 'ltr', htmlLang: 'zh-Hans' },
      ja: { label: '日本語', direction: 'ltr', htmlLang: 'ja-JP' },
      de: { label: 'Deutsch', direction: 'ltr', htmlLang: 'de-DE' },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // 关键：文档接管站点根路径。写 docs/intro.md 就得到 https://doc.industio.com/intro
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/industio/industio-docs/edit/main/',
          breadcrumbs: true,
          showLastUpdateTime: true,
          // 侧边栏可折叠、默认展开一层
          sidebarCollapsible: true,
        },
        // 一天搭骨架阶段先关掉博客，需要时把下面一行改成 blog: { showReadingTime: true }
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      }),
    ],
  ],

  // 本地搜索插件：无需第三方服务、支持中英日德分词、Ctrl+K 快捷键
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import('@easyops-cn/docusaurus-search-local').Options} */
      ({
        // 生成带哈希的索引文件，利于缓存更新
        hashed: true,
        // 与 i18n.locales 对应的搜索语言（zh 即简体中文分词）
        language: ['en', 'zh', 'ja', 'de'],
        // 目标页面上高亮搜索关键词
        highlightSearchTermsOnTargetPage: true,
        // 搜索结果使用真实页面路径
        explicitSearchResultPath: true,
        // 关键：本文档站 docs 接管根路径，必须告诉插件去 '/' 下找文档
        docsRouteBasePath: '/',
        // 搜索结果摘要长度
        searchResultContextMaxLength: 3,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'INDUSTIO',
        logo: {
          alt: 'INDUSTIO logo',
          src: 'img/logo.svg',
        },
        items: [
          // Home 直接回到文档首页
          { to: '/', label: 'Home', position: 'left' },
          // 产品大类：自定义两级下拉（左列二级分类，右列三级分类）
          ...navMenus.map((m) => ({
            type: 'custom-megaMenu',
            position: 'left',
            label: m.label,
            labelZh: m.labelZh,
            to: m.href,
            groups: m.groups,
          })),
          // Support 一级下拉
          {
            type: 'dropdown',
            position: 'left',
            label: supportMenu.label,
            items: supportMenu.items.map((i) => ({
              label: i.label,
              ...(i.external ? { href: i.href } : { to: i.href }),
            })),
          },
          // 语言切换下拉框，自动读取上面 i18n.locales
          { type: 'localeDropdown', position: 'right' },
          {
            href: 'https://github.com/industio',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              { label: 'SOM & dev boards', to: '/som' },
              { label: 'Getting started', to: '/getting-started' },
              { label: 'Downloads', to: '/downloads' },
            ],
          },
          {
            title: 'Support',
            items: [
              { label: 'FAQ', to: '/faq' },
              { label: 'Technical support', to: '/support' },
              { label: 'Forum', to: '/support/forum' },
            ],
          },
          {
            title: 'Company',
            items: [
              { label: 'Main website', href: 'https://www.industio.com' },
              { label: 'GitHub', href: 'https://github.com/industio' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} INDUSTIO. Built with Docusaurus.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
        additionalLanguages: ['bash', 'diff', 'json', 'yaml', 'c', 'cpp', 'python'],
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: false,
        },
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
    }),
};

module.exports = config;
