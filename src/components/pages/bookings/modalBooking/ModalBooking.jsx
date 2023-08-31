import React from "react";
import style from "./style.module.css";
import ButtonClose from "../../../common/buttonClose/ButtonClose";
import moment from "moment";

export default function ModalBooking(props) {
  const { booking, setIsModalOpen, setChosenBooking } = props;
  const idBooking = booking ? `${booking.id}` : "";
  const workSpaceInfo = booking ? `${booking.workspaceInfo.description}` : "";
  const office = booking ? `${booking.cityName}, ${booking.officeAddress}` : "";
  function convertDate(date) {
    const dateParts = date.slice(0, 10);
    return moment(dateParts).format("DD MMM YYYY");
  }
  function convertTime(start, end) {
    const timeStart = moment(start).format("HH:mm");
    const timeEnd = moment(end).format("HH:mm");
    return `с ${timeStart} до ${timeEnd}`;
  }
  function convertWorkSpace(workSpace) {
    const place = workSpace.split(" ", 3);
    let newPlace;
    if (place.length === 3) {
      newPlace = place[0] + " " + place[1] + " " + place[2];
    } else {
      newPlace = place[0] + " " + place[1];
    }

    return newPlace;
  }
  return (
    <>
      <div className={style.header}>
        <ButtonClose
          onClick={() => {
            setIsModalOpen(false);
            setChosenBooking(null);
          }}
        />
      </div>
      <div className={style.content}>
        <p>
          <b>Бронирование №:</b> {idBooking}
        </p>
        <p>
          <b>Бронирующий: </b>
          {booking
            ? `${booking.holderInfo.lastName} ${booking.holderInfo.firstName} ${booking.holderInfo.middleName}`
            : ""}
        </p>
        <p>
          <b>Описание рабочего места:</b> {workSpaceInfo}{" "}
          <img src={booking ? booking.workspaceInfo.photos : ""} alt="" />
        </p>
        <p>
          <b>Место:</b>
          {booking
            ? `${convertWorkSpace(booking.workspaceInfo.description)} ${
                booking.workspaceInfo.level
              } этаж`
            : ""}
        </p>
        <p>
          <b>Офис:</b> {office}
        </p>
        <p>
          <b>Дата:</b>{" "}
          {booking ? convertDate(booking.reservationInterval.startsAt) : ""}
        </p>
        <p>
          <b>Время:</b>{" "}
          {booking
            ? convertTime(
                booking.reservationInterval.startsAt,
                booking.reservationInterval.endsAt
              )
            : ""}
        </p>
        {/* {fieldsToRender} */}
      </div>
    </>
  );
}
