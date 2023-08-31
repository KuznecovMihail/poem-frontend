import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import Spinner from "../../../common/spinner/Spinner";
import { useGetNewsById } from "../../../../hooks/useNews";
import { useParams } from "react-router";
import NewsUserName from "../newsUserName/NewsUserName";
import { Breadcrumb, ConfigProvider } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import CopyNews from "../../../common/copyNews/CopyNews";
import moment from "moment";
import NewsImage from "../newsImage/NewsImage";

export default function NewsUserItem(props) {
  const id = parseInt(useParams().id);

  const [newsId, setNewsId] = useState(false);

  useEffect(() => {
    if (!isNaN(id)) {
      setNewsId(id);
    } else {
      setNewsId(props.id);
    }
  }, [id, props.id]);

  const { news, isError, isLoading } = useGetNewsById(newsId);

  const urlNews = window.location.href;

  if (isError) return <h1>Что-то пошло не так ...</h1>;

  if (isLoading) return <Spinner />;

  const formattedDate = moment.utc(news.datePublication).format("DD.MM.YYYY");
  const datePublication = moment.utc(news.datePublication).format("YYYY-MM-DD");
  const nowDate = moment().format("YYYY-MM-DD");

  const formattedResponse = (
    <div
      className={style.news_use_item__content}
      dangerouslySetInnerHTML={{ __html: news.content }}
    />
  );

  return (
    <div className={style.news_use_item}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Roboto, sans-serif",
          },
        }}
      >
        <Breadcrumb
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              href: "/news",
              title: "Новости",
            },
            {
              title: news.title,
            },
          ]}
        />
      </ConfigProvider>
      <div className={style.news_use_item__header}>
        <h1 className={style.news_use_item__title}>{news.title}</h1>
        <div className={style.news_use_item__info}>
          <p className={style.news_use_item__date}>
            {`Дата публикации: ${
              news.datePublication !== "" ? formattedDate : "Дата не указана"
            }`}
          </p>
          <NewsUserName authorId={news.authorId} />
        </div>
      </div>
      <div className={style.news_user_item__footer}>
        <NewsImage imageUrl={news.picture} />
        {formattedResponse}
        <div
          className={`${
            moment(datePublication).isAfter(nowDate) ||
            datePublication === "Invalid date"
              ? style.close_url
              : ""
          }`}
        >
          <CopyNews url={urlNews} />
        </div>
      </div>
    </div>
  );
}
