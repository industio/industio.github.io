import React, { useMemo, useState } from "react";
import data from "@site/src/data/products.json";
import "./styles.css";

/**
 * 产品浏览器：顶部 Tab 切换产品系列 → 左侧二级分组 → 右侧产品卡片
 * 数据来自 src/data/products.json，加产品只改 JSON，不改本文件
 */
export default function ProductExplorer() {
  const [seriesId, setSeriesId] = useState(data.series[0].id);
  const [groupId, setGroupId] = useState("all");

  const series = data.series.find((s) => s.id === seriesId) ?? data.series[0];
  const groups = series.groups;

  const switchSeries = (id) => {
    setSeriesId(id);
    setGroupId("all");
  };

  const visibleGroups = useMemo(
    () => (groupId === "all" ? groups : groups.filter((g) => g.id === groupId)),
    [groups, groupId]
  );

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="pe">
      {/* 一级 Tab：产品系列 */}
      <div className="pe__tabs" role="tablist" aria-label="Product series">
        {data.series.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={s.id === seriesId}
            className={"pe__tab" + (s.id === seriesId ? " pe__tab--active" : "")}
            onClick={() => switchSeries(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="pe__body">
        {/* 左侧：二级分组 */}
        <nav className="pe__menu" aria-label="Sub categories">
          <button
            type="button"
            className={"pe__menu-item" + (groupId === "all" ? " pe__menu-item--active" : "")}
            onClick={() => setGroupId("all")}
          >
            <span>All products</span>
            <span className="pe__count">{total}</span>
          </button>
          {groups.map((g) => (
            <button
              key={g.id}
              type="button"
              className={"pe__menu-item" + (groupId === g.id ? " pe__menu-item--active" : "")}
              onClick={() => setGroupId(g.id)}
            >
              <span>{g.label}</span>
              <span className="pe__count">{g.items.length}</span>
            </button>
          ))}
        </nav>

        {/* 右侧：产品卡片 */}
        <div className="pe__content">
          {visibleGroups.map((g) => (
            <section key={g.id} className="pe__group">
              {groupId === "all" && <h4 className="pe__group-title">{g.label}</h4>}
              <div className="pe__cards">
                {g.items.map((item) => (
                  <a key={item.name} className="pe__card" href={item.href}>
                    <img src={item.img} alt={item.name} loading="lazy" />
                    <span className="pe__card-name">{item.name}</span>
                    <small>{item.desc}</small>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
