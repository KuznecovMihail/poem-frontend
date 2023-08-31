import React from "react";
import style from "./style.module.css";

function ButtonGradientCustom({ onClick, children, disabled}) {
  return (
    <button className={style.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default ButtonGradientCustom;
