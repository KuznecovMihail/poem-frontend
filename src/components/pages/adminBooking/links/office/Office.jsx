import React, {useMemo} from "react";
import style from "./style.module.css";
import {Alert, Button, Input, Popconfirm, Select, Slider} from "antd";
import calendarImg from "../../../../../img/calendar.png";
import {deleteOffice, useAddOffice} from "../../../../../hooks/useBooking";
import {convertTime, getValueFromDate} from "../../helpers/convertTime";
import Spinner from "../../../../common/spinner/Spinner";
import Card from "../../../../common/card/Card";
import {Link} from "react-router-dom";

const {Option} = Select;

const marks = {};
for (let i = 0; i <= 1440; i += 240) {
  marks[i] = convertTime(i);
}

function Office({getOffices, city = null, getOffice}) {
  const {
    offices,
    officeId,
    isError: isErrorGetOffices,
    isLoading: isLoadingGetOffices,
    onClearOrSelectOffice,
    trigger,
  } = getOffices;

  const {
    handleChangeMaxDuration,
    handleChangeWorkTime,
    handleChangeAddress,
    changedOffice,
    handleClick: handleClickGetOffice,
    isLoading: isLoadingGetOffice,
    isError: isErrorGetOffice,
    alertShow: alertShowGetOffice,
  } = getOffice;

  const {
    newOffice,
    handleClick: handleClickAddCity,
    handleChangeNewMaxDuration,
    handleChangeNewAddress,
    handleChangeNewWorkTime,
    alertShow: alertShowAddOffice,
    isError: isErrorAddOffice,
    isLoading: isLoadingAddOffice,
  } = useAddOffice(city);

  const renderedOffices = useMemo(() =>
    offices.map((office, i) => (
      <Option value={office.id} key={i} label={office.address}>
        <div className={style.option_content}>
          {office.address}
        </div>
      </Option>
    )), [offices]);

  if (isLoadingGetOffices) return <Spinner/>;

  if (isErrorGetOffices) return <h4>Что то пошло не так</h4>;

  return (
    <>
      <div className={style.content}>
        <div className={style.first_column}>
          <div>
            <label>
              <h4>Офис</h4>
            </label>
            <Select
              defaultValue={officeId}
              placeholder="Выберите офис"
              allowClear
              showSearch
              onSelect={onClearOrSelectOffice}
              onClear={onClearOrSelectOffice}
              className={style.select}
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
            >
              {renderedOffices}
            </Select>
          </div>
          {officeId &&
            <div>
              <div>
                <Popconfirm
                  onConfirm={e => {
                    e.stopPropagation()
                    deleteOffice(officeId, trigger)
                  }}
                  title='Удаление офиса'
                  description="Вы уверены?"
                  okText="Да"
                  cancelText="Нет"
                >
                  <Button className={style.delete_button}>Удалить</Button>
                </Popconfirm>
              </div>
            </div>
          }
        </div>
        <div className={style.form}>
          {officeId ? (
            <div>
              <label>
                <h4>Изменить офис</h4>
              </label>
              <Input
                className={style.element}
                disabled={isLoadingGetOffice}
                placeholder="Введите адрес"
                onChange={handleChangeAddress}
                value={changedOffice?.address}
              />
              <label>
                <h4>Время работы</h4>
              </label>
              <Slider
                className={style.element}
                range
                min={0}
                max={1440}
                step={30}
                marks={marks}
                value={[
                  getValueFromDate(changedOffice?.workStart),
                  getValueFromDate(changedOffice?.workEnd),
                ]}
                onChange={(values) => handleChangeWorkTime(values)}
                tooltip={{formatter: convertTime}}
                disabled={isLoadingGetOffice}
              />
              <label>
                <h4>Дальность бронирования</h4>
              </label>
              <Input
                className={style.element}
                placeholder="Введите кол-во дней"
                onChange={handleChangeMaxDuration}
                value={changedOffice?.maxDuration}
                type="number"
                disabled={isLoadingGetOffice}
              />
              <Button
                className={style.element}
                disabled={
                  !changedOffice?.maxDuration ||
                  !changedOffice?.address ||
                  !changedOffice?.maxDuration ||
                  isLoadingGetOffice
                }
                onClick={() => handleClickGetOffice(trigger)}
              >
                Сохранить
              </Button>
              {alertShowGetOffice && (
                <Alert
                  type={isErrorGetOffice ? "error" : "success"}
                  message={
                    isErrorGetOffice
                      ? "Ошибка при изменении офиса"
                      : "Офис успешно изменён"
                  }
                />
              )}
            </div>
          ) : (
            <div>
              <label>
                <h4>Создать офис</h4>
              </label>
              <Input
                className={style.element}
                disabled={isLoadingAddOffice}
                placeholder="Введите адрес"
                onChange={handleChangeNewAddress}
                value={newOffice.address}
              />
              <label>
                <h4>Время работы</h4>
              </label>
              <Slider
                className={style.element}
                range
                min={0}
                max={1440}
                step={30}
                marks={marks}
                defaultValue={[600, 1200]}
                onChange={(values) => handleChangeNewWorkTime(values)}
                tooltip={{formatter: convertTime}}
                disabled={isLoadingAddOffice}
              />
              <label>
                <h4>Дальность бронирования</h4>
              </label>
              <Input
                className={style.element}
                placeholder="Введите кол-во дней"
                onChange={handleChangeNewMaxDuration}
                value={newOffice.maxDuration}
                type="number"
                disabled={isLoadingAddOffice}
              />
              <Button
                className={style.element}
                disabled={
                  !newOffice.maxDuration ||
                  !newOffice.address ||
                  !newOffice.maxDuration ||
                  isLoadingAddOffice
                }
                onClick={() => handleClickAddCity(trigger)}
              >
                Сохранить
              </Button>
              {alertShowAddOffice && (
                <Alert
                  type={isErrorAddOffice ? "error" : "success"}
                  message={
                    isErrorAddOffice
                      ? "Ошибка при создании офиса"
                      : "Офис успешно создан"
                  }
                />
              )}
            </div>
          )}
        </div>
      </div>
      {officeId && (
        <Link to={`/admin/booking/reservations/${officeId}`}>
          <Card className={style.reservation_list_buttons} onClick={() => null}>
            <img src={calendarImg} alt="" />
            <h4>Посмотреть бронирования офиса</h4>
          </Card>
        </Link>
      )}
    </>
  );
}

export default Office;
