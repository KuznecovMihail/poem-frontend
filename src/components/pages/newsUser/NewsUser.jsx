import { React, useEffect, useState } from "react";
import style from "./style.module.css";
import NewsCard from "../../common/newsCard/NewsCard";
import { Breadcrumb, Pagination } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import moment from "moment";
import { useGetNews } from "../../../hooks/useNews";
import Spinner from "../../common/spinner/Spinner";
import { useGetDictionaryForNews } from "../../../hooks/useDictionaries";

export default function NewsUser() {
  const [page, setPage] = useState(1);
  const { data: dict } = useGetDictionaryForNews();
  const [shouldFetch, setShouldFetch] = useState(true);
  const currentDate = moment(); // Получение текущей даты
  const oneYearAgo = currentDate.subtract(1, "year"); // Вычитание одного года

  const dateCreationFrom = oneYearAgo.format("YYYY-MM-DD");
  const dateCreationTo = moment()
    .format("YYYY-MM-DD HH:mm")
    .replace(":", "%3A");

  const perPage = 8;
  const statusId = dict?.find((obj) => obj.valueName === "Опубликована")?.id;

  const queryParams = {
    statusId: statusId,
    page: page - 1,
    size: perPage,
  };

  const parametrsCode = {
    dateFrom: dateCreationFrom,
    dateTo: dateCreationTo,
  };

  const { news, isLoading, isError, fetchData } = useGetNews(
    queryParams,
    parametrsCode,
    shouldFetch
  );

  useEffect(() => {
    setShouldFetch(false);
    fetchData();
    setShouldFetch(true);
    // eslint-disable-next-line
  }, [statusId, page, perPage]);

  if (isError) return <h1>Что-то пошло не так ...</h1>;

  if (!statusId) return <Spinner />;

  if (isLoading) return <Spinner />;

  return (
    <div className={style.news}>
      <Breadcrumb
        items={[
          {
            href: "/",
            title: <HomeOutlined />,
          },
          {
            title: "Новости",
          },
        ]}
      />
      <div className={style.news_user}>
        {news.allNews.map((item) => (
          <NewsCard key={item.id} {...item} />
        ))}
      </div>
      <div className={style.news_user_paginatino}>
        <Pagination
          hideOnSinglePage={true}
          defaultPageSize={perPage}
          current={page}
          onChange={(page) => setPage(page)}
          total={news.total}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
