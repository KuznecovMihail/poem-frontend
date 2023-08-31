import React from "react";
import BirthdayListCard from "../birthdayListCard/BirthdayListCard";
import style from "./style.module.css";
import Spinner from "../../../common/spinner/Spinner";
import Card from "../../../common/card/Card";
import { useGetBirthdayList } from "../../../../hooks/useProfiles";

export default function BirthdayList() {
  function getDateRangeString(dateFrom = 3, dateTo = 3) {
    if (dateFrom >= 15 || dateTo >= 15) {
      dateFrom = 3;
      dateTo = 3;
    }
    const today = new Date();

    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - dateFrom);
    const fromDateString = fromDate.toISOString().split("T")[0];

    const toDate = new Date(today);
    toDate.setDate(today.getDate() + dateTo);
    const toDateString = toDate.toISOString().split("T")[0];

    return { fromDateString, toDateString };
  }

  const dateFrom = 5; // Задать количество дней до текущей даты
  const dateTo = 5; // Задать количество дней от текущей даты

  const fromDateString = getDateRangeString(dateFrom, dateTo).fromDateString;
  const toDateString = getDateRangeString(dateFrom, dateTo).toDateString;

  const { birthdayList, isLoading, isError } = useGetBirthdayList(
    fromDateString,
    toDateString
  );

  if (isError) return <h1>Что-то пошло не так ...</h1>;

  if (isLoading) return <Spinner />;

  return (
    <div className={style.otherBirthday}>
      <Card>
        <h2 className={style.otherBirthday__title}>Дни Рождения</h2>
        <div className={style.otherBirthday__cards}>
          {birthdayList.birthdays.length !== 0 ? (
            birthdayList.birthdays.map((user) => (
              <BirthdayListCard key={user.id} {...user} />
            ))
          ) : (
            <div className={style.no_item}>
              На этой неделе день рождения никто не празднует
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
