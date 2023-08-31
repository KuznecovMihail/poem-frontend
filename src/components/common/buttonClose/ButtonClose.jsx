import React from "react";
import style from "./style.module.css";

export default function ButtonClose({ onClick, color }) {
  return (
    <div className={style.buttonClose} onClick={onClick}>
      <span style={{ background: color }}></span>
      <span style={{ background: color }}></span>
    </div>
  );
}
