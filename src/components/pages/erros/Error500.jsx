import React from "react";
import style from "./style.module.css";

export default function Error500() {
  return (
    <div className={style.content}>
      <h1 className={style.code}>500</h1>
      <h1>Не удалось получить данные</h1>
    </div>
  );
}
