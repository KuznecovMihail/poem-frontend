import React from "react";
import { useGetInteraction } from "../../../../../hooks/useInteractions";
import ButtonClose from "../../../../common/buttonClose/ButtonClose";
import Spinner from "../../../../common/spinner/Spinner";
import Modal from "../../../../common/modal/Modal";
import Gift from "../gift/Gift";
import style from "./style.module.css";

export default function GiftView({ giftId, setGiftId }) {
  const { data, isLoading, error } = useGetInteraction(giftId);

  return (
    <Modal isModalOpen={giftId} setIsModalOpen={setGiftId}>
      <div className={style.giftView}>
        <div className={style.giftView__header}>
          <h3>Вам прислали подарок</h3>
          <ButtonClose onClick={() => setGiftId(null)} />
        </div>
        <hr />
        {error ? (
          <p>Не удалось получить данные</p>
        ) : isLoading ? (
          <Spinner />
        ) : (
          <Gift {...data} />
        )}
      </div>
    </Modal>
  );
}
