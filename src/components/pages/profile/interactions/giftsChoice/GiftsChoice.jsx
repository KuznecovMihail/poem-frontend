import React from "react";
import { useGetImagesForType } from "../../../../../hooks/useInteractions";
import { THANK_TYPE_ID, CARD_TYPE_ID } from "../../constants";
import ButtonClose from "../../../../common/buttonClose/ButtonClose";
import Spinner from "../../../../common/spinner/Spinner";
import IconsList from "./iconsList/IconsList";
import cardImg from "../../../../../img/gift.png";
import thankImg from "../../../../../img/thank.png";
import style from "./style.module.css";

export default function GiftsChoice({ onClose, onPick, fromHomePage }) {
  const {
    data: thanksImages,
    isLoading: isThanksImagesLoading,
    error: thanksImagesError,
  } = useGetImagesForType(THANK_TYPE_ID);

  const {
    data: cardsImages,
    isLoading: isCardsImagesLoading,
    error: cardsImagesError,
  } = useGetImagesForType(CARD_TYPE_ID);

  return (
    <div className={style.giftsChoice}>
      <div className={style.giftsChoice__header}>
        <h3>Выберите подарок</h3>
        <ButtonClose onClick={onClose} />
      </div>
      <hr />
      {fromHomePage ? (
        <>
          <div className={style.giftsChoice__title}>
            <img src={cardImg} alt="" />
            <h3>Открытка</h3>
          </div>
          {cardsImagesError ? (
            <p>Не удалось получить данные</p>
          ) : isCardsImagesLoading ? (
            <Spinner />
          ) : cardsImages.length !== 0 ? (
            <IconsList
              items={cardsImages}
              onPick={onPick}
              fromHomePage={fromHomePage}
            />
          ) : (
            <p>Нет доступных открыток</p>
          )}
        </>
      ) : (
        <>
          <div className={style.giftsChoice__title}>
            <img src={thankImg} alt="" />
            <h3>Спасибка</h3>
          </div>
          <div className={style.giftsChoice__container}>
            {thanksImagesError ? (
              <p>Не удалось получить данные</p>
            ) : isThanksImagesLoading ? (
              <Spinner />
            ) : thanksImages.length !== 0 ? (
              <IconsList items={thanksImages} onPick={onPick} />
            ) : (
              <p>Нет доступных спасибок</p>
            )}
          </div>
          <hr />
          <div className={style.giftsChoice__title}>
            <img src={cardImg} alt="" />
            <h3>Открытка</h3>
          </div>
          <div className={style.giftsChoice__container}>
            {cardsImagesError ? (
              <p>Не удалось получить данные</p>
            ) : isCardsImagesLoading ? (
              <Spinner />
            ) : cardsImages.length !== 0 ? (
              <IconsList items={cardsImages} onPick={onPick} />
            ) : (
              <p>Нет доступных открыток</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
