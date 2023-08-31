import React from "react";
import { Link } from "react-router-dom";
import { useGetImage } from "../../../../../../hooks/useImages";
import style from "./style.module.css";

const restDaysMarker = 28;

export default function SubordinateVacation({
  employeeBriefInfo,
  holidayInfo,
}) {
  const [image] = useGetImage(employeeBriefInfo.imageUrl, true);

  const holidaysLeft =
    holidayInfo.daysLeftCurrentYear + holidayInfo.holidayDaysLeftLastYears;

  return (
    <div className={style.vacation}>
      <Link
        to={`/user/${employeeBriefInfo.id}`}
        className={style.vacation__content}
      >
        <div className={style.person__avatar__box}>
          <img src={image} alt="" />
        </div>
        <div className={style.vacation__body}>
          <p className={style.vacation__marked}>
            {[
              employeeBriefInfo.lastName,
              employeeBriefInfo.firstName,
              employeeBriefInfo.middleName,
            ].join(" ")}
          </p>
          <p>{employeeBriefInfo.position}</p>
          {holidaysLeft > restDaysMarker ? (
            <p className={style.vacation__remains}>Остаток: {holidaysLeft}</p>
          ) : (
            <p>Остаток: {holidaysLeft}</p>
          )}
        </div>
      </Link>
      <hr />
    </div>
  );
}
