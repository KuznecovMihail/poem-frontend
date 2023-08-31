import React, { useState } from "react";
import ButtonClose from "../../../../common/buttonClose/ButtonClose";
import { THANK_TYPE_ID, CARD_TYPE_ID } from "../../constants";
import GiftsPage from "./GiftsPage";
import Navbar from "./navbar/Navbar";
import style from "./style.module.css";

export default function GiftsList({
  id,
  setIsModalOpen,
  cardsTotal,
  thanksTotal,
}) {
  const [page, setPage] = useState(thanksTotal > 0 ? "thanks" : "cards");

  return (
    <div className={style.giftsList}>
      <div className={style.giftsList__header}>
        <Navbar
          page={page}
          setPage={setPage}
          cardsTotal={cardsTotal}
          thanksTotal={thanksTotal}
        />
        <ButtonClose onClick={() => setIsModalOpen(false)} />
      </div>
      <hr />
      {page === "thanks" ? <GiftsPage id={id} typeId={THANK_TYPE_ID} /> : null}
      {page === "cards" ? <GiftsPage id={id} typeId={CARD_TYPE_ID} /> : null}
    </div>
  );
}
