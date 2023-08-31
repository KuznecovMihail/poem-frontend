import React from "react";
import { useGetImage } from "../../../../../../hooks/useImages";
import { Link } from "react-router-dom";
import style from "./style.module.css";

export default function Person({
  id,
  firstName,
  middleName,
  lastName,
  imageUrl,
  position,
}) {
  const [image] = useGetImage(imageUrl, true);

  return (
    <Link to={`/user/${id}`} className={style.person}>
      <div className={style.person__avatar__box}>
        <img src={image} alt="" />
      </div>
      <p className={style.marked}>
        {[lastName, firstName, middleName].join(" ")}
      </p>
      <p>{position}</p>
    </Link>
  );
}
