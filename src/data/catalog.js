/**
 * INDUSTIO 文档站分类树 —— 全站唯一数据源
 *
 * 这个文件同时驱动：
 *  1. docs/ 目录树与页面（gen-framework.js）
 *  2. 左侧多侧边栏（sidebars.js）
 *  3. 顶部两级下拉菜单（docusaurus.config.js）
 *  4. 首页产品阵列（src/components/ProductCatalog）
 *
 * 层级：大类 category → 二级 group → 三级 series（可选） → 产品 product
 * 没有三级的分类，产品直接挂在二级下。
 * 所有 href 由目录名自动推导，不要手写。
 */

const raw = [
  {
    id: 'som',
    dir: 'som',
    label: 'SOM',
    labelZh: '核心板 & 开发板',
    desc: 'System-on-modules and evaluation boards by SoC vendor.',
    descZh: '按芯片厂商划分的核心板与配套评估板。',
    groups: [
      {
        id: 'rockchip',
        dir: 'rockchip',
        label: 'Rockchip',
        labelZh: 'Rockchip 瑞芯微',
        series: [
          {
            id: 'rk357x', dir: 'rk357x', label: 'RK357X', labelZh: 'RK357X 系列',
            products: [
              { dir: 'som-rk3576', name: 'SOM RK3576', nameZh: 'SOM RK3576', desc: 'Flagship module · 6 TOPS NPU', descZh: '旗舰核心板 · 6 TOPS NPU', img: '/img/board-blue.svg', pages: ['overview', 'specifications', 'hardware', 'software', 'download'], migrate: 'som/rockchip/som-rk3576' },
              { dir: 'evb-rk3576', name: 'EVB RK3576', nameZh: 'EVB RK3576', desc: 'Evaluation board · carrier reference', descZh: '评估底板 · 参考设计', img: '/img/board-amber.svg', migrate: 'som/rockchip/evb-rk3576/overview.md' },
            ],
          },
          {
            id: 'rk356x', dir: 'rk356x', label: 'RK356X', labelZh: 'RK356X 系列',
            products: [
              { dir: 'som-rk3568', name: 'SOM RK3568', nameZh: 'SOM RK3568', desc: 'Quad A55 · mainstream', descZh: '四核 A55 · 主流款', img: '/img/board-teal.svg' },
            ],
          },
          {
            id: 'rk350x', dir: 'rk350x', label: 'RK350X', labelZh: 'RK350X 系列',
            products: [
              { dir: 'som-rk3506', name: 'SOM RK3506', nameZh: 'SOM RK3506', desc: 'Cost-effective industrial', descZh: '高性价比工业级', img: '/img/board-purple.svg' },
            ],
          },
          {
            id: 'rk3588', dir: 'rk3588', label: 'RK3588', labelZh: 'RK3588 系列',
            products: [
              { dir: 'som-rk3588', name: 'SOM RK3588', nameZh: 'SOM RK3588', desc: '8K · high-end compute', descZh: '8K · 高端算力', img: '/img/board-purple.svg', migrate: 'som/rockchip/som-rk3588/overview.md' },
            ],
          },
        ],
      },
      {
        id: 'allwinner',
        dir: 'allwinner',
        label: 'Allwinner',
        labelZh: 'Allwinner 全志',
        series: [
          {
            id: 't527', dir: 't527', label: 'T527', labelZh: 'T527 系列',
            products: [
              { dir: 'som-t527', name: 'SOM T527', nameZh: 'SOM T527', desc: 'Industrial grade octa-core', descZh: '工业级八核', img: '/img/board-teal.svg', migrate: 'som/allwinner/som-t527/overview.md' },
              { dir: 'evb-t527', name: 'EVB T527', nameZh: 'EVB T527', desc: 'Evaluation board', descZh: '评估底板', img: '/img/board-amber.svg', migrate: 'som/allwinner/evb-t527/overview.md' },
            ],
          },
          {
            id: 'a527', dir: 'a527', label: 'A527', labelZh: 'A527 系列',
            products: [
              { dir: 'som-a527', name: 'SOM A527', nameZh: 'SOM A527', desc: 'Automotive-grade variant', descZh: '车规级版本', img: '/img/board-teal.svg' },
            ],
          },
        ],
      },
      {
        id: 'nxp',
        dir: 'nxp',
        label: 'NXP',
        labelZh: 'NXP',
        series: [
          {
            id: 'imx8m', dir: 'imx8m', label: 'i.MX8M', labelZh: 'i.MX8M 系列',
            products: [
              { dir: 'som-imx8m', name: 'SOM i.MX8M', nameZh: 'SOM i.MX8M', desc: 'Long-term supply', descZh: '长期供货', img: '/img/board-blue.svg' },
            ],
          },
          {
            id: 'imx93', dir: 'imx93', label: 'i.MX93', labelZh: 'i.MX93 系列',
            products: [
              { dir: 'som-imx93', name: 'SOM i.MX93', nameZh: 'SOM i.MX93', desc: 'Low-power edge', descZh: '低功耗边缘', img: '/img/board-blue.svg' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sbc',
    dir: 'sbc',
    label: 'SBC',
    labelZh: '单板',
    desc: 'Ready-to-run single board computers.',
    descZh: '开箱即用的单板计算机。',
    groups: [
      {
        id: 'pi', dir: 'pi', label: 'Pi', labelZh: 'Pi 系列',
        series: [
          { id: 'pi1', dir: 'pi1', label: 'Pi 1', labelZh: 'Pi 1', desc: 'Entry-level SBC', descZh: '入门级单板', img: '/img/board-blue.svg', pages: ['overview', 'specifications', 'hardware', 'software', 'download'] },
          { id: 'pi2', dir: 'pi2', label: 'Pi 2', labelZh: 'Pi 2', desc: 'Balanced performance', descZh: '均衡性能', img: '/img/board-teal.svg' },
          { id: 'pi3', dir: 'pi3', label: 'Pi 3', labelZh: 'Pi 3', desc: 'High performance', descZh: '高性能', img: '/img/board-purple.svg' },
        ],
      },
      {
        id: 'iec', dir: 'iec', label: 'IEC', labelZh: 'IEC 系列',
        series: [
          { id: 'iec1', dir: 'iec1', label: 'IEC1', labelZh: 'IEC1', desc: 'Industrial controller', descZh: '工业控制器', img: '/img/board-amber.svg' },
          { id: 'iec2', dir: 'iec2', label: 'IEC2', labelZh: 'IEC2', desc: 'Industrial controller · Pro', descZh: '工业控制器 · Pro', img: '/img/board-purple.svg' },
        ],
      },
    ],
  },
  {
    id: 'edge-box',
    dir: 'edge-box',
    label: 'Edge',
    labelZh: '边缘计算 BOX',
    desc: 'Edge computing boxes for industrial deployment.',
    descZh: '面向工业部署的边缘计算整机。',
    groups: [
      {
        id: 'mini-box', dir: 'mini-box', label: 'MINI-BOX', labelZh: 'MINI-BOX',
        products: [
          { dir: 'mini-box', name: 'MINI BOX', nameZh: 'MINI BOX', desc: 'Compact fanless box', descZh: '紧凑无风扇整机', img: '/img/board-blue.svg' },
        ],
      },
      {
        id: 'ai-box', dir: 'ai-box', label: 'AI-BOX', labelZh: 'AI-BOX',
        products: [
          { dir: 'ai-box', name: 'AI BOX', nameZh: 'AI BOX', desc: 'Edge inference box', descZh: '边缘推理盒子', img: '/img/board-purple.svg' },
        ],
      },
      {
        id: 'ipc-box', dir: 'ipc-box', label: 'IPC-BOX', labelZh: 'IPC-BOX',
        products: [
          { dir: 'ipc-box', name: 'IPC BOX', nameZh: 'IPC BOX', desc: 'Industrial PC box', descZh: '工业计算机整机', img: '/img/board-amber.svg' },
        ],
      },
    ],
  },
  {
    id: 'ai-module',
    dir: 'ai-module',
    label: 'AI-Module',
    labelZh: '端侧 AI 模组',
    desc: 'AI acceleration modules and SDK documentation.',
    descZh: 'AI 加速模组与 SDK 文档。',
    groups: [
      {
        id: 'rknn', dir: 'rknn', label: 'RKNN', labelZh: 'RKNN',
        products: [
          { dir: 'npu-ai', name: 'NPU & AI SDK', nameZh: 'NPU & AI SDK', desc: 'RKNN toolkit and model deployment', descZh: 'RKNN 工具链与模型部署', img: '/img/board-purple.svg', migrate: 'edge-ai/rknn/npu-ai.md' },
          { dir: 'ai-module-rknn', name: 'AI Module RKNN', nameZh: 'AI 模组 RKNN', desc: 'M.2 AI acceleration module', descZh: 'M.2 AI 加速模组', img: '/img/board-teal.svg', migrate: 'edge-ai/rknn/ai-module-rknn/overview.md' },
        ],
      },
      {
        id: 'other', dir: 'other', label: 'Other', labelZh: 'Other 其他',
        products: [
          { dir: 'ai-module-other', name: 'Other AI Modules', nameZh: '其他 AI 模组', desc: 'Third-party AI accelerators', descZh: '第三方 AI 加速模组', img: '/img/board-blue.svg' },
        ],
      },
    ],
  },
  {
    id: 'accessories',
    dir: 'accessories',
    label: 'Accessories',
    labelZh: '配件',
    desc: 'Displays, cameras, wireless modules and cooling.',
    descZh: '屏幕、摄像头、通信模组与散热配件。',
    groups: [
      {
        id: 'displays', dir: 'displays', label: 'Displays', labelZh: '屏幕',
        products: [
          { dir: 'display-mipi', name: '7" MIPI Display', nameZh: '7 寸 MIPI 屏', desc: '7-inch MIPI DSI panel', descZh: '7 寸 MIPI DSI 屏', img: '/img/board-teal.svg' },
          { dir: 'display-lvds', name: '10" LVDS Display', nameZh: '10 寸 LVDS 屏', desc: '10-inch LVDS panel', descZh: '10 寸 LVDS 屏', img: '/img/board-blue.svg' },
        ],
      },
      {
        id: 'cameras', dir: 'cameras', label: 'Cameras', labelZh: '摄像头',
        products: [
          { dir: 'camera-mipi', name: 'MIPI Camera', nameZh: 'MIPI 摄像头', desc: '13MP MIPI CSI camera', descZh: '1300 万像素 MIPI CSI 摄像头', img: '/img/board-purple.svg' },
        ],
      },
      {
        id: 'wireless-modules', dir: 'wireless-modules', label: 'Wireless-modules', labelZh: '通信模组',
        products: [
          { dir: 'wifi6-module', name: 'Wi-Fi 6 Module', nameZh: 'Wi-Fi 6 模组', desc: '2.4/5 GHz combo module', descZh: '2.4/5 GHz 双频模组', img: '/img/board-blue.svg' },
          { dir: 'lte-module', name: '4G LTE Module', nameZh: '4G LTE 模组', desc: 'Mini PCIe LTE module', descZh: 'Mini PCIe LTE 模组', img: '/img/board-teal.svg' },
        ],
      },
      {
        id: 'cooling', dir: 'cooling', label: 'Cooling', labelZh: '散热器',
        products: [
          { dir: 'thermal-power', name: 'Thermal & Power', nameZh: '散热与供电设计', desc: 'Thermal design and power budget', descZh: '散热设计与功耗预算', img: '/img/board-amber.svg', migrate: 'accessories/cooling/thermal-power.md' },
          { dir: 'heatsink-kit', name: 'Heatsink Kit', nameZh: '散热器套件', desc: 'Official heatsink and fan kit', descZh: '官方散热片与风扇套件', img: '/img/board-teal.svg' },
        ],
      },
    ],
  },
];

// 由目录名自动推导 href、sidebarId、导航菜单结构
const categories = raw.map((c) => {
  const cHref = `/${c.dir}`;
  const groups = (c.groups || []).map((g) => {
    const gHref = `${cHref}/${g.dir}`;
    const sidebarId = `${c.id}_${g.id}`;
    const series = (g.series || []).map((s) => {
      const sHref = `${gHref}/${s.dir}`;
      return {
        ...s,
        href: sHref,
        sidebarId,
        products: (s.products || []).map((p) => ({ ...p, href: `${sHref}/${p.dir}`, sidebarId })),
      };
    });
    const products = (g.products || []).map((p) => ({ ...p, href: `${gHref}/${p.dir}`, sidebarId }));
    return { ...g, href: gHref, sidebarId, series, products };
  });
  return { ...c, href: cHref, sidebarId: c.id, groups };
});

// 顶部下拉菜单：大类 → 左侧二级列 / 右侧三级列
// 有 series 时右列显示三级系列；否则显示产品
const navMenus = categories.map((c) => ({
  id: c.id,
  label: c.label,
  labelZh: c.labelZh,
  href: c.href,
  groups: c.groups.map((g) => ({
    label: g.label,
    labelZh: g.labelZh,
    href: g.href,
    items: (g.series && g.series.length
      ? g.series.map((s) => ({ label: s.label, labelZh: s.labelZh, href: s.href }))
      : g.products.map((p) => ({ label: p.name, labelZh: p.nameZh, href: p.href }))
    ),
  })),
}));

// Support 下拉（一级，无三级结构）
const supportMenu = {
  label: 'Support',
  labelZh: '支持',
  href: '/support',
  items: [
    { label: 'Support', labelZh: '技术支持', href: '/support' },
    { label: 'Forum', labelZh: '论坛', href: '/support/forum' },
    { label: 'Blog', labelZh: '博客', href: '/support/blog' },
    { label: 'GitHub', labelZh: 'GitHub', href: 'https://github.com/industio', external: true },
  ],
};

module.exports = { categories, navMenus, supportMenu };
