import React from "react";
import style from "./style.module.css";
import ButtonClose from "../../../common/buttonClose/ButtonClose";
import ButtonGradientCustom from "../../../common/buttonGradient/ButtonGradientCustom";
import { useDeleteBookings } from "../../../../hooks/useBooking";

export default function ModalDelete(props) {
  const {
    setOpenDeleteModal,
    booking,
    bookings,
    setBookings,
    setChosenBooking,
  } = props;

  const [deleteBooking] = useDeleteBookings();

  if (!booking) return null;
  const bookingId = booking.id;
  const onClose = () => {
    setOpenDeleteModal(false);
    setChosenBooking(null);
  };

  const handleDelete = () => {
    deleteBooking(bookingId, bookings, setBookings, onClose);
  };
  return (
    <>
      <div className={style.header}>
        <ButtonClose onClick={onClose} />
      </div>
      <div className={style.content}>
        <div className={style.message}>
          <p>Вы действительно хотите отменить бронирование?</p>
        </div>
        <div className={style.action}>
          <ButtonGradientCustom onClick={handleDelete}>Да</ButtonGradientCustom>
          <button className={style.button_no} onClick={onClose}>
            Нет
          </button>
        </div>
      </div>
    </>
  );
}
