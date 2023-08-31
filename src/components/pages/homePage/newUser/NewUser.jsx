import React from "react";
import style from "./style.module.css";
import Card from "../../../common/card/Card";
import { Link } from "react-router-dom";

export default function NewUser(props) {
  return (
    <Link to="/welcome" onClick={props.handleClick}>
      <Card
        className={`${style.newUser} ${props.newUserClose ? style.close : ""}`}
      >
        <h2 className={style.newUser__title}>Добро пожаловать!</h2>
        <p className={style.newUser__text}>
          Мы подготовили специальный раздел в Вашем профиле для новых
          сотрудников!
        </p>
      </Card>
    </Link>
  );
}
