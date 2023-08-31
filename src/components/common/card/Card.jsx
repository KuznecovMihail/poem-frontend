import React from "react";
import style from "./style.module.css";
import Spinner from "../spinner/Spinner";

export default function Card({ onClick, isActive, children, className, isLoading }) {
  let classes;
  if (onClick) {
    classes = [
      style.card,
      style.hoverable,
      isActive ? style.active : "",
      className,
    ].join(" ");

    return (
      <div className={classes} onClick={onClick}>
        {!isLoading ? children : <Spinner/>}
      </div>
    );
  }
  classes = [style.card, className].join(" ");
  return <div className={classes}>{!isLoading ? children : <Spinner/>}</div>;
}
