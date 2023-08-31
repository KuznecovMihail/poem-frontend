import React from "react";
import style from "./style.module.css";

export default function Error404() {
  return (
    <div className={style.content}>
      <h1 className={style.code}>404</h1>
      <h1>Страница не найдена</h1>
    </div>
  );
}
