import React from "react";
import HeaderLink from "./headerLink/HeaderLink";
import HeaderNav from "./headerNav/HeaderNav";
import style from "./style.module.css";

export default function HeaderUser({ employeeInfo, role }) {
  return (
    <header className={style.header}>
      <HeaderNav employeeInfo={employeeInfo} role={role} />
      <HeaderLink />
    </header>
  );
}
