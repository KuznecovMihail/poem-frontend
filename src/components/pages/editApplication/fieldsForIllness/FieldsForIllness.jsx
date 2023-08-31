import React, { useState } from "react";
import { DatePicker, Form, Input } from "antd";
import style from "./style.module.css";
import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";
import dayjs from "dayjs";

export default function FieldsForIllness({ application, setBody, setIsDraft }) {
  const [started, setStarted] = useState(application?.started);
  const [ended, setEnded] = useState(application?.ended);
  const [illnessListNumber, setIllnessListNumber] = useState(
    application?.illnessListNumber
  );
  const format = "YYYY-MM-DD";
  const disabledDateStart = (current) => {
    if (ended) {
      const end = dayjs(ended, format);
      const maxDate = end.startOf("day");
      return current && (current < dayjs().endOf("day") || current > maxDate);
    } else {
      return current && current < dayjs().startOf("day");
    }
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
      illnessListNumber,
    });
    setIsDraft(false);
  };
  const handleEndedChange = (date) => {
    setEnded(date.format("YYYY-MM-DD"));
    setBody({
      ...application,
      started,
      illnessListNumber,
      ended: date.format("YYYY-MM-DD"),
    });
    setIsDraft(false);
  };
  return (
    <>
      <div className={style.edit_form}>
        <label>
          <h4>Дата открытия больничного</h4>
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
          <h4>Дата закрытия больничного</h4>
        </label>
        {!ended ? (
          <Form.Item
            className={style.form_date}
            name={"ended"}
            rules={[
              {
                type: "object",
                required: true,
                message: "Пожалуйста, укажите дату закрытия больничного",
              },
            ]}
            help={!ended && "Пожалуйста, укажите дату закрытия больничного"}
          >
            <DatePicker
              className={style.edit_date}
              locale={locale}
              format={"DD.MM.YYYY"}
              inputReadOnly={true}
              allowClear={false}
              onChange={handleEndedChange}
              disabledDate={disabledDateEnd}
              showToday={false}
            />
          </Form.Item>
        ) : (
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
        )}
      </div>
      <div className={style.edit_form}>
        <label>
          <h4>Номер больничного листа</h4>
        </label>
        <Form.Item
          className={style.edit_text}
          name="illnessListNumber"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите номер больничного листа",
            },
          ]}
          help={
            !illnessListNumber && "Пожалуйста, введите номер больничного листа"
          }
        >
          <Input
            value={illnessListNumber}
            onChange={(e) => {
              const { value } = e.target;
              setIllnessListNumber(value);
              setBody({
                ...application,
                illnessListNumber: value,
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
