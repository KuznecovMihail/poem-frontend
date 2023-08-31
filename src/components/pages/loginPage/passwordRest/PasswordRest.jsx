import React from "react";
import style from "./style.module.css";
import logo from "../../../../img/logo.png";
import PasswordRestForm from "../passwordRestForm/PasswordRestForm";

export default function PasswordRest() {
  return (
    <div className={style.authorization}>
      <div className={style.auth__logo}>
        <img src={logo} alt="logo" className={style.logo} />
        <p className={style.auth__logo_title}>Внутренний портал сотрудника</p>
      </div>
      <div className={style.auth__form}>
        <h1 className={style.form__title}>Измените пароль</h1>
        <PasswordRestForm />
      </div>
    </div>
  );
}
