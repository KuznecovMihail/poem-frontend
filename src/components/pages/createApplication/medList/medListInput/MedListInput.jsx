import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import moment from "moment";
import Modal from "../../../../common/modal/Modal";
import { Link } from "react-router-dom";
import ButtonGradientCustom from "../../../../common/buttonGradient/ButtonGradientCustom";
import useCreateApplication from "../../../../../hooks/useCreateApplication";
import { useGetDictionaryForApplications } from "../../../../../hooks/useDictionaries";
import { ConfigProvider, DatePicker, message } from "antd";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/ru_RU";

export default function MedListInput() {
  const format = "YYYY-MM-DD";
  const { data: dist } = useGetDictionaryForApplications();
  const { register, handleSubmit } = useForm({ mode: "onBlur" });
  const [modalActive, setModalActive] = useState(false);
  const [statusApplic, setStatusApplic] = useState();
  const { createApplication, error } = useCreateApplication();
  const [dateMin, setDateMin] = useState();
  const [isSend, setIsSend] = useState(true);
  const [pickerActive, setPickerActive] = useState(false);
  const onSubmit = async (data) => {
    const formData = {
      absenceReason: null,
      illnessListNumber: data.illnessListNumber || null,
      deliveryAddress: null,
      started: dateMin,
      ended: null,
      typeOfApplicationId: dist[3].id,
      typeOfReceiptId: null,
      categoryId: null,
      statusId: statusApplic,
    };
    await createApplication(formData);
  };
  const onChangeFrom = (data, dateString) => {
    setDateMin(moment(data.$d).format("YYYY-MM-DD"));
  };

  var now = new Date().toLocaleDateString("en-ca");
  const disabledDateStart = (current) => {
    const sixMonthsFromReleaseDate = dayjs(now, format).endOf("day");

    return current && current < sixMonthsFromReleaseDate;
  };

  const [isDraft, setIsDraft] = useState(true);
  const [save, setSave] = useState("Сохранить (как черновик)");
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (error !== null) {
      messageApi.open({
        type: "error",
        content: "Возникла ошибка, попробуйте позже",
      });
    }
  }, [error, messageApi]);

  return (
    <div className={style.medListInput}>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit)}>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: "#d9d9d9",
              borderRadius: "20px",
              colorPrimary: "#ff7a45",
              fontFamily: "Roboto, sans-serif",
            },
          }}
        >
          <div className={style.edit_form}>
            <label>Дата начала больничного</label>
            <DatePicker
              className={style.edit_date}
              locale={locale}
              size="large"
              format={"DD.MM.YYYY"}
              inputReadOnly={true}
              allowClear={false}
              onChange={(data, dateString) => {
                onChangeFrom(data, dateString);
                setPickerActive(true);
                setSave("Сохранить (как черновик)");
                setIsDraft(false);
                setIsSend(false);
              }}
              disabledDate={disabledDateStart}
              showToday={true}
            />
          </div>
        </ConfigProvider>
        <label>Номер больничного листа</label>
        <input
          type="text"
          onInput={() => {
            setSave("Сохранить (как черновик)");
            if (pickerActive === true) {
              setIsDraft(false);
              setIsSend(false);
            }
          }}
          placeholder="Введите номер больничного листа"
          className={style.medList__input}
          {...register("illnessListNumber", {
            required: {
              value: false,
            },
          })}
        />

        <div className={style.put__save__button}>
          <div className={style.button__applic}>
            <div className={style.put}>
              <button
                type="submit"
                disabled={isSend}
                onClick={() => {
                  setStatusApplic(dist[14].id);
                  setTimeout(() => setModalActive(true), 400);
                  setTimeout(() => setIsSend(true), 100);
                }}
                className={`${style.edit_button} ${
                  isSend ? style.disabled : ""
                }`}
              >
                Отправить заявку
              </button>
            </div>
            <div className={style.save}>
              <button
                type="submit"
                disabled={isDraft}
                onClick={() => {
                  setStatusApplic(dist[13].id);
                  setTimeout(() => setIsDraft(true), 100);
                  if (error == null) {
                    setSave("Сохранено (как черновик)");
                  }
                }}
                className={`${style.draft} ${isDraft ? style.disabled : ""}`}
                style={{
                  background: "linear-gradient(to right, #858484, #bcbbbb)",
                }}
              >
                {save}
              </button>
              {isSend === true && error == null ? (
                <Modal
                  isModalOpen={modalActive}
                  setIsModalOpen={setModalActive}
                >
                  <div className={style.modal__content}>
                    <p>Заявка создана</p>
                    <Link to="/applications">
                      <ButtonGradientCustom>Ок</ButtonGradientCustom>
                    </Link>
                  </div>
                </Modal>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
