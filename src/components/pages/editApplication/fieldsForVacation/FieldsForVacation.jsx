import React, { useState } from "react";
import { DatePicker } from "antd";
import style from "./style.module.css";
import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";
import dayjs from "dayjs";
import { useGetProfile } from "../../../../hooks/useProfiles";

export default function FieldsForVacation({
  application,
  setBody,
  employeeId,
  setIsDraft,
}) {
  const [started, setStarted] = useState(application?.started);
  const [ended, setEnded] = useState(application?.ended);
  const { employee } = useGetProfile(employeeId);
  const format = "YYYY-MM-DD";
  const disabledDateStart = (current) => {
    const sixMonthsFromReleaseDate = dayjs(
      employee.employeeInfo.releaseDate,
      format
    )
      .add(6, "month")
      .endOf("day");
    const end = dayjs(ended, format).subtract(1, "day");
    const maxDate = end.endOf("day");

    return current && (current < sixMonthsFromReleaseDate || current > maxDate);
  };
  const disabledDateEnd = (current) => {
    return current && current < dayjs(started, format).endOf("day");
  };
  const handleStartedChange = (date) => {
    setStarted(date.format("YYYY-MM-DD"));
    setBody({
      ...application,
      started: date.format("YYYY-MM-DD"),
      ended,
    });
    setIsDraft(false);
  };
  const handleEndedChange = (date) => {
    setEnded(date.format("YYYY-MM-DD"));
    setBody({
      ...application,
      started,
      ended: date.format("YYYY-MM-DD"),
    });
    setIsDraft(false);
  };
  return (
    <>
      <div className={style.edit_form}>
        <label>
          <h4>Дата начала отпуска</h4>
        </label>
        <DatePicker
          className={style.edit_date}
          locale={locale}
          format={"DD.MM.YYYY"}
          inputReadOnly={true}
          allowClear={false}
          value={dayjs(started, format)}
          onChange={handleStartedChange}
          disabledDate={disabledDateStart}
          showToday={false}
        />
      </div>
      <div className={style.edit_form}>
        <label>
          <h4>Дата окончания отпуска</h4>
        </label>
        <DatePicker
          className={style.edit_date}
          locale={locale}
          format={"DD.MM.YYYY"}
          inputReadOnly={true}
          allowClear={false}
          value={dayjs(ended, format)}
          onChange={handleEndedChange}
          disabledDate={disabledDateEnd}
          showToday={false}
        />
      </div>
    </>
  );
}
