import React from "react";
import { useGetImage } from "../../../../../../hooks/useImages";
import style from "./style.module.css";

export default function Icon({ icon, onPick }) {
  const [image] = useGetImage(icon.imageLink);

  return (
    <div className={style.icon__box} onClick={() => onPick(icon)}>
      <img src={image} alt="" />
    </div>
  );
}
