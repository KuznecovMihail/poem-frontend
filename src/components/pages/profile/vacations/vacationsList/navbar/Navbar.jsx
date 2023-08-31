import React from "react";
import Card from "../../../../../common/card/Card";
import style from "./style.module.css";

export default function Navbar({ page, setPage, isCurrentUserBoss }) {
  return (
    <div className={style.navbar}>
      <Card
        onClick={() => setPage("vacations")}
        isActive={page === "vacations"}
      >
        <h4>Мои отпуска</h4>
      </Card>
      {isCurrentUserBoss ? (
        <Card
          onClick={() => setPage("subordinates")}
          isActive={page === "subordinates"}
        >
          <h4>Отпуска подчинённых</h4>
        </Card>
      ) : null}
    </div>
  );
}
