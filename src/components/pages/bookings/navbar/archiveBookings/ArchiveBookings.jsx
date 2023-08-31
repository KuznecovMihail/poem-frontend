import React, { useContext } from "react";
import style from "./style.module.css";
import Booking from "../../booking/Booking";
import moment from "moment";
import { Context } from "../../../../../context/context";
import { useGetUsersBookings } from "../../../../../hooks/useBooking";
import Modal from "../../../../common/modal/Modal";
import ModalBooking from "../../modalBooking/ModalBooking";
export default function ArchiveBookings(props) {
  const {
    page,
    bookingModalOpen,
    chosenBooking,
    setBookingModalOpen,
    setChosenBooking,
    setOpenDeleteModal,
  } = props;
  const { employeeId } = useContext(Context);
  const [bookings] = useGetUsersBookings(employeeId, page);
  var now = new Date();
  function convertDate(date) {
    const dateParts = moment(date).format("YYYY.MM.DD HH.mm");
    return dateParts;
  }
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
                moment(now).format("YYYY.MM.DD HH.mm") >
                  convertDate(booking.reservationInterval.startsAt) ? (
                  <Booking
                    key={booking.id}
                    booking={booking}
                    page={page}
                    setBookingModalOpen={setBookingModalOpen}
                    bookingModalOpen={bookingModalOpen}
                    setChosenBooking={setChosenBooking}
                    setOpenDeleteModal={setOpenDeleteModal}
                  />
                ) : undefined
              )
            : null}
        </tbody>
      </table>
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
