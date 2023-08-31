import React from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";

export default function Error504() {
  return (
    <div className={style.content}>
      <h1 className={style.code}>504</h1>
      <Link to="/" className={style.link}>
        <h1>Превышено время ожидания</h1>
        <h4>нажмите чтобы вернуться на главную страницу</h4>
      </Link>
    </div>
  );
}
