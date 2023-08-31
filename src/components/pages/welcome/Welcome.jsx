import React, { useState } from "react";
import Navbar from "./navbar/Navbar";
import Vpn from "./vpn/Vpn";
import Remote from "./remote/Remote";
import Payment from "./payment/Payment";
import Resources from "./resources/Resources";
import welcomeImg from "./static/welcome.png";
import style from "./style.module.css";

export default function Welcome() {
  const [page, setPage] = useState("");
  return (
    <div>
      <h1 className={style.welcome__header}>Добро пожаловать</h1>
      <Navbar page={page} setPage={setPage} />
      {page === "remote" ? <Remote /> : null}
      {page === "payment" ? <Payment /> : null}
      {page === "vpn" ? <Vpn /> : null}
      {page === "resources" ? <Resources /> : null}
      {page === "" || page === "vpn" ? (
        <div className={style.welcome__footer}>
          <img src={welcomeImg} alt="" />
        </div>
      ) : null}
    </div>
  );
}
