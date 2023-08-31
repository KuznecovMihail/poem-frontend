import React from "react";
import style from "./style.module.css";

export default function NewsAdminButton(props) {
  return (
    <div className={style.news_admin__button}>
      <div className={style.button__news}>
        {props.button === true ? (
          <div
            onClick={() => props.setButton(!props.button)}
            className={style.active_link}
          >
            Создание новости
          </div>
        ) : (
          <div
            onClick={(e) => props.setButton(!props.button)}
            className={style.active_link}
          >
            Список новостей
          </div>
        )}
      </div>
    </div>
  );
}
