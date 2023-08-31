import React from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";
import { useGetImage } from "../../../../../hooks/useImages";
import Card from "../../../../common/card/Card";
import ButtonGradientCustom from "../../../../common/buttonGradient/ButtonGradientCustom";

export default function EmployeesCard(props) {
  const { worker } = props;
  const [image] = useGetImage(worker?.employeeInfo?.imageUrl);
  return (
    <div className={style.card}>
      <Card>
        {worker.employeeInfo.employeeStatusId === 33 ? (
          <div className={style.fired}>
            <h2>Нет информации</h2>
          </div>
        ) : (
          <>
            <h2 className={style.card_title}>
              {worker.employeeInfo.lastName} {worker.employeeInfo.firstName}{" "}
              {worker.employeeInfo.middleName}
            </h2>
            <div className={style.card_info}>
              <div className={style.card_info__text}>
                <h3>Сведения о сотруднике</h3>
                <p>
                  <b>Подразделение:</b> {worker.divisionInfo.titleDivision}
                </p>
                <p>
                  <b>Должность:</b> {worker.employeeInfo.position}
                </p>
                <p>
                  <b>Дата выхода на работу:</b>{" "}
                  {worker.employeeInfo.releaseDate
                    .split("-")
                    .reverse()
                    .join("-")}
                </p>
                <h3>Контактные данные</h3>
                <p>
                  <b>Email:</b> {worker.employeeInfo.email}
                </p>
                <p>
                  <b>Телефон:</b> {worker.employeeInfo.phone || "Не указан"}
                </p>
                <p>
                  <b>Время работы:</b>{" "}
                  {worker.employeeInfo.workTime || "Не указано"}
                </p>
              </div>
              <div className={style.card_info__photo}>
                <img src={image} alt="avatar" />
                <Link to={`/user/${worker.employeeInfo.id}`}>
                  <ButtonGradientCustom>Перейти к профилю</ButtonGradientCustom>
                </Link>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
