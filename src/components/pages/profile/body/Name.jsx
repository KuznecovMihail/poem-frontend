import React from "react";
import style from "./style.module.css";

export default function Name({ employeeInfo }) {
  return (
    <div className={style.name}>
      <h1>
        {[
          employeeInfo.lastName,
          employeeInfo.firstName,
          employeeInfo.middleName,
        ].join(" ")}
      </h1>
      <h3>{employeeInfo.position}</h3>
    </div>
  );
}
