import React from "react";
import logo from "../../../../img/logo_admin.png";
import { Link } from "react-router-dom";
import HeaderButton from "../headerButton/HeaderButton";
import style from "./style.module.css";

export default function HeaderNav(props) {
  return (
    <div className={style.header__top}>
      <div className={`${style.header__container} container`}>
        <Link tabIndex={1} to="/admin">
          <img src={logo} alt="logo" className={style.header__logo} />
        </Link>
        <HeaderButton
          employeeInfo={props.employeeInfo}
          role={props.role}
          updateHeader={props.updateHeader}
        />
      </div>
    </div>
  );
}
