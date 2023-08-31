import React, { useContext } from "react";
import style from "./style.module.css";
import Booking from "../../booking/Booking";
import moment from "moment";
import ModalDelete from "../../modalDelete/modalDelete";
import Modal from "../../../../common/modal/Modal";
import ModalBooking from "../../modalBooking/ModalBooking";
import {
  useGetUsersBookings,
} from "../../../../../hooks/useBooking";
import { Context } from "../../../../../context/context";

export default function MyBookings(props) {
  const {
    page,
    chosenBooking,
    bookingModalOpen,
    setBookingModalOpen,
    setChosenBooking,
    setOpenDeleteModal,
    openDeleteModal,
  } = props;
  const { employeeId } = useContext(Context);
  const [bookings, setBookings] = useGetUsersBookings(employeeId, page);

  var now = new Date();
  function convertDate(date) {
    const dateParts = moment(date).format("YYYY.MM.DD HH.mm");
    return dateParts;
  }
  let bookingData = [];

  return (
    <div className={style.bookings__list}>
      <table>
        <thead>
          <tr>
            <th>Место</th>
            <th>Офис</th>
            <th>Дата</th>
            <th>Время</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {bookings
            ? bookings.map((booking) =>
                booking.holderInfo.id === employeeId &&
                convertDate(booking.reservationInterval.startsAt) >
                  moment(now).format("YYYY.MM.DD HH.mm")
                  ? (bookingData.push(booking),
                    (
                      <Booking
                        key={booking.id}
                        booking={booking}
                        page={page}
                        setBookingModalOpen={setBookingModalOpen}
                        bookingModalOpen={bookingModalOpen}
                        setChosenBooking={setChosenBooking}
                        setOpenDeleteModal={setOpenDeleteModal}
                      />
                    ))
                  : null
              )
            : null}
        </tbody>
      </table>
      <Modal isModalOpen={openDeleteModal} setIsModalOpen={setOpenDeleteModal}>
        <ModalDelete
          setOpenDeleteModal={setOpenDeleteModal}
          booking={chosenBooking}
          bookings={bookings}
          setBookings={setBookings}
          setChosenBooking={setChosenBooking}
        />
      </Modal>
      <Modal
        isModalOpen={bookingModalOpen}
        setIsModalOpen={setBookingModalOpen}
      >
        <ModalBooking
          setBookingModalOpen={setBookingModalOpen}
          bookingModalOpen={bookingModalOpen}
          setIsModalOpen={setBookingModalOpen}
          booking={chosenBooking}
          setChosenBooking={setChosenBooking}
        />
      </Modal>
    </div>
  );
}
