import React, { useEffect } from "react";
import style from "./style.module.css";
import moment from "moment";
import Icon from "../../../common/icon/Icon";

export default function Booking(props) {
  const {
    booking,
    setOpenDeleteModal,
    setBookingModalOpen,
    setChosenBooking,
    page,
    state,
  } = props;
  useEffect(() => {
    if (state) {
      setChosenBooking(booking);
      setBookingModalOpen(true);
    }
  }, [booking, setChosenBooking, setBookingModalOpen, state]);
  function convertDate(date) {
    const dateParts = date.slice(0, 10);
    return moment(dateParts).format("DD.MM.YYYY");
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
    <tr>
      <td>
        {booking
          ? `${convertWorkSpace(booking.workspaceInfo.description)} ${
              booking.workspaceInfo.level
            } этаж`
          : null}
      </td>
      <td>{booking ? booking.officeAddress : null}</td>
      <td>
        {booking ? convertDate(booking.reservationInterval.startsAt) : null}
      </td>
      <td>
        {booking
          ? convertTime(
              booking.reservationInterval.startsAt,
              booking.reservationInterval.endsAt
            )
          : null}
      </td>
      <td className={style.buttons}>
        <div className={style.alignment}>
          {page === "my" ? (
            <>
              <Icon
                type="eye"
                onClick={() => {
                  setChosenBooking(booking);
                  setBookingModalOpen(true);
                }}
              />
              <Icon
                type="bin"
                onClick={() => {
                  setOpenDeleteModal(true);
                  setChosenBooking(booking);
                }}
              />
            </>
          ) : (
            <Icon
              type="eye"
              onClick={() => {
                setBookingModalOpen(true);
                setChosenBooking(booking);
              }}
            />
          )}
        </div>
      </td>
    </tr>
  );
}
