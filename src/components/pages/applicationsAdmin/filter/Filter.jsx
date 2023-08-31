import React, { useState } from "react";
import { Select, DatePicker } from "antd";
import filter_icon from "../../../../img/filter.svg";
import style from "./style.module.css";
import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";
import ButtonGradientCustom from "../../../common/buttonGradient/ButtonGradientCustom";

export default function Filter({
  setFilter,
  setPage,
  typeOfApplicationId,
  setTypeOfApplicationId,
  typeOfReceiptId,
  setTypeOfReceiptId,
  statusId,
  setStatusId,
  categoryId,
  setCategoryId,
  changedFrom,
  setChangedFrom,
  changedTo,
  setChangedTo,
  createdFrom,
  setCreatedFrom,
  createdTo,
  setCreatedTo,
  dict,
}) {
  const typeOfApplication = dict?.filter(
    (item) => item.technicalCode === "tc2"
  );
  const typeOfReceipt = dict?.filter((item) => item.technicalCode === "tc1");
  const status = dict?.filter(
    (item) => item.technicalCode === "tc5" && item.valueName !== "Архив"
  );
  const category = dict?.filter((item) => item.technicalCode === "tc3");
  const [visible, setVisible] = useState(false);
  const handleFilterApply = () => {
    setVisible(false);
    const defaultStatusIdFilter =
      "statusId=17&statusId=18&statusId=19&statusId=20&statusId=23";
    const filter = {
      typeOfApplicationId: typeOfApplicationId,
      typeOfReceiptId: typeOfReceiptId,
      statusId: statusId,
      categoryId: categoryId,
      changedFrom: changedFrom,
      changedTo: changedTo,
      createdFrom: createdFrom,
      createdTo: createdTo,
    };
    let queryParams = Object.entries(filter)
      .filter(([key, value]) => value !== null)
      .map(([key, value]) => {
        if (
          key === "changedFrom" ||
          key === "changedTo" ||
          key === "createdFrom" ||
          key === "createdTo"
        ) {
          return `${key}=${encodeURIComponent(value.format("YYYY-MM-DD"))}`;
        } else {
          return `${key}=${encodeURIComponent(value)}`;
        }
      })
      .join("&");
    if (queryParams) {
      if (!queryParams.includes("statusId=")) {
        queryParams = `${defaultStatusIdFilter}&${queryParams}`;
      }
      setFilter(queryParams);
    } else {
      setFilter(defaultStatusIdFilter);
    }
    setPage(0);
  };
  return (
    <div className={style.filter}>
      <ButtonGradientCustom onClick={() => setVisible(!visible)}>
        <img src={filter_icon} alt="icon" />
        Добавить фильтр
      </ButtonGradientCustom>
      {visible && (
        <div className={style.dropdown}>
          <Select
            value={typeOfApplicationId || undefined}
            options={typeOfApplication?.map((type) => ({
              value: type.id,
              label: type.valueName,
            }))}
            placeholder="Тип заявки"
            className={style.filter_component}
            onChange={(value) => {
              if (value) {
                setTypeOfApplicationId(value);
              } else {
                setTypeOfApplicationId(null);
              }
            }}
            allowClear
          />
          <Select
            value={typeOfReceiptId || undefined}
            options={typeOfReceipt?.map((type) => ({
              value: type.id,
              label: type.valueName,
            }))}
            placeholder="Тип получения"
            className={style.filter_component}
            onChange={(value) => {
              if (value) {
                setTypeOfReceiptId(value);
              } else {
                setTypeOfReceiptId(null);
              }
            }}
            allowClear
          />
          <Select
            value={statusId || undefined}
            options={status?.map((type) => ({
              value: type.id,
              label: type.valueName,
            }))}
            placeholder="Статус"
            className={style.filter_component}
            onChange={(value) => {
              if (value) {
                setStatusId(value);
              } else {
                setStatusId(null);
              }
            }}
            allowClear
          />
          <Select
            value={categoryId || undefined}
            options={category?.map((type) => ({
              value: type.id,
              label: type.valueName,
            }))}
            placeholder="Тип документа"
            className={style.filter_component}
            onChange={(value) => {
              if (value) {
                setCategoryId(value);
              } else {
                setCategoryId(null);
              }
            }}
            allowClear
          />
          <DatePicker
            locale={locale}
            inputReadOnly={true}
            className={style.filter_component}
            placeholder="Изменена с"
            value={changedFrom || undefined}
            onChange={(value) => {
              if (value) {
                setChangedFrom(value);
              } else {
                setChangedFrom(null);
              }
            }}
            allowClear
          />
          <DatePicker
            locale={locale}
            inputReadOnly={true}
            className={style.filter_component}
            placeholder="Изменена по"
            value={changedTo || undefined}
            onChange={(value) => {
              if (value) {
                setChangedTo(value);
              } else {
                setChangedTo(null);
              }
            }}
            allowClear
          />
          <DatePicker
            locale={locale}
            inputReadOnly={true}
            className={style.filter_component}
            placeholder="Создана с"
            value={createdFrom || undefined}
            onChange={(value) => {
              if (value) {
                setCreatedFrom(value);
              } else {
                setCreatedFrom(null);
              }
            }}
            allowClear
          />
          <DatePicker
            locale={locale}
            inputReadOnly={true}
            className={style.filter_component}
            placeholder="Создана по"
            value={createdTo || undefined}
            onChange={(value) => {
              if (value) {
                setCreatedTo(value);
              } else {
                setCreatedTo(null);
              }
            }}
            allowClear
          />
          <ButtonGradientCustom onClick={handleFilterApply}>
            Применить
          </ButtonGradientCustom>
        </div>
      )}
    </div>
  );
}
