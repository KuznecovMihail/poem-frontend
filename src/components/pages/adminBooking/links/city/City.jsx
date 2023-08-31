import React, {useMemo} from "react";
import {Alert, Button, Input, Popconfirm, Select} from "antd";
import style from "./style.module.css"
import Spinner from "../../../../common/spinner/Spinner";
import {deleteCity, useAddCity, useChangeCity} from "../../../../../hooks/useBooking";

const {Option} = Select
const timezoneOptions = new Array(25)
  .fill(1)
  .map((el, i) => {
    let num = 12 - i
    if (num >= -9 && num <= -1) num = String(num)[0] + `0` + String(num)[1]
    if (num >= 0) num = `+` + String(num).padStart(2, `0`)
    return `${num}:00`
  })
  .map(el => ({label: el, value: el}))
  .reverse()

function City({getCities}) {
  const {cities, cityId, setCityId, isLoading, isError, trigger} = getCities
  const {
    isLoading: isLoadingAddCity,
    isError: isErrorAddCity,
    timeZone,
    cityName,
    handleChangeCityName,
    alertShow: alertShowAddCity,
    handleChangeOrClearTimeZone,
    handleClick
  } = useAddCity()
  const city = useMemo(() => cities.find(({id}) => id === cityId), [cityId, cities])
  const {
    newName,
    newTimeZone,
    handleChangeNewName,
    handleChangeNewTimeZone,
    handleClickChangeCity,
    isLoading: isLoadingChangeCity,
    isError: isErrorChangeCity,
    alertShow: alertShowChangeCity
  } = useChangeCity(city?.name, city?.timeZone, city?.id)

  const renderedCities = useMemo(() => cities.map((city, i) => (
    <Option value={city.id} key={i} label={city.name}>
      <div className={style.option_content}>
        <p>{city.name}</p>
        <p>{city.timeZone}</p>
      </div>
    </Option>
  )), [cities])

  const onCLearOrSelect = (value = null) => {
    setCityId(value)
  }
  if (isLoading) return <Spinner/>

  if (isError) return <h2>Что-то пошло не так...</h2>

  return (
    <div className={style.content}>
      <div className={style.first_column}>
        <div>
          <label><h4>Город</h4></label>
          <Select
            defaultValue={cityId}
            placeholder="Выберите город"
            className={style.select}
            allowClear
            onClear={() => onCLearOrSelect()}
            showSearch
            onSelect={value => onCLearOrSelect(value)}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          >
            {renderedCities}
          </Select>
        </div>
        {cityId &&
          <div>
            <Popconfirm
              onConfirm={e => {
                e.stopPropagation()
                deleteCity(cityId, trigger)
              }}
              title='Удаление города'
              description="Вы уверены?"
              okText="Да"
              cancelText="Нет"
            >
              <Button className={style.delete_button}>Удалить</Button>
            </Popconfirm>
          </div>
        }
      </div>
      <div>
        {cityId ?
          <div className={style.form_content}>
            <label><h4>Изменить Город</h4></label>
            <Input
              className={style.element}
              placeholder="Введите новое название города"
              value={newName}
              onChange={handleChangeNewName}
            />
            <Select className={style.element} options={timezoneOptions} value={newTimeZone}
                    onSelect={handleChangeNewTimeZone}/>
            <Button className={style.element} disabled={!newName || !newTimeZone || isLoadingChangeCity}
                    onClick={() => handleClickChangeCity(trigger)}>Сохранить</Button>
            {alertShowChangeCity &&
              <Alert
                type={isErrorChangeCity ? "error" : "success"}
                message={isErrorChangeCity ? "Что то пошло не так" : "Город успешно изменен"}
              />
            }
          </div> :
          <div className={style.form_content}>
            <div>
              <label><h4>Создать Город</h4></label>
              <Input
                className={style.element}
                placeholder="Введите новое название города"
                value={cityName}
                onChange={handleChangeCityName}
              />
            </div>
            <Select
              className={style.element}
              options={timezoneOptions}
              placeholder="UTC"
              value={timeZone}
              allowClear
              onClear={handleChangeOrClearTimeZone}
              onSelect={handleChangeOrClearTimeZone}
              defaultValue={"0:00"}
            />
            <Button disabled={!timeZone || !cityName || isLoadingAddCity} className={style.element}
                    onClick={() => handleClick(trigger)}>Создать</Button>
            {alertShowAddCity &&
              <Alert
                type={isErrorAddCity ? "error" : "success"}
                message={isErrorAddCity ? "Что то пошло не так" : "Город успешно создан"}
              />}
          </div>
        }
      </div>
    </div>
  );
}

export default City;
