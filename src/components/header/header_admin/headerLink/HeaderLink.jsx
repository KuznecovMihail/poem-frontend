import React from "react";
import { NavLink } from "react-router-dom";
import style from "./style.module.css";

export default function HeaderLink() {
  return (
    <div className={style.header__bottom}>
      <div className={`${style.header__container_link} container`}>
        <NavLink tabIndex={5} className={style.header__link} to="/admin">
          Управление новостями
        </NavLink>
        <NavLink
          tabIndex={6}
          className={style.header__link}
          to="/admin/applications"
        >
          Управление заявками
        </NavLink>
        <NavLink tabIndex={7} className={style.header__link} to="booking/offices/city">
          Управление бронированием
        </NavLink>
        <NavLink tabIndex={8} className={style.header__link} to="upload_file">
          Загрузить файл
        </NavLink>
      </div>
    </div>
  );
}
