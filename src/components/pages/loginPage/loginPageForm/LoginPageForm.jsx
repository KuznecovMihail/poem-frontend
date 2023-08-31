import React from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import loginImg from "../../../../img/login.svg";
import passwordImg from "../../../../img/password.svg";
import { useLogin } from "../../../../hooks/useAuthorization";
import Spinner from "../../../common/spinner/Spinner";

export default function LoginPageForm() {
  const { login, isLoading, errMessage } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    await login(data);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className={style.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.form__flex}>
          <label htmlFor="username" className={`${style.form__label}`}>
            Логин
            <img src={loginImg} alt="login" className={style.login_img} />
            <input
              name="username"
              className={`${errors.login ? style.error : ""} ${
                style.form__input
              } ${style.username}`}
              {...register("login", {
                required: {
                  value: true,
                  message: "Поле логин обязательно для заполнения",
                },
              })}
            />
          </label>
          <label
            htmlFor="pass"
            className={`${style.form__label} ${style.form__label_pass}`}
          >
            Пароль
            <img src={passwordImg} alt="login" className={style.password_img} />
            <input
              name="pass"
              type="password"
              className={`${errors.password ? style.error : ""} ${
                style.form__input
              } ${style.password}`}
              {...register("password", {
                required: {
                  value: true,
                  message: "Поле пароль обязательно для заполнения",
                },
              })}
            />
          </label>
          {errors.password || errors.login || errMessage !== undefined ? (
            <div className={style.form__error}>
              {errors.password?.message || errors.login?.message || errMessage}
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
