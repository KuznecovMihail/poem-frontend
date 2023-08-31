import React, { useContext } from "react";
import style from "./style.module.css";
import Card from "../../common/card/Card";
import img_mission from "../../../img/ourbankimg/our_mission.svg";
import img_bankToday from "../../../img/ourbankimg/bank_today.svg";
import img_vakansii from "../../../img/ourbankimg/vakans.svg";
import img_bankHistor from "../../../img/ourbankimg/bank_histor.svg";
import img_korporatEtik from "../../../img/ourbankimg/korp_etika.svg";
import img_requizz from "../../../img/ourbankimg/req.svg";
import img_bankStrukt from "../../../img/ourbankimg/struct_bank.svg";
import img_topMeneg from "../../../img/ourbankimg/top_meneg.svg";
import Spinner from "../../common/spinner/Spinner";
import { useGetProfile } from "../../../hooks/useProfiles";
import { Context } from "../../../context/context";
import { Link } from "react-router-dom";

export default function OurBank() {
  const { employeeId } = useContext(Context);
  const { isLoading, isError } = useGetProfile(employeeId);
  if (isError) return <h1>Что-то пошло не так...</h1>;

  if (isLoading) return <Spinner />;
  const cardsData = [
    {
      id: 1,
      url: "/bank/mission",
      title: "Наша миссия",
      img: img_mission,
    },
    {
      id: 2,
      url: "/bank/today",
      title: "Банк сегодня",
      img: img_bankToday,
    },
    {
      id: 3,
      url: "/bank/management",
      title: "Топ - менеджемент",
      img: img_topMeneg,
    },
    {
      id: 4,
      url: "/bank/history",
      title: "История банка",
      img: img_bankHistor,
    },
    {
      id: 5,
      url: "/bank/ethics",
      title: "Корпоративная этика",
      img: img_korporatEtik,
    },
    {
      id: 6,
      url: "/bank/structure",
      title: "Структура банка",
      img: img_bankStrukt,
    },
    {
      id: 7,
      url: "/bank/requisites",
      title: "Реквизиты",
      img: img_requizz,
    },
    {
      id: 8,
      url: "/hh",
      title: "Вакансии",
      img: img_vakansii,
    },
  ];

  return (
    <section className={style.ourBank}>
      <div className={style.wrapper}>
        <div className={style.ourbank__logo}>
          <h1>Наш банк</h1>
        </div>
        <div className={style.ourbank__cards}>
          <div className={style.cards__grid}>
            {cardsData.map((card) =>
              card.url === "/hh" ? (
                <>
                  <a
                    href="https://vladivostok.hh.ru/employer/176941"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Card key={card.id} onClick={() => {}}>
                      <div className={style.cards}>
                        <img src={card.img} alt=""/>
                        <h3>{card.title}</h3>
                      </div>
                    </Card>
                  </a>
                </>
              ) : (
                <Link to={card.url}>
                  <Card key={card.id} onClick={() => {}}>
                    <div className={style.cards}>
                      <img src={card.img} alt="icon" />
                      <h3>{card.title}</h3>
                    </div>
                  </Card>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
