import React, { useState } from "react";
import { DatePicker, Form, Input } from "antd";
import style from "./style.module.css";
import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";
import dayjs from "dayjs";

export default function FieldsForUnpaidVacation({
  application,
  setBody,
  setIsDraft,
}) {
  const [started, setStarted] = useState(application?.started);
  const [ended, setEnded] = useState(application?.ended);
  const [absenceReason, setAbsenceReason] = useState(
    application?.absenceReason
  );
  const format = "YYYY-MM-DD";
  const { TextArea } = Input;
  const disabledDateStart = (current) => {
    const end = dayjs(ended, format);
    const maxDate = end.startOf("day");
    return current && (current < dayjs().endOf("day") || current > maxDate);
  };
  const disabledDateEnd = (current) => {
    return current && current < dayjs(started, format).startOf("day");
  };
  const handleStartedChange = (date) => {
    setStarted(date.format("YYYY-MM-DD"));
    setBody({
      ...application,
      started: date.format("YYYY-MM-DD"),
      ended,
      absenceReason,
    });
    setIsDraft(false);
  };
  const handleEndedChange = (date) => {
    setEnded(date.format("YYYY-MM-DD"));
    setBody({
      ...application,
      started,
      absenceReason,
      ended: date.format("YYYY-MM-DD"),
    });
    setIsDraft(false);
  };
  return (
    <>
      <div className={style.edit_form}>
        <label>
          <h4>Дата начала отгула</h4>
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
          <h4>Дата окончания отгула</h4>
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
      <div className={style.edit_form}>
        <label>
          <h4>Комментарий к заявке</h4>
        </label>
        <Form.Item
          name="absenceReason"
          className={style.edit_text}
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите комментарий",
            },
          ]}
          help={!absenceReason && "Пожалуйста, введите комментарий"}
        >
          <TextArea
            rows={3}
            value={absenceReason}
            onChange={(e) => {
              const { value } = e.target;
              setAbsenceReason(value);
              setBody({
                ...application,
                absenceReason: value,
                started,
                ended,
              });
              setIsDraft(false);
            }}
          />
        </Form.Item>
      </div>
    </>
  );
}
