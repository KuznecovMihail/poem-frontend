import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import Modal from "../../../common/modal/Modal";
import NewsUserItem from "../../newsUser/newsUserItem/NewsUserItem";
import Icon from "../../../common/icon/Icon";
import { useNavigate } from "react-router";
import { ConfigProvider, Popconfirm } from "antd";
import { useEditStatusNews } from "../../../../hooks/useNews";
import moment from "moment";
import "moment/locale/ru";
import ButtonClose from "../../../common/buttonClose/ButtonClose";

export default function NewsItem(props) {
  const [isModalPrevOpen, setIsModalPrevOpen] = useState(false);
  const [isModalBinOpen, setIsModalBinOpen] = useState(false);
  const { editStatusNews } = useEditStatusNews(props.id);
  const navigate = useNavigate();

  useEffect(() => {
    moment.locale("ru"); // Устанавливаем русскую локаль
  }, []);

  const statusName = props.dict?.find(
    (obj) => obj.id === props.statusId
  )?.valueName;
  const statusId = props.dict?.find((obj) => obj.valueName === "В архиве")?.id;

  const handleClick = async () => {
    await editStatusNews({ statusId: statusId });
    props.fetchData();
  };

  const datePublication =
    props.datePublication !== ""
      ? moment(props.datePublication, "YYYY-MM-DD HH:mm:ss.SSS Z").format(
          "DD.MM.YYYY"
        )
      : "";
  const dateCreation = moment(
    props.dateCreation,
    "YYYY-MM-DD HH:mm:ss.SSS Z"
  ).format("DD.MM.YYYY");

  return (
    <div className={style.newsList__list}>
      <div className={`${style.newsList__item} ${style.title}`}>
        {props.title}
      </div>
      <div className={style.newsList__item}>{datePublication}</div>
      <div className={style.newsList__item}>{dateCreation}</div>
      <div className={style.newsList__item}>{statusName}</div>
      <div className={style.newsList__item_img}>
        <Icon
          className={style.icon_news}
          type="eye"
          onClick={() => setIsModalPrevOpen(!isModalPrevOpen)}
        />
        <Modal
          isModalOpen={isModalPrevOpen}
          setIsModalOpen={setIsModalPrevOpen}
        >
          <div className={style.modal}>
            <div className={style.button_close}>
              <ButtonClose onClick={() => setIsModalPrevOpen(false)} />
            </div>
            <NewsUserItem id={props.id} shouldFetch={false} />
          </div>
        </Modal>
        <Icon
          className={style.icon_news}
          onClick={() => navigate(`/admin/${props.id}`)}
        />
        {statusName !== "В архиве" ? (
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#ff7a45",
                fontFamily: "Roboto, sans-serif",
                colorBgContainer: "#d9d9d9",
              },
            }}
          >
            <Popconfirm
              title="Подтвердите действие"
              description="Перенести данную новость в архив?"
              okText="Подтвердить"
              cancelText="Отменить"
              onConfirm={handleClick}
            >
              <Icon
                className={style.icon_news}
                type="bin"
                onClick={() => setIsModalBinOpen(!isModalBinOpen)}
              />
            </Popconfirm>
          </ConfigProvider>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
