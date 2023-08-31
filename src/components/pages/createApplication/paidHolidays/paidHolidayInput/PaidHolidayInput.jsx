import React, { useContext, useEffect, useState } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import moment from "moment";
import Modal from "../../../../common/modal/Modal";
import { Link } from "react-router-dom";
import useCreateApplication from "../../../../../hooks/useCreateApplication";
import { Context } from "../../../../../context/context";
import { useGetProfile } from "../../../../../hooks/useProfiles";
import { useGetDictionaryForApplications } from "../../../../../hooks/useDictionaries";
import ButtonGradientCustom from "../../../../common/buttonGradient/ButtonGradientCustom";
import locale from "antd/es/date-picker/locale/ru_RU";
import { ConfigProvider, DatePicker, message } from "antd";
import dayjs from "dayjs";

export default function PaidHolidayInput() {
  const format = "YYYY-MM-DD";
  const [dateMin, setDateMin] = useState("");
  const [dateMax, setDateMax] = useState("");
  const [pickerActive, setPickerActive] = useState(false);
  const onChangeFrom = (data, dateString) => {
    setDateMin(moment(data.$d).format("YYYY-MM-DD"));
  };
  const onChangeTo = (data, dateString) => {
    setDateMax(moment(data.$d).format("YYYY-MM-DD"));
  };
  const { data: dist } = useGetDictionaryForApplications();
  const { employeeId } = useContext(Context);
  const { employee } = useGetProfile(employeeId);
  const { handleSubmit } = useForm({ mode: "onBlur" });
  const [modalActive, setModalActive] = useState(false);
  const [statusApplic, setStatusApplic] = useState();
  const { createApplication, error } = useCreateApplication();
  const [isSend, setIsSend] = useState(true);
  const onSubmit = async (data) => {
    const formData = {
      absenceReason: null,
      illnessListNumber: null,
      deliveryAddress: null,
      started: dateMin,
      ended: dateMax,
      typeOfApplicationId: dist[4].id,
      typeOfReceiptId: null,
      categoryId: null,
      statusId: statusApplic,
    };
    await createApplication(formData);
  };

  let startHoliday;
  if (employee !== null) {
    startHoliday = moment(employee.employeeInfo.releaseDate)
      .add(6, "month")
      .format("YYYY-MM-DD");
  }
  const disabledDateStart = (current) => {
    const sixMonthsFromReleaseDate = dayjs(
      employee.employeeInfo.releaseDate,
      format
    )
      .add(6, "month")
      .endOf("day");
    const end = dateMax
      ? dayjs(dateMax, format)
      : employee.employeeInfo.releaseDate;
    return current && (current < sixMonthsFromReleaseDate || current > end);
  };
  const disabledDateEnd = (current) => {
    return current && current < dayjs(dateMin, format).endOf("day");
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
    <div className={style.PaidHolidayInput}>
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
            <label>Дата начала отпуска</label>
            <DatePicker
              className={style.edit_date}
              locale={locale}
              size="large"
              format={"DD.MM.YYYY"}
              inputReadOnly={true}
              allowClear={false}
              defaultPickerValue={dayjs(startHoliday, format)}
              onChange={(data, dateString) => {
                onChangeFrom(data, dateString);
                setPickerActive(true);
                setSave("Сохранить (как черновик)");
                if (dateMax !== "") {
                  setIsDraft(false);
                  setIsSend(false);
                }
              }}
              disabledDate={disabledDateStart}
            />
          </div>
          <div className={style.edit_form}>
            <label>Дата окончания отпуска</label>
            <DatePicker
              className={style.edit_date}
              locale={locale}
              size="large"
              format={"DD.MM.YYYY"}
              inputReadOnly={true}
              allowClear={false}
              defaultPickerValue={dayjs(startHoliday, format)}
              disabled={!pickerActive}
              onChange={(data, dateString) => {
                onChangeTo(data, dateString);
                setIsDraft(false);
                setIsSend(false);
                setSave("Сохранить (как черновик)");
              }}
              disabledDate={disabledDateEnd}
            />
          </div>
        </ConfigProvider>
        <div className={style.put__save__button}>
          <div className={style.button__applic}>
            <div className={style.put}>
              <button
                type="submit"
                disabled={isSend}
                onClick={() => {
                  setStatusApplic(dist[14].id);
                  setTimeout(()=> setModalActive(true),400)
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
              {(isSend === true && error ==null) ? (
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
