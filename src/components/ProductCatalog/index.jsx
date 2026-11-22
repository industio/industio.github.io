import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import data from "@site/src/data/products.json";
import "./styles.css";

/**
 * 产品目录：大项 → 二级分组 → 产品卡（Radxa 首页同款层次）
 * 数据来自 src/data/products.json
 * 每个字段支持英文 / 中文（label 与 labelZh），按当前语言自动取
 */
export default function ProductCatalog() {
  const { i18n } = useDocusaurusContext();
  const isZh = (i18n.currentLocale || "en").startsWith("zh");
  const t = (obj, key) => (isZh ? obj[`${key}Zh`] || obj[key] : obj[key]);

  return (
    <div className="cat">
      {data.categories.map((c) => (
        <section key={c.id} className="cat__section" id={c.id}>
          <h2 className="cat__title">{t(c, "label")}</h2>
          <p className="cat__desc">{t(c, "desc")}</p>

          {c.groups.map((g) => {
            const linkOnly = g.items.every((p) => !p.img);
            return (
              <div key={g.id} className="cat__group">
                {g.label ? (
                  <h3 className="cat__group-title">{t(g, "label")}</h3>
                ) : null}
                <div className={"cat__cards" + (linkOnly ? " cat__cards--links" : "")}>
                  {g.items.map((p) =>
                    p.img ? (
                      <a key={p.name} className="cat__card" href={p.href}>
                        <img src={p.img} alt={p.name} loading="lazy" />
                        <span className="cat__name">{p.name}</span>
                        <small>{p.desc}</small>
                      </a>
                    ) : (
                      <a key={p.name} className="cat__link" href={p.href}>
                        <strong>{t(p, "name")}</strong>
                        <span>{t(p, "desc")}</span>
                      </a>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}
