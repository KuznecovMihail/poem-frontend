import React, { useContext } from "react";
import logo from "../../../../img/logo.png";
import Search from "../search/Search.jsx";
import { Link } from "react-router-dom";
import HeaderButton from "../headerButton/HeaderButton";
import style from "./syle.module.css";
import { UserOutlined } from "@ant-design/icons";
import { CloseBurger } from "../../../../context/context";

export default function HeaderNav(props) {
  const { setCloseBurger } = useContext(CloseBurger);

  return (
    <div className={style.header__top}>
      <div className={`${style.header__container} container`}>
        <Link tabIndex={1} to="/">
          <img src={logo} alt="logo" className={style.header__logo} />
        </Link>
        <Search />
        <Link
          to={`/user/${props.employeeInfo.id}`}
          className={style.name}
          onClick={() => setCloseBurger(true)}
        >
          <UserOutlined />
          <span className={style.lastName}>{props.employeeInfo.lastName} </span>
          <span>{props.employeeInfo.firstName.slice(0, 1) + "."} </span>
          <span>{props.employeeInfo.middleName.slice(0, 1) + "."}</span>
        </Link>
        <HeaderButton employeeInfo={props.employeeInfo} role={props.role} />
      </div>
    </div>
  );
}
