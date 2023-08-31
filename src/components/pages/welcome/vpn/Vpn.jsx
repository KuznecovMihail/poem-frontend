import React from "react";
import Card from "../../../common/card/Card";
import winImg from "../static/windows.png";
import macImg from "../static/apple.png";
import mailImg from "../static/mail.png";
import winFile from "../static/vpnWIN.pdf";
import macFile from "../static/vpnMAC.pdf";
import style from "./style.module.css";

export default function Vpn() {
  return (
    <div className={style.vpn}>
      <a href={winFile} target="_blank" rel="noreferrer">
        <Card onClick={() => {}}>
          <div className={style.vpn__item}>
            <img src={winImg} alt="" />
            <h3>Windows</h3>
          </div>
        </Card>
      </a>
      <a href={macFile} target="_blank" rel="noreferrer">
        <Card onClick={() => {}}>
          <div className={style.vpn__item}>
            <img src={macImg} alt="" />
            <h3>MAC OS</h3>
          </div>
        </Card>
      </a>
      <a href="mailto:dostup@atb.su">
        <Card onClick={() => {}}>
          <div className={style.vpn__item}>
            <img src={mailImg} alt="" />
            <h3>Техподдержка</h3>
          </div>
        </Card>
      </a>
    </div>
  );
}
