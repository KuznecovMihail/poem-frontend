import React from "react";
import style from "./style.module.css";
import { useGetImage } from "../../../../hooks/useImages";

export default function NewsImage(props) {
  const [image] = useGetImage(props.imageUrl);
  return (
    <div className={style.news_use_item__container_image}>
      <img className={style.news_use_item__image} src={image} alt="cat" />
    </div>
  );
}
