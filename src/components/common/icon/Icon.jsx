import React from "react";
import binImg from "../../../img/delete.svg";
import penImg from "../../../img/edit.svg";
import eyeImg from "../../../img/eye.svg";
import plusImg from '../../../img/plus.svg'
import style from "./style.module.css";

const imageType = {
  bin: binImg,
  pen: penImg,
  eye: eyeImg,
  plus: plusImg,
};

export default function Icon({ onClick, className, type = "pen" }) {
  const classes = [style.icon, className].join(" ");
  return (
    <img src={imageType[type]} alt="" className={classes} onClick={onClick} />
  );
}
