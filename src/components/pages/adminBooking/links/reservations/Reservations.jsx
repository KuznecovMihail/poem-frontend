import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DatePicker } from "antd";
import { instance } from "../../../../../api/api.config";
import { BASE_URL_RESERVATIONS } from "../../../../../hooks/config";
import Spinner from "../../../../common/spinner/Spinner";
import Modal from "../../../../common/modal/Modal";
import View from "./view/View";
import Item from "./item/Item";
import style from "./style.module.css";
import {deleteBooking} from "../../../../../hooks/useBooking";

const { RangePicker } = DatePicker;

export default function Reservations() {
  const [reservations, setReservations] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const deleteReservation = async (id) => {
    setIsLoading(true)
    try {
      await deleteBooking(id)
      setReservations(prev => ({
        ...prev,
        content:  prev.content.filter(reservation => reservation.id !== id)
      }))
    } catch (e) {
      console.error(e)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }
  const officeId = parseInt(useParams().id);

  const onChange = async (value) => {
    if (!value) return;
    const [startDate, endDate] = value;

    setIsLoading(true);
    setError(false);

    try {
      const response = await instance.get(
        `${BASE_URL_RESERVATIONS}/reservations/office/${officeId}`,
        {
          params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        }
      );
      setReservations(response.data);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState(undefined);

  return (
    <div className={style.reservation}>
      <div className={style.reservation__header}>
        <RangePicker onChange={onChange} />
      </div>

      <div className={style.reservation__body}>
        {error ? (
          <h4>Что-то пошло не так...</h4>
        ) : isLoading ? (
          <Spinner />
        ) : !reservations ? (
          <h4>Выберите период бронирования</h4>
        ) : reservations.content.length === 0 ? (
          <h4>Нет броней за этот период</h4>
        ) : (
          reservations.content.map((reservation) => (
            <Item
              key={reservation.id}
              reservation={reservation}
              setView={setView}
              setIsModalOpen={setIsModalOpen}
              deleteReservation={deleteReservation}
            />
          ))
        )}
      </div>

      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        {view ? <View setIsModalOpen={setIsModalOpen} view={view} /> : null}
      </Modal>
    </div>
  );
}
