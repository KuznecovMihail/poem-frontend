import React, { useContext } from "react";
import style from "./style.module.css";
import Spinner from "../../../common/spinner/Spinner";
import { useGetProfile } from "../../../../hooks/useProfiles";
import { Context } from "../../../../context/context";

export default function Bank_today() {
  const { employeeId } = useContext(Context);
  const { isLoading, isError } = useGetProfile(employeeId);
  if (isError) return <h1>Что-то пошло не так...</h1>;

  if (isLoading) return <Spinner />;
  return (
    <section>
      <div className={style.bank}>
        <div className={style.bank__today}>
          <h1 className={style.title}>Банк сегодня</h1>
        </div>
        <div className={style.bank__logo}></div>
        <div>
          <h1 className={style.name}>АТБ СЕГОДНЯ:</h1>
        </div>
        <div className={style.text}>
          <h1 className={style.flex}>
            25
            <p>лет успешной работы</p>
          </h1>
          <h1 className={style.flex}>
            4000
            <p>сотрудников</p>
          </h1>
          <h1 className={style.flex}>
            19
            <p>регионов присутствия</p>
          </h1>
          <h1 className={style.flex}>
            104
            <p>населенных пункта</p>
          </h1>
          <h1 className={style.flex}>
            более 180
            <p>подразделений по всей стране</p>
          </h1>
          <h1 className={style.flex}>
            более 270
            <p>банкоматов</p>
          </h1>
          <h1 className={style.flex}>
            210
            <p>терминалов</p>
          </h1>
        </div>
        <div className={style.span}>
          Наши специалисты – высококвалифицированные профессионалы своего дела.
          Мы знаем, <span>ЧТО</span> хочет клиент и <br /> <span>КАК</span>{" "}
          своевременно предложить ему продукт или услугу нашего Банка.
        </div>
      </div>
    </section>
  );
}
