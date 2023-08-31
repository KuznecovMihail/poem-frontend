import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NewsCard from "../../../common/newsCard/NewsCard";
import style from "./style.module.css";
import { useGetNews } from "../../../../hooks/useNews";
import Spinner from "../../../common/spinner/Spinner";
import { useGetDictionaryForNews } from "../../../../hooks/useDictionaries";
import moment from "moment";

export default function News() {
  const { data: dict } = useGetDictionaryForNews();
  const currentDate = moment(); // Получение текущей даты
  const oneYearAgo = currentDate.subtract(1, "year"); // Вычитание одного года

  const dateCreationFrom = oneYearAgo.format("YYYY-MM-DD");
  const dateCreationTo = moment()
    .format("YYYY-MM-DD HH:mm")
    .replace(":", "%3A");

  const perPage = 3;
  const statusId = dict?.find((obj) => obj.valueName === "Опубликована")?.id;

  const queryParams = {
    statusId: 25,
    page: 0,
    size: perPage,
    // sort: "datePublication,ASC",
  };

  const parametrsCode = {
    dateFrom: dateCreationFrom,
    dateTo: dateCreationTo,
  };

  const { news, isLoading, isError, fetchData } = useGetNews(
    queryParams,
    parametrsCode,
    true
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [statusId]);

  if (isError) return <h1>Что-то пошло не так ...</h1>;

  if (isLoading) return <Spinner />;

  return (
    <div className={style.news}>
      <div className={style.news__header}>
        <h1 className={style.news__title}>Новости</h1>
        <Link to="/news">Все новости</Link>
      </div>
      <div className={style.news__cards}>
        {news.allNews.map((card) => (
          <NewsCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
