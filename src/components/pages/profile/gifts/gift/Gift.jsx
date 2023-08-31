import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useGetImage } from "../../../../../hooks/useImages";
import style from "./style.module.css";

export default function Gift({ senderObject, imageLink, creationDate, text }) {
  const [giftImg] = useGetImage(imageLink);
  const [senderImg] = useGetImage(senderObject.imageUrl, true);

  return (
    <>
      <Link to={`/user/${senderObject.id}`} className={style.gift__header}>
        <div className={style.person__avatar__box}>
          <img src={senderImg} alt="" />
        </div>
        <div>
          <p className={style.marked}>
            {[
              senderObject.lastName,
              senderObject.firstName,
              senderObject.middleName,
            ].join(" ")}
          </p>
          <p>{moment(creationDate).format("D MMMM Y HH:mm")}</p>
        </div>
      </Link>
      <div className={style.gift__body}>
        <div className={style.gift__box}>
          <img src={giftImg} alt="" />
        </div>
      </div>
      <div className={style.gift__textBox}>
        <p>{text}</p>
      </div>
    </>
  );
}
