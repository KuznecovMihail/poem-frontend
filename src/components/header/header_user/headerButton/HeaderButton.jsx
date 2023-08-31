import React, { useContext } from "react";
import Burger from "../burger/Burger";
import Notice from "../notice/Notice";
import style from "./style.module.css";
import { Link } from "react-router-dom";
import { UserSwitchOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { CloseBurger } from "../../../../context/context";

export default function HeaderButton(props) {
  const { setCloseBurger } = useContext(CloseBurger);
  return (
    <div className={style.header__button}>
      {props.role ? (
        <Link
          className={style.header__link}
          to="/admin"
          onClick={() => setCloseBurger(true)}
        >
          <Tooltip placement="bottom" title="Кабинет администратора">
            <UserSwitchOutlined
              style={{ fontSize: "36px", color: "#ff7839" }}
            />
          </Tooltip>
        </Link>
      ) : (
        ""
      )}

      <Notice />
      <Burger employeeInfo={props.employeeInfo} />
    </div>
  );
}
