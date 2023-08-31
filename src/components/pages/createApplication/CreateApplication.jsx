import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import calendar from "../../../img/calend.svg";
import spravka from "../../../img/spravka.svg";
import bolnica from "../../../img/bolnica.svg";
import { useGetProfile } from "../../../hooks/useProfiles";
import Spinner from "../../common/spinner/Spinner";
import { Context } from "../../../context/context";

export default function Application() {
  const { employeeId } = useContext(Context);
  const { isLoading, isError } = useGetProfile(employeeId);
  if (isError) return <h1>Что-то пошло не так...</h1>;

  if (isLoading) return <Spinner />;
  return (
    <section>
      <div className={style.bgc}>
        <div>
          <div className={style.title}>
            <h1>Создать заявку: Выберите тип заявки</h1>
          </div>
          <div className={style.cards}>
            <div>
              <img className={style.imgCalendar} src={calendar} alt="img" />
              <h2>Заявка на отпуск</h2>
              <ul>
                <li>
                  <Link to="/applications/create/paidholidays">
                    Плановый(оплачиваемый отпуск)
                  </Link>
                </li>
                <li>
                  <Link to="/applications/create/unpaidholidays">
                    Отгул(неоплачиваемый отпуск) <br />
                    по собственной причине
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <img className={style.imgSpravka} src={spravka} alt="img" />
              <h2>Справка</h2>
              <ul>
                <li>
                  <Link to="/applications/create/visa">Для визы</Link>
                </li>
                <li>
                  <Link to="/applications/create/ndfl">2НДФЛ</Link>
                </li>
                <li>
                  <Link to="/applications/create/certificateofemployment">
                    С места работы
                  </Link>
                </li>
                <li>
                  <Link to="/applications/create/workbookcopy">
                    Копия трудовой книжки
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <img className={style.imagebol} src={bolnica} alt="img" />
              <h2>Оформление больничного</h2>
              <ul>
                <li>
                  <Link to="/applications/create/medlist">
                    Открыть больничный лист
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
