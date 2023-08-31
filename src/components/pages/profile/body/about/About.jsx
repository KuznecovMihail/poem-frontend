import React, { useState } from "react";
import moment from "moment";
import { mask } from "./utils";
import Icon from "../../../../common/icon/Icon";
import Form from "./Form";
import Card from "../../../../common/card/Card";
import Tooltip from "../../../../common/tooltip/Tooltip";
import alertImg from "../../../../../img/alert.png";
import style from "./style.module.css";

function Alert() {
  return (
    <Tooltip text={"Заполните поле"}>
      <img src={alertImg} alt="" className={style.about__alert} />
    </Tooltip>
  );
}

export default function About({ employee, setEmployee, isCurrentUserPage }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing)
    return (
      <Form
        employee={employee}
        setEmployee={setEmployee}
        setIsEditing={setIsEditing}
      />
    );

  return (
    <Card>
      <div className={style.about}>
        <div className={style.about__col}>
          <h4>Контактная информация</h4>
          <hr />
          <div className={style.about__row}>
            <p>Телефон:</p>
            {employee?.employeeInfo?.phone ? (
              <p>{mask(employee.employeeInfo.phone)}</p>
            ) : isCurrentUserPage ? (
              <Alert />
            ) : (
              <p>--</p>
            )}
          </div>
          <div className={style.about__row}>
            <p>Адрес:</p>
            {employee?.employeeInfo?.address ? (
              <p>{employee.employeeInfo.address}</p>
            ) : isCurrentUserPage ? (
              <Alert />
            ) : (
              <p>--</p>
            )}
          </div>
          <div className={style.about__row}>
            <p>Email:</p>
            {employee?.employeeInfo?.email ? (
              <p>{employee.employeeInfo.email}</p>
            ) : isCurrentUserPage ? (
              <Alert />
            ) : (
              <p>--</p>
            )}
          </div>
          <div className={style.about__row}>
            <p>Дата рождения:</p>
            {employee?.employeeInfo?.birthDate ? (
              <p>{moment(employee.employeeInfo.birthDate).format("D MMMM")}</p>
            ) : isCurrentUserPage ? (
              <Alert />
            ) : (
              <p>--</p>
            )}
          </div>
        </div>
        <div className={style.about__col}>
          <h4>Работа</h4>
          <hr />
          <div className={style.about__row}>
            <p>Табельный номер:</p>
            {employee?.employeeInfo?.personnelNumber ? (
              <p>{employee.employeeInfo.personnelNumber}</p>
            ) : isCurrentUserPage ? (
              <Alert />
            ) : (
              <p>--</p>
            )}
          </div>
          <div className={style.about__row}>
            <p>Время работы:</p>
            {employee?.employeeInfo?.workTime ? (
              <p>{employee.employeeInfo.workTime}</p>
            ) : isCurrentUserPage ? (
              <Alert />
            ) : (
              <p>--</p>
            )}
          </div>
          <div className={style.about__row}>
            <p>Дата выхода:</p>
            {employee?.employeeInfo?.releaseDate ? (
              <p>
                {moment(employee.employeeInfo.releaseDate).format("D MMMM Y")}
              </p>
            ) : isCurrentUserPage ? (
              <Alert />
            ) : (
              <p>--</p>
            )}
          </div>
          <div className={style.about__row}>
            <p>Руководитель:</p>
            {employee?.bossInfo ? (
              <p>
                {[
                  employee.bossInfo.lastName,
                  employee.bossInfo.firstName,
                  employee.bossInfo.middleName,
                ].join(" ")}
              </p>
            ) : isCurrentUserPage ? (
              <Alert />
            ) : (
              <p>--</p>
            )}
          </div>
          <div className={style.about__row}>
            <p>Подразделение:</p>
            {employee?.divisionInfo?.titleDivision ? (
              <p>{employee.divisionInfo.titleDivision}</p>
            ) : isCurrentUserPage ? (
              <Alert />
            ) : (
              <p>--</p>
            )}
          </div>
        </div>
      </div>
      <div className={style.about__footer}>
        {isCurrentUserPage ? <Icon onClick={() => setIsEditing(true)} /> : null}
      </div>
    </Card>
  );
}
