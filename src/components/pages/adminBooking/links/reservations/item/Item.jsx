import React from "react";
import moment from "moment";
import Card from "../../../../../common/card/Card";
import Icon from "../../../../../common/icon/Icon";
import style from "./style.module.css";
import {Popconfirm} from "antd";

const workSpaceType = {
  1: "Рабочее место",
  2: "Переговорка",
};

export default function Item({reservation, setView, setIsModalOpen, deleteReservation}) {
  const {id, cityName, officeAddress, workspaceInfo, reservationInterval} =
    reservation;

  return (
    <div className={style.item__background}>
      <Card>
        <div className={style.item}>
          <div className={style.item__group}>
            <h4 className={style.marked}>
              {workSpaceType[workspaceInfo.type.id]}
            </h4>
            <h4>
              {[
                "c",
                moment(reservationInterval.startsAt).format("hh:mm DD.MM.YYYY"),
              ].join(" ")}
            </h4>
            <h4>
              {[
                "до",
                moment(reservationInterval.endsAt).format("hh:mm DD.MM.YYYY"),
              ].join(" ")}
            </h4>
          </div>
          <div className={style.item__group}>
            <h4>{cityName}</h4>
            <h4>{officeAddress}</h4>
          </div>
          <div className={style.item__group}>
            <h4>Бронь №{id}</h4>
            <h4>{workspaceInfo.level} этаж</h4>
          </div>
          <div className={`${style.item__group} ${style.icons}`}>
            <Popconfirm
              title="Удалить бронь"
              onConfirm={() => {
                deleteReservation(reservation.id)
              }}
              description="Вы уверены?"
              okText="Да"
              cancelText="Нет"
            >
              <Icon type="bin"/>
            </Popconfirm>
            <Icon
              type="eye"
              onClick={() => {
                setView(reservation);
                setIsModalOpen(true);
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
