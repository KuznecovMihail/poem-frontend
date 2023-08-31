import React from "react";
import fileRemote from "../static/remote.docx";
import myDocsImg from "../static/myDocs.png";
import addDocsImg from "../static/addDocs.png";
import docTypeImg from "../static/docType.png";
import markDocImg from "../static/markDoc.png";
import runDocImg from "../static/runDoc.png";
import style from "./style.module.css";

export default function Remote() {
  return (
    <div className={style.remote}>
      <h2>1. Скачать служебную записку</h2>
      <a href={fileRemote} download="Служебная записка">
        Нажмите чтобы скачать
      </a>
      <h2>2. Зайти на портал</h2>
      <a href="http://portal.atb.su/Pages/atb.Main.aspx">
        http://portal.atb.su/Pages/atb.Main.aspx
      </a>
      <h2>3. Добавить документ</h2>
      <h4>3.1 Документы - Мои документы</h4>
      <img src={myDocsImg} alt="" />
      <h4>3.2 Добавить документ</h4>
      <img src={addDocsImg} alt="" />
      <h4>
        3.3 Выбрать документ из папки, указать Тип документа «Служебная записка»
        и шаблон «Служебная записка на согласование удаленного доступа»
      </h4>
      <img src={docTypeImg} alt="" />
      <h2>4. Запустить согласование</h2>
      <h4>4.1 Отметить документ «V»</h4>
      <img src={markDocImg} alt="" />
      <h4>4.2 Выбрать в строке команду «Запуск согласования»</h4>
      <img src={runDocImg} alt="" />
    </div>
  );
}
