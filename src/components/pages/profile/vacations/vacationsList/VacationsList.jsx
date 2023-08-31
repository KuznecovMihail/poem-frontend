import React, { useState } from "react";
import { useGetSubordinates } from "../../../../../hooks/useProfiles";
import ButtonClose from "../../../../common/buttonClose/ButtonClose";
import Spinner from "../../../../common/spinner/Spinner";
import Navbar from "./navbar/Navbar";
import SubordinateVacation from "./vacation/SubordinateVacation";
import SheduledVacation from "./vacation/SheduledVacation";
import style from "./style.module.css";

export default function VacationsList({
  setIsModalOpen,
  scheduledHolidayInfo,
  employeeInfo,
}) {
  const [page, setPage] = useState("vacations");

  const {
    data: subordinates,
    isLoading,
    error,
  } = useGetSubordinates({
    id: employeeInfo.id,
    showHoliday: true,
    ignoreId: true,
  });

  const isCurrentUserBoss = subordinates?.length > 0;

  return (
    <div className={style.vacationsList}>
      <div className={style.vacationsList__header}>
        <Navbar
          page={page}
          setPage={setPage}
          isCurrentUserBoss={isCurrentUserBoss}
        />
        <ButtonClose onClick={() => setIsModalOpen(false)} />
      </div>
      <hr />
      <div className={style.vacationsList__scrollable}>
        {page === "vacations" ? (
          scheduledHolidayInfo.length > 0 ? (
            scheduledHolidayInfo.map((vacation) => (
              <SheduledVacation key={vacation.id} {...vacation} />
            ))
          ) : (
            <p>У вас нет запланированных отпусков</p>
          )
        ) : null}
        {page === "subordinates" ? (
          error ? (
            <p>Не удалось получить данные</p>
          ) : isLoading ? (
            <Spinner />
          ) : (
            subordinates.map((subordinate) => (
              <SubordinateVacation
                key={subordinate.employeeBriefInfo.id}
                {...subordinate}
              />
            ))
          )
        ) : null}
      </div>
    </div>
  );
}
