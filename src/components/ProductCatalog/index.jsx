/**
 * 首页产品阵列（大类分区 + 二级 TAB + 三级左侧列表）
 *
 * 结构：大类分区 → 二级分类 TAB → TAB 内左侧三级分类 → 右侧产品卡
 * 数据来自 src/data/catalog.js（与顶部菜单、左侧栏、目录树同一份）
 */
import React, {useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import catalog from '@site/src/data/catalog';
import './styles.css';

const {categories} = catalog;

export default function ProductCatalog() {
  const {i18n} = useDocusaurusContext();
  const isZh = (i18n.currentLocale || 'en').startsWith('zh');
  const localePrefix =
    i18n.currentLocale && i18n.currentLocale !== i18n.defaultLocale
      ? `/${i18n.currentLocale}`
      : '';
  const lp = (url) => `${localePrefix}${url}`;
  const t = (obj, key) => (isZh ? obj[`${key}Zh`] || obj[key] : obj[key]);

  // 每个大类记住当前选中的二级 TAB；每个 TAB 记住当前选中的三级分类
  const [activeTab, setActiveTab] = useState({});
  const [activeSeries, setActiveSeries] = useState({});

  return (
    <div className="pc">
      {categories.map((c) => {
        const tabId = activeTab[c.id] || c.groups[0]?.id;
        const group = c.groups.find((g) => g.id === tabId) || c.groups[0];
        const seriesList = group.series || [];
        const seriesKey = `${c.id}/${group.id}`;
        const currentSeries = activeSeries[seriesKey] || 'all';

        // 有三级分类时按三级过滤；没有三级分类时产品直接属于二级
        let products = group.products || [];
        if (seriesList.length) {
          products =
            currentSeries === 'all'
              ? seriesList.flatMap((s) => s.products || [])
              : (seriesList.find((s) => s.id === currentSeries)?.products || []);
        }

        return (
          <section className="pc__section" id={c.id} key={c.id}>
            <h2 className="pc__title">{t(c, 'label')}</h2>
            <p className="pc__desc">{t(c, 'desc')}</p>

            {/* 二级分类 TAB */}
            <div className="pc__tabs" role="tablist">
              {c.groups.map((g) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={g.id === group.id}
                  className={`pc__tab ${g.id === group.id ? 'pc__tab--active' : ''}`}
                  key={g.id}
                  onClick={() => setActiveTab((s) => ({...s, [c.id]: g.id}))}>
                  {t(g, 'label')}
                </button>
              ))}
            </div>

            <div className="pc__panel">
              {/* 左侧：三级分类（无三级时列为产品直达） */}
              <div className="pc__side">
                {seriesList.length ? (
                  <>
                    <button
                      type="button"
                      className={`pc__sideItem ${currentSeries === 'all' ? 'pc__sideItem--active' : ''}`}
                      onClick={() => setActiveSeries((s) => ({...s, [seriesKey]: 'all'}))}>
                      {isZh ? '全部' : 'All'}
                    </button>
                    {seriesList.map((s) => (
                      <button
                        type="button"
                        key={s.id}
                        className={`pc__sideItem ${currentSeries === s.id ? 'pc__sideItem--active' : ''}`}
                        onClick={() => setActiveSeries((x) => ({...x, [seriesKey]: s.id}))}>
                        {t(s, 'label')}
                      </button>
                    ))}
                  </>
                ) : (
                  products.map((p) => (
                    <a className="pc__sideItem" href={lp(p.href)} key={p.href}>
                      {t(p, 'name')}
                    </a>
                  ))
                )}
              </div>

              {/* 右侧：产品卡阵列 */}
              <div className="pc__cards">
                {products.length ? (
                  products.map((p) => (
                    <a className="pc__card" href={lp(p.href)} key={p.href}>
                      {p.img && <img src={lp(p.img)} alt={t(p, 'name')} loading="lazy" />}
                      <span className="pc__name">{t(p, 'name')}</span>
                      <small>{t(p, 'desc')}</small>
                    </a>
                  ))
                ) : (
                  <p className="pc__empty">
                    {isZh ? '暂无产品文档，敬请期待。' : 'No product documents yet.'}
                  </p>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
