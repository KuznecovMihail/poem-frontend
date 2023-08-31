import React from "react";
import HeaderLink from "./headerLink/HeaderLink";
import HeaderNav from "./headerNav/HeaderNav";
import style from "./style.module.css";

export default function HeaderAdmin(props) {
  return (
    <header className={style.header}>
      <HeaderNav
        employeeInfo={props.employeeInfo}
        role={props.role}
        updateHeader={props.updateHeader}
      />
      <HeaderLink />
    </header>
  );
}
