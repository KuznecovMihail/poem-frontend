import React, { useContext, useEffect, useState } from "react";
import style from "./style.module.css";
import ButtonGradientCustom from "../../common/buttonGradient/ButtonGradientCustom";
import button_icon from "../../../img/pen_button.svg";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import { Context } from "../../../context/context";
import ColleaguesBookings from "./navbar/colleaguesBookings/ColleaguesBookings";
import GuestBookings from "./navbar/guestBookings/GuestBookings";
import MyBookings from "./navbar/myBookings/MyBookings";
import ArchiveBookings from "./navbar/archiveBookings/ArchiveBookings";
import Spinner from "../../common/spinner/Spinner";
import { useGetUsersBookings } from "../../../hooks/useBooking";

export default function Bookings() {
  const { employeeId } = useContext(Context);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [chosenBooking, setChosenBooking] = useState(null);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [bookings, setBookings, isError, isLoading] = useGetUsersBookings(
    employeeId,
    page
  );
  const { state } = useLocation();
  const isCurrentUserPage = employeeId;
  useEffect(() => setPage("my"), []);
  if (isError) return <h1>Что-то пошло не так...</h1>;

  if (isLoading) return <Spinner />;
  return (
    <div className={style.bookings_user}>
      <div className={style.bookings__header}>
        <h1 className={style.bookings__title}>Бронирования</h1>
        <Navbar
          page={page}
          setPage={setPage}
          isCurrentUserPage={isCurrentUserPage}
        />
        <Link to="/bookings/create">
          <ButtonGradientCustom>
            <img src={button_icon} alt="icon" />
            Создать бронирование
          </ButtonGradientCustom>
        </Link>
      </div>
      <div className={style.bookings__list}>
        {page === "my" ? (
          <>
            <MyBookings
              employeeId={employeeId}
              page={page}
              bookingModalOpen={bookingModalOpen}
              setBookingModalOpen={setBookingModalOpen}
              setChosenBooking={setChosenBooking}
              chosenBooking={chosenBooking}
              setOpenDeleteModal={setOpenDeleteModal}
              openDeleteModal={openDeleteModal}
            />
          </>
        ) : null}
        {page === "guests" ? (
          <GuestBookings
            page={page}
            bookingModalOpen={bookingModalOpen}
            setBookingModalOpen={setBookingModalOpen}
            setChosenBooking={setChosenBooking}
            chosenBooking={chosenBooking}
            setOpenDeleteModal={setOpenDeleteModal}
            openDeleteModal={openDeleteModal}
          />
        ) : null}
        {page === "archive" ? (
          <ArchiveBookings
            employeeId={employeeId}
            state={state}
            page={page}
            bookingModalOpen={bookingModalOpen}
            setBookingModalOpen={setBookingModalOpen}
            setChosenBooking={setChosenBooking}
            setOpenDeleteModal={setOpenDeleteModal}
          />
        ) : null}
        {page === "colleagues" ? (
          <ColleaguesBookings
            employeeId={employeeId}
            page={page}
            state={state}
            bookingModalOpen={bookingModalOpen}
            setBookingModalOpen={setBookingModalOpen}
            setChosenBooking={setChosenBooking}
            chosenBooking={chosenBooking}
            setOpenDeleteModal={setOpenDeleteModal}
            openDeleteModal={openDeleteModal}
          />
        ) : null}
      </div>
    </div>
  );
}
