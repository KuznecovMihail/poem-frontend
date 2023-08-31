import { useMemo, useRef, useState, React, useEffect, useContext } from "react";
import style from "./style.module.css";
import { ConfigProvider, Select, Spin } from "antd";
import debounce from "lodash/debounce";
import Booking from "../../booking/Booking";
import { BASE_URL_PROFILE } from "../../../../../hooks/config";
import moment from "moment";
import { Context } from "../../../../../context/context";
import { useGetUsersBookings } from "../../../../../hooks/useBooking";
import Modal from "../../../../common/modal/Modal";
import ModalBooking from "../../modalBooking/ModalBooking";
export default function ColleaguesBookings(props) {
  const {
    page,
    state,
    bookingModalOpen,
    setBookingModalOpen,
    setChosenBooking,
    setOpenDeleteModal,
    chosenBooking,
  } = props;
  const [value, setValue] = useState([]);
  const { employeeId } = useContext(Context);
  const [bookings] = useGetUsersBookings(value.value, page);
  function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
      const loadOptions = (value) => {
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setOptions([]);
        setFetching(true);
        fetchOptions(value).then((newOptions) => {
          if (fetchId !== fetchRef.current) {
            return;
          }
          setOptions(newOptions);
          setFetching(false);
        });
      };
      return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
      <Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
      />
    );
  }
  async function fetchUserList(username) {
    console.log("fetching user", username);
    return fetch(`
    ${BASE_URL_PROFILE}/profiles/search?searchText=${username}`)
      .then((response) => response.json())
      .then((body) =>
        body.searchInfo.map((user) => ({
          label: `${user.employeeSearchInfo.lastName} ${user.employeeSearchInfo.firstName} ${user.employeeSearchInfo.middleName}`,
          value: user.employeeSearchInfo.id,
        }))
      );
  }
  useEffect((e) => e, []);
  let bookingData = [];
  var now = new Date();
  function convertDate(date) {
    const dateParts = moment(date).format("YYYY.MM.DD HH.mm");
    return dateParts;
  }
  return (
    <div className={style.bookings__list}>
      <div className={style.menu__form}>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: "#d9d9d9",
              colorBgBase: "#fff",
              colorPrimaryHover: "none",
              colorPrimaryBg: "grey",
              borderRadius: "20px",
              colorPrimary: "#ff7a45",
              fontFamily: "Roboto, sans-serif",
            },
          }}
        >
          <DebounceSelect
            className={style.formaa}
            showSearch
            value={value}
            placeholder="Выберите коллегу"
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            style={{
              width: "26.5%",
            }}
          />
        </ConfigProvider>
      </div>

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
            ? bookings.map(
                (booking) => (
                  // eslint-disable-next-line
                  bookingData.push(booking),
                  value.value === booking.holderInfo.id &&
                  booking.holderInfo.id !== employeeId &&
                  convertDate(booking.reservationInterval.startsAt) >
                    moment(now).format("YYYY.MM.DD HH.mm") ? (
                    <Booking
                      key={booking.id}
                      bookingData={bookingData}
                      state={state}
                      booking={booking}
                      page={page}
                      setBookingModalOpen={setBookingModalOpen}
                      bookingModalOpen={bookingModalOpen}
                      setChosenBooking={setChosenBooking}
                      setOpenDeleteModal={setOpenDeleteModal}
                    />
                  ) : null
                )
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
