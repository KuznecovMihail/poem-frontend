import React from "react";
import style from "./style.module.css";
import Card from "../card/Card";
import { Link } from "react-router-dom";
import { useGetProfile } from "../../../hooks/useProfiles";
import Spinner from "../spinner/Spinner";
import moment from "moment";
import { useGetImage } from "../../../hooks/useImages";

export default function NewsCard(props) {
  const datePublication = moment
    .utc(props.datePublication)
    .format("DD.MM.YYYY");

  const { employee, isLoading, isError } = useGetProfile(props.authorId);
  const [image] = useGetImage(props.picture);

  if (isError) return <h1>Что-то пошло не так ...</h1>;

  if (isLoading) return <Spinner />;

  return (
    <div className={style.newsCard}>
      <Link className={style.newsCard__link} to={`/news/${props.id}`}>
        <Card className={style.newsCard_item}>
          <div className={style.card_container}>
            <div className={style.image_container}>
              <img src={image} alt="card_img" className={style.card__img} />
            </div>
            <h3 className={style.card__title}>{props.title}</h3>
            <div className={style.card_info}>
              <p className={style.card__date}>
                Опубликовано: {datePublication}
              </p>
              <p className={style.card__author}>
                Автор:
                <span> {employee.employeeInfo.lastName} </span>
                <span>
                  {employee.employeeInfo.firstName.slice(0, 1) + "."}{" "}
                </span>
                <span>
                  {employee.employeeInfo.middleName.slice(0, 1) + "."}
                </span>
              </p>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}
