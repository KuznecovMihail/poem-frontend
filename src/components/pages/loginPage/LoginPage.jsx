import React from "react";
import LoginPageForm from "./loginPageForm/LoginPageForm";
import logo from "../../../img/logo.png";
import style from "./style.module.css";

export default function LoginPage() {
  return (
    <div className={style.authorization}>
      <div className={style.auth__logo}>
        <img src={logo} alt="logo" className={style.logo} />
        <p className={style.auth__logo_title}>Внутренний портал сотрудника</p>
      </div>
      <div className={style.auth__form}>
        <h1 className={style.form__title}>Вход</h1>
        <LoginPageForm />
      </div>
    </div>
  );
}
