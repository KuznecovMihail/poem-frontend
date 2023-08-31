import React, {useMemo} from "react";
import {useEmployeeBooking, useGetBookingsByEmployeeId} from "../../../../../hooks/useBooking";
import style from "./style.module.css"
import Card from "../../../../common/card/Card";
import Spinner from "../../../../common/spinner/Spinner";
import BookingItem from "./bookingItem/BookingItem";
import {useGetImage} from "../../../../../hooks/useImages";
import {useParams} from "react-router-dom";

function OneEmployee() {
  const {id: userId} = useParams()
  const {user: {employeeInfo}, isError, isLoading} = useEmployeeBooking(userId)
  const [avatar] = useGetImage(employeeInfo?.imageUrl, true)
  const {
    bookings,
    isError: isErrorGetBookings,
    isLoading: isLoadingGetBookings,
    trigger
  } = useGetBookingsByEmployeeId(userId)

  const result = useMemo(() => {
    if (isLoadingGetBookings) return <Spinner/>
    if (isErrorGetBookings) return <h4>{isErrorGetBookings}</h4>
    return bookings.map((booking, i) => (
      <BookingItem
        booking={booking}
        key={i}
        trigger={trigger}
      />
    ))
  }, [bookings, isErrorGetBookings, isLoadingGetBookings, trigger])

  if (isLoading) return <Spinner/>
  if (isError) return <div><h2>Что-то пошло не так</h2></div>



  return (
    <div className={style.content}>

      <Card className={style.user_info}>
        <h3>Бронирования пользователя</h3>

        <img src={avatar} alt="" className={style.avatar}/>
        <h4
          style={{color: "#FF7332"}}>{employeeInfo?.lastName} {employeeInfo?.firstName} {employeeInfo?.middleName}</h4>
        <h4>{employeeInfo?.email}</h4>
        <h4>{employeeInfo?.position}</h4>
      </Card>
      <div className={style.booking_list}>
        {result}
      </div>
    </div>
  );
}

export default OneEmployee;
