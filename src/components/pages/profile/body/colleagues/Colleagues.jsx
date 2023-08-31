import React from "react";
import { Alert } from "antd";
import { Link } from "react-router-dom";
import { useGetSubordinates } from "../../../../../hooks/useProfiles";
import Spinner from "../../../../common/spinner/Spinner";
import Card from "../../../../common/card/Card";
import Person from "./person/Person";
import style from "./style.module.css";

export default function Colleagues({ divisionInfo, bossInfo }) {
  const {
    data: subordinates,
    isLoading,
    error,
  } = useGetSubordinates({
    id: bossInfo.id,
    ignoreId: true,
  });

  if (error)
    return (
      <Alert
        message="Не удалось получить данные, повторите попытку позже"
        type="error"
        showIcon
      />
    );

  if (isLoading) return <Spinner />;

  return (
    <Card>
      <div className={style.colleagues}>
        <div className={style.colleagues__row}>
          <h4>Руководитель:</h4>
          <Link to={`/user/${bossInfo.id}`} className={style.marked}>
            <h4>
              {[
                bossInfo.lastName,
                bossInfo.firstName,
                bossInfo.middleName,
              ].join(" ")}
            </h4>
          </Link>
        </div>
        <div className={style.colleagues__row}>
          <h4>Подразделение:</h4>
          <h4>{divisionInfo.titleDivision}</h4>
        </div>
      </div>
      <hr />
      <div className={style.colleagues__scrollable}>
        {subordinates.map(({ employeeBriefInfo }) => (
          <Person key={employeeBriefInfo.id} {...employeeBriefInfo} />
        ))}
      </div>
    </Card>
  );
}
