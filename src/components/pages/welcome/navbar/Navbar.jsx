import React from "react";
import Card from "../../../common/card/Card";
import bookImg from "../static/book.png";
import remoteImg from "../static/remote.png";
import remoteWImg from "../static/remote_w.png";
import vpnImg from "../static/vpn.png";
import vpnWImg from "../static/vpn_w.png";
import paymentImg from "../static/payment.png";
import paymentWImg from "../static/payment_w.png";
import linkImg from "../static/link.png";
import linkWImg from "../static/link_w.png";
import pdfFile from "../static/newEmpBook.pdf";
import style from "./style.module.css";

const cards = [
  {
    id: 1,
    type: "link",
    link: pdfFile,
    title: "Книга сотрудника",
    img: bookImg,
  },
  {
    id: 2,
    type: "page",
    page: "remote",
    title: "Удалённый доступ",
    img: remoteImg,
    imgW: remoteWImg,
  },
  {
    id: 3,
    type: "page",
    page: "vpn",
    title: "VPN",
    img: vpnImg,
    imgW: vpnWImg,
  },
  {
    id: 4,
    type: "page",
    page: "payment",
    title: "Заработная плата",
    img: paymentImg,
    imgW: paymentWImg,
  },
  {
    id: 5,
    type: "page",
    page: "resources",
    title: "Полезные ссылки",
    img: linkImg,
    imgW: linkWImg,
  },
];

export default function Navbar({ page, setPage }) {
  return (
    <div className={style.welcome__nav}>
      {cards.map((card) =>
        card.type === "link" ? (
          <div key={card.id}>
            <a href={pdfFile} target="_blank" rel="noreferrer">
              <Card onClick={() => setPage("")}>
                <div className={style.welcome__item}>
                  <img src={card.img} alt="" />
                  <h4>{card.title}</h4>
                </div>
              </Card>
            </a>
          </div>
        ) : (
          <Card
            key={card.id}
            onClick={() => setPage(card.page)}
            isActive={page === card.page}
          >
            <div className={style.welcome__item}>
              <img src={page === card.page ? card.imgW : card.img} alt="" />
              <h4>{card.title}</h4>
            </div>
          </Card>
        )
      )}
    </div>
  );
}
