import React, {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * 顶部两级下拉菜单（mega menu）
 * 左列：二级分类（hover 切换）；右列：该二级分类下的三级分类 / 产品
 * 数据来源：docusaurus.config.js → src/data/catalog.js 的 navMenus
 *
 * 重要：面板始终渲染在 DOM 里，显示由 CSS 的 :hover / :focus-within 控制。
 * 不要用 JS 的 onMouseLeave 条件卸载面板——鼠标从顶部标签移到面板时，
 * 一旦路径离开标签盒子就会触发 mouseleave，面板会瞬间消失。
 */
export default function MegaMenuNavbarItem({
  label,
  labelZh,
  to = '/',
  groups = [],
  mobile = false,
  onClick,
  className,
}) {
  const {i18n} = useDocusaurusContext();
  const isZh = (i18n.currentLocale || 'en').startsWith('zh');
  const localePrefix =
    i18n.currentLocale && i18n.currentLocale !== i18n.defaultLocale
      ? `/${i18n.currentLocale}`
      : '';
  const lp = (url) =>
    url.startsWith('http') ? url : `${localePrefix}${url === '/' ? '/' : url}`;
  const t = (obj, key) => (isZh ? obj[`${key}Zh`] || obj[key] : obj[key]);
  const displayLabel = isZh ? labelZh || label : label;

  const [active, setActive] = useState(0);
  // 点击链接后暂时隐藏面板，直到鼠标重新进入（SPA 导航时鼠标常停在原处）
  const [dismissed, setDismissed] = useState(false);
  const dismiss = () => setDismissed(true);

  // 移动端：展开成普通多级列表
  if (mobile) {
    return (
      <li className="menu__list-item">
        <Link className="menu__link" to={lp(to)} onClick={onClick}>
          {displayLabel}
        </Link>
        <ul className="menu__list">
          {groups.map((g) => (
            <li className="menu__list-item" key={g.href}>
              <Link className="menu__link" to={lp(g.href)} onClick={onClick}>
                {t(g, 'label')}
              </Link>
              <ul className="menu__list">
                {(g.items || []).map((i) => (
                  <li className="menu__list-item" key={i.href}>
                    <Link className="menu__link" to={lp(i.href)} onClick={onClick}>
                      {t(i, 'label')}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  const activeGroup = groups[active] || {label: '', items: []};

  return (
    <div
      className={clsx('navbar__item', 'megaNav', dismissed && 'megaNav--dismissed', className)}
      onMouseEnter={() => setDismissed(false)}>
      <Link
        className="navbar__link megaNav__trigger"
        to={lp(to)}
        aria-haspopup="true"
        onClick={dismiss}>
        {displayLabel}
        <span className="megaNav__caret" aria-hidden="true">▾</span>
      </Link>

      {/* 常驻 DOM：显示交给 CSS :hover / :focus-within，避免鼠标移动时闪退 */}
      <div className="megaNav__panel">
        <div className="megaNav__left">
          {groups.map((g, idx) => (
            <Link
              key={g.href}
              to={lp(g.href)}
              className={clsx('megaNav__group', idx === active && 'megaNav__group--active')}
              // 用 onMouseOver：Docusaurus 的 Link 内部会用 onMouseEnter 做预加载并覆盖传入值
              onMouseOver={() => setActive(idx)}
              onFocus={() => setActive(idx)}
              onClick={dismiss}>
              {t(g, 'label')}
              <span aria-hidden="true">›</span>
            </Link>
          ))}
        </div>
        <div className="megaNav__right">
          <div className="megaNav__rightTitle">{t(activeGroup, 'label')}</div>
          <ul className="megaNav__items">
            {(activeGroup.items || []).map((i) => (
              <li key={i.href}>
                <Link to={lp(i.href)} onClick={dismiss}>
                  {t(i, 'label')}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            className="megaNav__all"
            to={lp(activeGroup.href || to)}
            onClick={dismiss}>
            View all →
          </Link>
        </div>
      </div>
    </div>
  );
}
