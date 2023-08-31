import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import { UserOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export default function HeaderButton(props) {
  return (
    <div className={style.header__button}>
      <Link to={`/user/${props.employeeInfo.id}`} className={style.name}>
        <UserOutlined />
        <span className={style.lastName}>{props.employeeInfo.lastName} </span>
        <span>{props.employeeInfo.firstName.slice(0, 1) + "."} </span>
        <span>{props.employeeInfo.middleName.slice(0, 1) + "."}</span>
      </Link>
      <Link className={style.header__link} to="/">
        <Tooltip placement="bottom" title="Кабинет пользователя">
          <UserSwitchOutlined style={{ fontSize: "36px" }} />
        </Tooltip>
      </Link>
    </div>
  );
}
