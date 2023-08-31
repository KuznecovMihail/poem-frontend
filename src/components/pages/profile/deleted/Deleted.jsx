import React from "react";
import defaultAvatar from "../../../../img/defaultAvatar.jpg";
import style from "./style.module.css";

export default function Deleted() {
  return (
    <div className={style.deleted}>
      <div className={style.avatar}>
        <img src={defaultAvatar} alt="" />
      </div>
      <div className={style.body}>
        <h1>Страница удалена</h1>
        <h4>Информация недоступна</h4>
      </div>
    </div>
  );
}
