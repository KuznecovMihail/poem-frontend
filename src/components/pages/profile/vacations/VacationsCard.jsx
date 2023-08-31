import React, { useState } from "react";
import { useGetHolidays } from "../../../../hooks/useProfiles";
import Card from "../../../common/card/Card";
import Spinner from "../../../common/spinner/Spinner";
import Tooltip from "../../../common/tooltip/Tooltip";
import Modal from "../../../common/modal/Modal";
import VacationsList from "./vacationsList/VacationsList";
import style from "./style.module.css";

const restDaysMarker = 28;

export default function VacationsCard({ employeeInfo }) {
  const { data: holidays, isLoading, error } = useGetHolidays(employeeInfo.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (error)
    return (
      <div className={style.vacations}>
        <Card>
          <h4>Отпуск</h4>
          <hr />
          {error?.response?.status === 404 ? (
            <p>У вас пока нет отпусков</p>
          ) : (
            <p>Не удалось получить данные</p>
          )}
        </Card>
      </div>
    );

  if (isLoading) return <Spinner />;

  const {
    generalHolidayInfo,
    scheduledHolidayInfo,
    calculatedHoliday,
    restOfTheHoliday,
  } = holidays;

  return (
    <div className={style.vacations}>
      <Card onClick={() => setIsModalOpen(true)}>
        <h4>Отпуск</h4>
        <hr />
        <div className={style.vacations__row}>
          <p>Рассчитываемый:</p>
          <p>{calculatedHoliday > 0 ? calculatedHoliday : "--"}</p>
        </div>
        <div className={style.vacations__row}>
          <p>Запланированный:</p>
          <p>
            {scheduledHolidayInfo.length > 0
              ? scheduledHolidayInfo.length
              : "--"}
          </p>
        </div>
        <div className={style.vacations__row}>
          <p>Отгулянный:</p>
          <p>
            {generalHolidayInfo.daysOffCurrentYear > 0
              ? generalHolidayInfo.daysOffCurrentYear
              : "--"}
          </p>
        </div>
        {restOfTheHoliday > restDaysMarker ? (
          <Tooltip text={"Вам необходимо спланировать отдых"}>
            <div className={[style.vacations__row, style.marked].join(" ")}>
              <p>Остаток:</p>
              <p>{restOfTheHoliday}</p>
            </div>
          </Tooltip>
        ) : (
          <div className={style.vacations__row}>
            <p>Остаток:</p>
            <p>{restOfTheHoliday > 0 ? restOfTheHoliday : "--"}</p>
          </div>
        )}
      </Card>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <VacationsList
          setIsModalOpen={setIsModalOpen}
          scheduledHolidayInfo={scheduledHolidayInfo}
          employeeInfo={employeeInfo}
        />
      </Modal>
    </div>
  );
}
