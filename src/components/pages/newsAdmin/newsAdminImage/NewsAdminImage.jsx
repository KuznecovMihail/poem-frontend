import React from "react";
import { useGetImage } from "../../../../hooks/useImages";
import style from "./style.module.css";

export default function NewsAdminImage(props) {
  const [image] = useGetImage(props.imageUrl);
  return (
    <div className={style.newsAdmin__input_preview}>
      <img
        className={style.newsAdmin__input_preview_img}
        src={props.image ? props.image : image}
        alt="preview"
      />
    </div>
  );
}
