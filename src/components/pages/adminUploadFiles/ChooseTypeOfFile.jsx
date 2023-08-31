import React from 'react';
import style from "./style.module.css"
import calendarImg from "../../../img/calendarWithCheck.svg"
import {Link} from "react-router-dom";

function ChooseTypeOfFile() {
  return (
    <>
      <div className={style.main}>
        <h1>Загрузка файла: выберите тип загружаемого файла</h1>
        <div className={style.card_container}>
          <Link activeclassname={''} to={'/admin/upload_file/org_structure'} className={style.card}>
            <img alt='' className={style.icon} src={calendarImg}/>
            <h1 className={style.text}>Орг. структура</h1>
          </Link>
          <Link activeclassname={''} to={'/admin/upload_file/vacation'} className={style.card}>
            <img alt='' className={style.icon} src={calendarImg}/>
            <h1 className={style.text}>Информация по отпускам</h1>
          </Link>
        </div>
      </div>
    </>
  );
}


export default ChooseTypeOfFile;
