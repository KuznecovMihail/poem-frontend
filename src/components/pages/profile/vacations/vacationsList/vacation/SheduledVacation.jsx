import React from "react";
import moment from "moment";
import calendarImg from "../../../../../../img/calendar.svg";
import style from "./style.module.css";

export default function SheduledVacation({ dateFrom, dateBy, amountOfDays }) {
  return (
    <div className={style.vacation}>
      <div className={style.vacation__content}>
        <div className={style.person__avatar__box}>
          <img src={calendarImg} alt="" />
        </div>
        <div className={style.vacation__body}>
          <p>Начало: {moment(dateFrom).format("D MMMM Y")}</p>
          <p>Конец: {moment(dateBy).format("D MMMM Y")}</p>
          <p>Всего: {amountOfDays}</p>
        </div>
      </div>
      <hr />
    </div>
  );
}
