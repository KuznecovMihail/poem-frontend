import React, {useState} from "react";
import Card from "../../../../../common/card/Card";
import style from "./style.module.css"
import {toStringDate, toNumberDate} from "./helpers/dateConverter";
import Modal from "../../../../../common/modal/Modal";
import {Popconfirm} from "antd";
import Icon from "../../../../../common/icon/Icon";
import View from "../../../links/reservations/view/View";
import {deleteBooking} from "../../../../../../hooks/useBooking";

function BookingItem({booking, trigger}) {
  const {workspaceInfo, reservationInterval} = booking
  const [isModalOpen, setIsModalOpen] = useState(false)
  const startTime = toNumberDate(reservationInterval.startsAt)
  const date = toStringDate(reservationInterval.endsAt)
  const endTime = toNumberDate(reservationInterval.endsAt)
  return (
    <Card className={style.content}>
      <div className={style.content_item}>
        <h4 className={style.workspace_type}>{workspaceInfo.type.type}</h4>
        <h4>c {startTime} до {endTime}</h4>
        <h4>{date}</h4>
      </div>
      <div className={style.content_item}>
        <h4>{booking.cityName}</h4>
        <h4>{booking.officeAddress}</h4>
      </div>
      <div className={style.content_item}>
        <h4>Бронь №{booking.id}</h4>
        <h4>Этаж {workspaceInfo.level}</h4>
      </div>
      <div className={style.content_item}>
        <Popconfirm
          title="Удалить бронь"
          onConfirm={() => {
            deleteBooking(booking.id, trigger)
          }}
          description="Вы уверены?"
          okText="Да"
          cancelText="Нет"
        >
          <Icon type="bin"/>
        </Popconfirm>
        <Icon type='eye'  onClick={() => setIsModalOpen(true)}/>
      </div>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        {isModalOpen && <View setIsModalOpen={setIsModalOpen} view={booking}/>}
      </Modal>
    </Card>
  );
}

export default BookingItem;
