import React from "react";
import { Link } from "react-router-dom";
import Card from "../../../../common/card/Card";
import style from "./style.module.css";
import aboutImg from "../../../../../img/user.png";
import aboutWImg from "../../../../../img/user_w.png";
import colleguesImg from "../../../../../img/users.png";
import colleguesWImg from "../../../../../img/users_w.png";
import handshakeImg from "../../../../../img/handshake.png";

export default function Navbar({ page, setPage, isCurrentUserPage }) {
  return (
    <div className={style.navbar}>
      <Card onClick={() => setPage("about")} isActive={page === "about"}>
        <div className={style.navbar__item}>
          <img src={page === "about" ? aboutWImg : aboutImg} alt="" />
          <h4>О сотруднике</h4>
        </div>
      </Card>
      {isCurrentUserPage ? (
        <>
          <Card
            onClick={() => setPage("colleagues")}
            isActive={page === "colleagues"}
          >
            <div className={style.navbar__item}>
              <img
                src={page === "colleagues" ? colleguesWImg : colleguesImg}
                alt=""
              />
              <h4>Коллеги</h4>
            </div>
          </Card>
          <Link to="/welcome">
            <Card onClick={() => {}}>
              <div className={style.navbar__item}>
                <img src={handshakeImg} alt="" />
                <h4>Добро пожаловать</h4>
              </div>
            </Card>
          </Link>
        </>
      ) : null}
    </div>
  );
}
