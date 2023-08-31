import React from "react";
import style from "./style.module.css";

export default function Tooltip({ text, children }) {
  return (
    <div className={style.tooltip} text={text}>
      {children}
    </div>
  );
}
