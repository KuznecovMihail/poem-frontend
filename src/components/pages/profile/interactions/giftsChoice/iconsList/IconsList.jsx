import React from "react";
import Icon from "./Icon";
import style from "./style.module.css";

export default function IconsList({ items, onPick, fromHomePage = false }) {
  return (
    <div className={fromHomePage ? style.iconsList__l : style.iconsList}>
      {items.map((item) => (
        <Icon key={item.id} icon={item} onPick={onPick} />
      ))}
    </div>
  );
}
