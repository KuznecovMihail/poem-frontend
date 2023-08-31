import React from "react";
import Card from "../../../../../common/card/Card";
import style from "./style.module.css";
import cardImg from "../../../../../../img/gift.png";
import thankImg from "../../../../../../img/thank.png";

export default function Navbar({ page, setPage, cardsTotal, thanksTotal }) {
  return (
    <div className={style.navbar}>
      {thanksTotal > 0 ? (
        <Card onClick={() => setPage("thanks")} isActive={page === "thanks"}>
          <div className={style.navbar__item}>
            <img src={thankImg} alt="" />
            <h4>Спасибки</h4>
          </div>
        </Card>
      ) : null}

      {cardsTotal > 0 ? (
        <Card onClick={() => setPage("cards")} isActive={page === "cards"}>
          <div className={style.navbar__item}>
            <img src={cardImg} alt="" />
            <h4>Открытки</h4>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
