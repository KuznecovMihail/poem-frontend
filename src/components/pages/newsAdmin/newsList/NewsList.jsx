import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import NewsItem from "../newsItem/NewsItem";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import moment from "moment";
import InputDate from "../../../common/inputDate/InputDate";
import { useGetNews } from "../../../../hooks/useNews";
import Spinner from "../../../common/spinner/Spinner";
import { useGetDictionaryForNews } from "../../../../hooks/useDictionaries";
import CheckBox from "../../../common/checkbox/CheckBox";

export default function NewsList() {
  const currentDate = moment();
  const oneYearAgo = currentDate.subtract(1, "year");

  const [openFilter, setOpenFilter] = useState(false);
  const [openDateFilter, setOpenDateFilter] = useState(false);
  const [dateCreationFrom, setDateCreationFrom] = useState(
    oneYearAgo.format("YYYY-MM-DD")
  );
  const [dateCreationTo, setDateCreationTo] = useState(
    moment().format("YYYY-MM-DD HH:mm").replace(":", "%3A")
  );
  const [dateCreationToValue, setDateCreationToValue] = useState(null);
  const [title, setTitle] = useState(null);
  const [page, setPage] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [statusPublication, setStatusPublication] = useState(false);
  const [statusDraft, setStatusDraft] = useState(false);
  const [sort, setSort] = useState("dateCreation,DESC");
  const [checked, setChecked] = useState(false);
  const [disableDateTo, setDisableDateTo] = useState(true);

  const { data: dict } = useGetDictionaryForNews();

  const onChangeFrom = (data, dateString) => {
    setDateCreationFrom(moment(dateString, "DD.MM.YYYY").format("YYYY-MM-DD"));
  };
  const onChangeTo = (data, dateString) => {
    const newDateCreationTo = moment(dateString, "DD.MM.YYYY").format(
      "YYYY-MM-DD"
    );
    if (newDateCreationTo > dateCreationFrom) {
      setDateCreationTo(
        moment(dateString, "DD.MM.YYYY").format("YYYY-MM-DD 23:59")
      );
      setDateCreationToValue(data);
    }
  };

  useEffect(() => {
    if (dateCreationFrom !== oneYearAgo.format("YYYY-MM-DD")) {
      setDisableDateTo(false);
    }
    if (dateCreationFrom === "Invalid date") {
      setDisableDateTo(true);
      setDateCreationTo(null);
    }
  }, [
    dateCreationTo,
    dateCreationFrom,
    setDisableDateTo,
    setDateCreationTo,
    oneYearAgo,
  ]);

  const perPage = 20;
  let status = [];

  const parametrs = {
    statusId: status,
    size: perPage,
    page: page - 1,
    sort: sort,
  };

  const parametrsCode = {
    title: title,
    dateCreationFrom: dateCreationFrom,
    dateCreationTo: dateCreationTo,
    statusId1: null,
    statusId2: null,
  };

  const { news, isLoading, isError, fetchData } = useGetNews(
    parametrs,
    parametrsCode,
    shouldFetch
  );

  if (isError) return <h1>Что-то пошло не так ...</h1>;

  if (isLoading) return <Spinner />;

  const statusPub = dict?.find((obj) => obj.valueName === "Опубликована")?.id;
  const statusDra = dict?.find((obj) => obj.valueName === "Черновик")?.id;

  const handleClick = () => {
    if (dateCreationFrom !== null && dateCreationTo === null) return;
    parametrs.page = 0;
    setPage(parametrs.page + 1);
    if (statusPublication) parametrsCode.statusId1 = statusPub;
    if (statusDraft) parametrsCode.statusId2 = statusDra;
    parametrs.statusId = status;
    setShouldFetch(false);
    fetchData();
    setShouldFetch(true);
    setOpenFilter(false);
    setOpenDateFilter(false);
    setDateCreationToValue(null);
  };

  return (
    <div className={style.newsList}>
      <div className={style.news_list__list}>
        <div className={style.news_admin_filters__form}>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className={style.news_admin_filters__search}
            placeholder="Поиск по теме"
            type="text"
          />
          <button
            onClick={() => handleClick()}
            className={style.news_admin_filters__button}
          >
            Найти
          </button>
        </div>
        <div className={style.newsList__titles}>
          <div className={style.newsList__item_title}>Тема</div>
          <div className={style.newsList__item_title}>Дата публикации</div>
          <div className={style.news_admin_filters__drop_down}>
            <span
              onClick={() => setOpenDateFilter(!openDateFilter)}
              className={style.news_admin_filters__drop_down__title}
            >
              <span className={style.title}>Дата создания</span>
              {openDateFilter ? <CaretDownOutlined /> : <CaretUpOutlined />}
            </span>
            <ul
              className={`${
                openDateFilter ? "" : style.dropdown_list__disable
              } ${style.dropdown_list}`}
            >
              <li className={style.dropdown_item}>
                <div className={style.date_filter}>
                  <CheckBox
                    onChange={() => {
                      setChecked(!checked);
                      if (!checked) {
                        setSort("dateCreation,ASC");
                      } else setSort("dateCreation,DESC");
                    }}
                    checked={checked}
                  >
                    По возростанию
                  </CheckBox>
                </div>
              </li>
              <li className={style.dropdown_item}>
                <div className={style.date_filter}>
                  <InputDate onChange={onChangeFrom} placeholder={"От"} />
                </div>
              </li>
              <li className={style.dropdown_item}>
                <div className={style.date_filter}>
                  <InputDate
                    onChange={onChangeTo}
                    placeholder={"До"}
                    disabled={disableDateTo}
                    value={dateCreationToValue}
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className={style.news_admin_filters__drop_down}>
            <span
              onClick={() => setOpenFilter(!openFilter)}
              className={style.news_admin_filters__drop_down__title}
            >
              <span className={style.title}>Статус</span>
              {openFilter ? <CaretDownOutlined /> : <CaretUpOutlined />}
            </span>
            <ul
              className={`${openFilter ? "" : style.dropdown_list__disable} ${
                style.dropdown_list
              }`}
            >
              <li className={style.dropdown_item}>
                <CheckBox
                  onChange={() => setStatusPublication(!statusPublication)}
                  checked={statusPublication}
                >
                  Опубликована
                </CheckBox>
              </li>
              <li className={style.dropdown_item}>
                <CheckBox
                  onChange={() => setStatusDraft(!statusDraft)}
                  checked={statusDraft}
                >
                  Черновик
                </CheckBox>
              </li>
            </ul>
          </div>
          <div className={style.newsList__item_title}>Действия</div>
        </div>
        {news.allNews.map((item) => (
          <NewsItem key={item.id} {...item} dict={dict} fetchData={fetchData} />
        ))}
      </div>
      <div className={style.news_admin_paginatino}>
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
