import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import style from "./style.module.css";

const antIcon = (
  <LoadingOutlined style={{ fontSize: "48px", color: "#ff7332" }} spin />
);

export default function Spinner({ indicator = antIcon }) {
  return (
    <div className={style.spinner__box}>
      <Spin indicator={indicator} />
    </div>
  );
}
