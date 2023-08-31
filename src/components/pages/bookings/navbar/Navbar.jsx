import React from "react";
import style from "./style.module.css";
import Card from "../../../common/card/Card";

export default function Navbar({ page, setPage, isCurrentUserPage }) {
  return (
    <div className={style.navbar}>
      <Card onClick={() => setPage("my")} isActive={page === "my"}>
        <div className={style.navbar__item}>
          <h4>Мои</h4>
        </div>
      </Card>
      {isCurrentUserPage ? (
        <>
          <Card onClick={() => setPage("guests")} isActive={page === "guests"}>
            <div className={style.navbar__item}>
              <h4>Гостевые</h4>
            </div>
          </Card>

          <Card
            onClick={() => setPage("archive")}
            isActive={page === "archive"}
          >
            <div className={style.navbar__item}>
              <h4>Архив</h4>
            </div>
          </Card>
          <Card
            onClick={() => setPage("colleagues")}
            isActive={page === "colleagues"}
          >
            <div className={style.navbar__item}>
              <h4>Коллеги</h4>
            </div>
          </Card>
        </>
      ) : null}
    </div>
  );
}
