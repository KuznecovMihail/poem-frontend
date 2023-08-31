import { React, useEffect } from "react";
import { useState } from "react";
import style from "./style.module.css";
import { ConfigProvider, Select, message } from "antd";
import { useForm } from "react-hook-form";
import Modal from "../../../common/modal/Modal";
import { Link } from "react-router-dom";
import ButtonGradientCustom from "../../../common/buttonGradient/ButtonGradientCustom";
import useCreateApplication from "../../../../hooks/useCreateApplication";
import { useGetDictionaryForApplications } from "../../../../hooks/useDictionaries";

export default function PaidHolidayInput(props) {
  const { data: dist } = useGetDictionaryForApplications();
  const { Option } = Select;
  const { register, handleSubmit } = useForm({ mode: "onBlur" });
  const [modalActive, setModalActive] = useState(false);
  const [statusApplic, setStatusApplic] = useState();
  const { createApplication, error } = useCreateApplication();
  const [typeOfReceiptId, setTypeOfReceiptId] = useState({});
  const [categoryId, setCategoryId] = useState({});

  const onSubmit = async (data) => {
    const formData = {
      absenceReason: null,
      illnessListNumber: null,
      deliveryAddress: data.deliveryAddress || null,
      started: null,
      ended: null,
      typeOfApplicationId: props.typeOfApplicationId,
      typeOfReceiptId: +typeOfReceiptId.id,
      categoryId: +categoryId.id,
      statusId: statusApplic,
    };
    await createApplication(formData);
  };

  const typeOfReceipt = [
    {
      id: 1,
      value: "Лично",
    },
    {
      id: 2,
      value: "Корпоративная почта",
    },
    {
      id: 3,
      value: "Курьером",
    },
  ];
  const category = [
    {
      id: 11,
      value: "Оригинал документа",
    },
    {
      id: 12,
      value: "Заверенная копия документа",
    },
    {
      id: 13,
      value: "Электронный скан документа",
    },
  ];
  const [isDraft, setIsDraft] = useState(true);
  const [isSend, setIsSend] = useState(true);
  const [save, setSave] = useState("Сохранить (как черновик)");
  const [isTypeOfReceipt, setIsTypeOfReceipt] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
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
    <div className={style.ndflInput}>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit)}>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: "#d9d9d9",
              borderRadius: "10px",
              colorPrimary: "#ff7a45",
              fontFamily: "Roboto, sans-serif",
            },
          }}
        >
          <label for="start">Способ получения документа</label>
          <Select
            value={typeOfReceiptId.name || undefined}
            onChange={(value, option) => {
              setTypeOfReceiptId({ name: value, id: option.key });
              setSave("Сохранить (как черновик)");
              setIsTypeOfReceipt(true);
              if (isCategory === true) {
                setIsSend(false);
                setIsDraft(false);
              }
            }}
          >
            {typeOfReceipt.map((option) => (
              <Option key={option.id} value={option.value}>
                {option.value}
              </Option>
            ))}
          </Select>
          {typeOfReceiptId.name === "Курьером" ? (
            <div className={style.address}>
              <label for="deliveryAddress">Адрес доставки</label>
              <input
                type="text"
                onInput={() => {
                  if (isCategory === true && isTypeOfReceipt === true) {
                    setIsSend(false);
                    setIsDraft(false);
                  }
                  setSave("Сохранить (как черновик)");
                }}
                {...register("deliveryAddress", {
                  required: {
                    value: false,
                  },
                })}
              />
            </div>
          ) : (
            <></>
          )}
          <label for="end">Формат получаемого документа</label>
          <Select
            value={categoryId.name || undefined}
            className={style.filter_component}
            onChange={(value, option) => {
              setCategoryId({ name: value, id: option.key });
              setSave("Сохранить (как черновик)");
              if (isTypeOfReceipt === true) {
                setIsSend(false);
                setIsDraft(false);
              }
              setIsCategory(true);
            }}
          >
            {category.map((option) => (
              <Option key={option.id} value={option.value}>
                {option.value}
              </Option>
            ))}
          </Select>
        </ConfigProvider>
        <div className={style.put__save__button}>
          <div className={style.button__applic}>
            <div className={style.put}>
              <button
                type="submit"
                disabled={isCategory && isTypeOfReceipt ? isSend : true}
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
