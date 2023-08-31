import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import style from "./syle.module.css";
import { CloseBurger } from "../../../../context/context";

export default function HeaderLink() {
  const { setCloseBurger } = useContext(CloseBurger);
  return (
    <div className={style.header__bottom}>
      <div className={`${style.header__container_link} container`}>
        <NavLink
          tabIndex={5}
          className={style.header__link}
          to="/news"
          onClick={() => setCloseBurger(true)}
        >
          Новости
        </NavLink>
        <NavLink
          tabIndex={6}
          className={style.header__link}
          to="https://blgatb-webtutor.atb.su/"
          target="_blanc"
          onClick={() => setCloseBurger(true)}
        >
          Корпоративный университет
        </NavLink>
        <NavLink
          tabIndex={7}
          className={style.header__link}
          to="http://portal.atb.su/"
          target="_blanc"
          onClick={() => setCloseBurger(true)}
        >
          Внутренний портал банка
        </NavLink>
        <NavLink
          tabIndex={8}
          className={style.header__link}
          to="/bank"
          onClick={() => setCloseBurger(true)}
        >
          Наш банк
        </NavLink>
      </div>
    </div>
  );
}
