import React from "react";
import { message } from "antd";
import { useForm } from "react-hook-form";
import { usePutProfile } from "../../../../../hooks/useProfiles";
import { mask, unmask, onPhoneChange, onPhonePaste } from "./utils";
import Spinner from "../../../../common/spinner/Spinner";
import Card from "../../../../common/card/Card";
import style from "./style.module.css";

export default function Form({ employee, setEmployee, setIsEditing }) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      phone: employee.employeeInfo.phone && mask(employee.employeeInfo.phone),
      address: employee.employeeInfo.address,
      workTime: employee.employeeInfo.workTime,
    },
    mode: "onSubmit",
  });

  const { isLoading, putProfile } = usePutProfile(employee.employeeInfo.id);

  const onSubmit = async (data) => {
    data.phone = unmask(data.phone);
    const response = await putProfile(data);
    if (response?.status === 200) {
      setEmployee({
        divisionInfo: employee.divisionInfo,
        employeeInfo: Object.assign({}, employee.employeeInfo, data),
        bossInfo: employee.bossInfo,
      });
      setIsEditing(false);
      message.success("Данные профиля обновлены", 5);
    } else {
      message.error("Не удалось обновить данные профиля", 5);
    }
  };

  const cancelSubmit = () => {
    setIsEditing(false);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className={style.about__form}>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.about__row}>
            <div className={style.about__form__col}>
              <div
                className={[
                  style.form__group,
                  errors?.phone && style.form__tooltip,
                ].join(" ")}
                text={errors?.phone?.message}
              >
                <input
                  {...register("phone", {
                    required: { value: true, message: "Заполните поле" },
                    minLength: { value: 18, message: "Заполните поле" },
                    pattern: {
                      value: /^\+7 \(\d{3}\) \d{3}-\d\d-\d\d$/,
                      message: "Некорректный номер",
                    },
                  })}
                  type="tel"
                  maxLength={18}
                  placeholder=" "
                  className={style.form__input}
                  onChange={onPhoneChange}
                  onPaste={onPhonePaste}
                />
                <label className={style.form__label}>Телефон</label>
              </div>

              <div
                className={[
                  style.form__group,
                  !errors.phone && errors?.address && style.form__tooltip,
                ].join(" ")}
                text={errors?.address?.message}
              >
                <input
                  {...register("address", {
                    required: { value: true, message: "Заполните поле" },
                    maxLength: {
                      value: 150,
                      message: "Превышение длины",
                    },
                  })}
                  placeholder=" "
                  className={style.form__input}
                />
                <label className={style.form__label}>Адрес</label>
              </div>

              <div
                className={[
                  style.form__group,
                  !errors.phone &&
                    !errors.address &&
                    errors?.workTime &&
                    style.form__tooltip,
                ].join(" ")}
                text={errors?.workTime?.message}
              >
                <input
                  {...register("workTime", {
                    required: { value: true, message: "Заполните поле" },
                    maxLength: {
                      value: 50,
                      message: "Превышение длины",
                    },
                  })}
                  placeholder=" "
                  className={style.form__input}
                />
                <label className={style.form__label}>Время работы</label>
              </div>
            </div>
          </div>
          <div className={style.about__footer}>
            <button onClick={cancelSubmit}>Отменить</button>
            <button
              type="submit"
              className={isValid ? style.marked : undefined}
            >
              Сохранить
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
