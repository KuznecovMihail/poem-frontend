import React, { useState } from "react";
import { useGetInteractions } from "../../../../hooks/useInteractions";
import { CARD_TYPE_ID, THANK_TYPE_ID } from "../constants";
import Card from "../../../common/card/Card";
import Spinner from "../../../common/spinner/Spinner";
import Modal from "../../../common/modal/Modal";
import GiftsList from "./giftsList/GiftsList";
import style from "./style.module.css";
import cardImg from "./../../../../img/gift.png";
import thankImg from "./../../../../img/thank.png";

const MAX_GIFTS_ICONS_AMOUNT = 5;

function* range(start, end) {
  yield start;
  if (start === end) return;
  yield* range(start + 1, end);
}

function ImageList({ imageUrl, length }) {
  return (
    <div className="row">
      {[...range(1, Math.min(length, MAX_GIFTS_ICONS_AMOUNT))].map((id) => (
        <img key={id} src={imageUrl} className={style.gifts__icon} alt="" />
      ))}
    </div>
  );
}

export default function GiftsCard({ id, isCurrentUserPage }) {
  const {
    data: thanks,
    isLoading: isThanksLoading,
    error: thanksError,
  } = useGetInteractions({
    receiverId: id,
    typeId: THANK_TYPE_ID,
  });

  const {
    data: cards,
    isLoading: isCardsLoading,
    error: cardsError,
  } = useGetInteractions({
    receiverId: id,
    typeId: CARD_TYPE_ID,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (thanksError || cardsError)
    return (
      <div className={style.gifts}>
        <Card>
          <h4>Подарки</h4>
          <hr />
          <p>Не удалось получить данные</p>
        </Card>
      </div>
    );

  if (isThanksLoading || isCardsLoading) return <Spinner />;

  if (cards.total + thanks.total === 0)
    return (
      <div className={style.gifts}>
        <Card>
          <h4>Подарки</h4>
          <hr />
          {isCurrentUserPage ? (
            <p>У вас пока нет подарков</p>
          ) : (
            <p>У пользователя нет подарков</p>
          )}
        </Card>
      </div>
    );

  return (
    <div className={style.gifts}>
      <Card onClick={() => setIsModalOpen(true)}>
        <h4>Подарки</h4>
        <hr />
        {thanks.total > 0 ? (
          <div className={style.gifts__row}>
            <p>Спасибки:</p>
            <ImageList imageUrl={thankImg} length={thanks.total} />
          </div>
        ) : null}
        {cards.total > 0 ? (
          <div className={style.gifts__row}>
            <p>Открытки:</p>
            <ImageList imageUrl={cardImg} length={cards.total} />
          </div>
        ) : null}
      </Card>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <GiftsList
          id={id}
          setIsModalOpen={setIsModalOpen}
          cardsTotal={cards.total}
          thanksTotal={thanks.total}
        />
      </Modal>
    </div>
  );
}
