import React, { useState } from "react";
import style from "./style.module.css";
import { useRestPassword } from "../../../../hooks/useAuthorization";
import { useForm } from "react-hook-form";
import Spinner from "../../../common/spinner/Spinner";
import passwordImg from "../../../../img/password.svg";
import { Tooltip } from "antd";

export default function PasswordRestForm() {
  const [errPasswordMessage, setErrPasswordMessage] = useState(null);
  const { rest, isLoading, errMessage } = useRestPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  if (isLoading) return <Spinner />;

  const onSubmit = async (data) => {
    if (data.password !== data.confirmation) {
      setErrPasswordMessage("Пароли не совпадают");
    } else await rest(data.password, data.oldPassword);
  };

  return (
    <div className={style.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.form__flex}>
          <label htmlFor="password" className={`${style.form__label}`}>
            Старый пароль
            <img
              src={passwordImg}
              alt="password"
              className={`${style.old_password}`}
            />
            <input
              name="oldPassword"
              type="password"
              className={`${errors.oldPassword ? style.error : ""} ${
                style.form__input
              } ${style.input__oldPassword}`}
              {...register("oldPassword", {
                required: {
                  value: true,
                  message: "Поле обязательно для заполнения",
                },
              })}
            />
          </label>
          <Tooltip
            title="Пароль должен содержать сочетание верхнего и нижнего регистра, цифру и любой из символов  !@#$%^&*()+-|~{}=\[]:<>?,./</>"
            placement="rightBottom"
          >
            <label htmlFor="password" className={`${style.form__label}`}>
              Новый пароль
              <img
                src={passwordImg}
                alt="password"
                className={style.password_img}
              />
              <input
                name="password"
                type="password"
                className={`${errors.password ? style.error : ""} ${
                  style.form__input
                } ${style.username}`}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Поле обязательно для заполнения",
                  },
                  minLength: {
                    value: 8,
                    message: "Минимум 8 символов",
                  },
                  maxLength: {
                    value: 20,
                    message: "Максимум 20 символов",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()+-|~{}=`:";'<>?,./]).+$/,
                    message: "Некорректные символы в поле новый пароль",
                  },
                })}
              />
            </label>
          </Tooltip>
          <Tooltip
            title="Пароль должен содержать сочетание верхнего и нижнего регистра, цифру и любой из символов  !@#$%^&*()+-|~{}=\[]:<>?,./</>"
            placement="rightBottom"
          >
            <label
              htmlFor="confirmation"
              className={`${style.form__label} ${style.form__label_pass}`}
            >
              Подтвердите пароль
              <img
                src={passwordImg}
                alt="login"
                className={style.password_img}
              />
              <input
                name="confirmation"
                type="password"
                className={`${errors.confirmation ? style.error : ""} ${
                  style.form__input
                } ${style.password}`}
                {...register("confirmation", {
                  required: {
                    value: true,
                    message: "Поле обязательно для заполнения",
                  },
                  minLength: {
                    value: 8,
                    message: "Минимум 8 символов",
                  },
                  maxLength: {
                    value: 20,
                    message: "Максимум 20 символов",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()+-|~{}=`:";'<>?,./]).+$/,
                    message: "Некорректные символы в поле подтверждения пароля",
                  },
                })}
              />
            </label>
          </Tooltip>
          {errors.password ||
          errors.confirmation ||
          errors.oldPassword ||
          errPasswordMessage !== null ||
          errMessage !== undefined ? (
            <div className={style.form__error}>
              {errors.password?.message ||
                errors.confirmation?.message ||
                errors.oldPassword?.message ||
                errPasswordMessage ||
                errMessage}
            </div>
          ) : (
            ""
          )}
          <button
            type="submit"
            disabled={!isValid}
            className={style.form__button}
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}
