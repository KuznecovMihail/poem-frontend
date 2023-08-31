import React from "react";
import present from "../../../../img/Present.svg";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import Card from "../../../common/card/Card";

export default function Birthday(props) {
  return (
    <Card
      className={`${style.birthday} ${props.birthdayClose ? style.close : ""}`}
    >
      <img className={style.birthday__img} src={present} alt="present" />
      <div className={style.birthday__text}>
        <p className={style.text}>
          Поздравляем с Днём Рождения! Желаем частья, любви, здоровья...
        </p>
        <Link to={`/user/${props.employeeId}`}>
          Перейти к моим поздравлениям
        </Link>
      </div>
    </Card>
  );
}
