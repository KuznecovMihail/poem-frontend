import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import { useLogout } from "../../../../hooks/useAuthorization";
import { useGetImage } from "../../../../hooks/useImages";
import { CloseBurger } from "../../../../context/context";

export default function Burger({ employeeInfo }) {
  const { closeBurger, setCloseBurger } = useContext(CloseBurger);
  const { logout, isError, isLogout } = useLogout();
  const navigate = useNavigate();

  const buttonLogout = async () => {
    await logout();
    if (isLogout) navigate("/login");
  };

  const [image] = useGetImage(employeeInfo.imageUrl, true);

  if (isError) return <h1>Что-то пошло не так ...</h1>;

  return (
    <div className={style.burger}>
      <div className={style.header__burger}>
        <div
          className={`${style.header__burger_content} ${
            closeBurger ? style.close : ""
          }`}
        >
          <div className={style.header__profile}>
            <div
              tabIndex={`${closeBurger ? -1 : 9}`}
              className={style.nav_icon2}
              onKeyUp={(e) => (e.code === "Enter" ? setCloseBurger(true) : "")}
              onClick={() => setCloseBurger(true)}
            >
              <span></span>
              <span></span>
            </div>
            <Link
              to={`/user/${employeeInfo.id}`}
              onClick={() => setCloseBurger(true)}
              className={style.link}
            >
              <div className={style.profile__top}>
                <div className={style.profile__name}>
                  <p
                    className={`${style.profile__sec_name} ${style.profile__name}`}
                  >
                    {employeeInfo.lastName}
                  </p>
                  <p
                    className={`${style.profile__fir_name} ${style.profile__name}`}
                  >
                    {employeeInfo.firstName}
                  </p>
                  <p
                    className={`${style.profile__th_name} ${style.profile__name}`}
                  >
                    {employeeInfo.middleName}
                  </p>
                </div>
                <div className={style.image_container}>
                  <img
                    src={image}
                    alt="avatar"
                    className={style.profile__avatar}
                  />
                </div>
              </div>
            </Link>
          </div>
          <nav className={style.header__nav}>
            <Link
              onClick={() => setCloseBurger(true)}
              tabIndex={`${closeBurger ? -1 : 11}`}
              to="/welcome"
            >
              Добро пожаловать!
            </Link>
            <Link
              onClick={() => setCloseBurger(true)}
              tabIndex={`${closeBurger ? -1 : 14}`}
              to="/applications"
            >
              Мои заявки
            </Link>
            <Link
              onClick={() => setCloseBurger(true)}
              tabIndex={`${closeBurger ? -1 : 16}`}
              to="/bookings"
            >
              Мои бронирования
            </Link>
          </nav>
          <div className={style.header__footer}>
            <div className={style.header__support}>
              <p className={style.support}>Тех. поддержка:</p>
              <Link
                className={style.number}
                tabIndex={`${closeBurger ? -1 : 17}`}
                to="callto:+78005553535"
              >
                8-800-555-35-35
              </Link>
            </div>
            <div
              onClick={() => {
                setCloseBurger(true);
                buttonLogout();
              }}
              className={style.logout}
              tabIndex={`${closeBurger ? -1 : 18}`}
            >
              Выход
            </div>
          </div>
        </div>
      </div>
      <div
        tabIndex={4}
        id={style.nav_icon1}
        onKeyUp={(e) => (e.code === "Enter" ? setCloseBurger(false) : "")}
        onClick={() => setCloseBurger(false)}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
