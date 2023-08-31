import React, { useContext } from "react";
import style from "./style.module.css";
import img from "../../../../img/requisites.jpg";
import { Context } from "../../../../context/context";
import { useGetProfile } from "../../../../hooks/useProfiles";
import Spinner from "../../../common/spinner/Spinner";

export default function Requisites() {
  const { employeeId } = useContext(Context);
  const { isLoading, isError } = useGetProfile(employeeId);
  if (isError) return <h1>Что-то пошло не так...</h1>;

  if (isLoading) return <Spinner />;
  return (
    <div>
      <h1 className={style.title}>Реквизиты</h1>
      <div className={style.image}>
        <img src={img} alt="ethics" />
      </div>
      <div className={style.text}>
        <p>«Азиатско-Тихоокеанский Банк» (АО)</p>
        <table>
          <tr>
            <td className={style.name}>Юридический адрес</td>
            <td className={style.content}>
              675004, Россия, Амурская область, г. Благовещенск, ул. Амурская,
              225
            </td>
          </tr>
          <tr>
            <td className={style.name}>Телефон</td>
            <td className={style.content}>8(4162)220–402, 220-406</td>
          </tr>
          <tr>
            <td className={style.name}>Факс</td>
            <td className={style.content}>8(4162)220-400</td>
          </tr>
          <tr>
            <td className={style.name}>E-mail</td>
            <td className={style.content}>
              <a href="mailto:atb@atb.su">atb@atb.su</a> Данный адрес e-mail
              защищен от спам-ботов, Вам необходимо включить Javascript для его
              просмотра. Данный адрес e-mail защищен от спам-ботов, Вам
              необходимо включить Javascript для его просмотра.
            </td>
          </tr>
          <tr>
            <td className={style.name}>ИНН</td>
            <td className={style.content}>2801023444</td>
          </tr>
          <tr>
            <td className={style.name}>КПП</td>
            <td className={style.content}>280101001/997950001</td>
          </tr>
          <tr>
            <td className={style.name}>К/с</td>
            <td className={style.content}>
              30101810300000000765 в Отделении Благовещенск
            </td>
          </tr>
          <tr>
            <td className={style.name}>БИК</td>
            <td className={style.content}>041012765</td>
          </tr>
          <tr>
            <td className={style.name}>Лицензия</td>
            <td className={style.content}>1810 ЦБ РФ</td>
          </tr>
          <tr>
            <td className={style.name}>SWIFT-код</td>
            <td className={style.content}>ASANRU8X</td>
          </tr>
          <tr>
            <td className={style.name}>
              Основной государственный регистрационный номер
            </td>
            <td className={style.content}>1022800000079</td>
          </tr>
          <tr>
            <td className={style.name}>
              Дата внесения в Единый государственный реестр юридических лиц
            </td>
            <td className={style.content}>14.02.1992</td>
          </tr>
        </table>
        <p>Филиал «Азиатско-Тихоокеанский Банк» (АО) в г. Улан-Удэ</p>
        <table>
          <tr>
            <td className={style.name}>Юридический адрес</td>
            <td className={style.content}>
              670000, Россия, Республика Бурятия, г. Улан-Удэ, ул.
              Коммунистическая, 49
            </td>
          </tr>
          <tr>
            <td className={style.name}>Телефон</td>
            <td className={style.content}>8(3012)211-328</td>
          </tr>
          <tr>
            <td className={style.name}>Факс</td>
            <td className={style.content}>8(3012)216-190</td>
          </tr>
          <tr>
            <td className={style.name}>ИНН</td>
            <td className={style.content}>82801023444</td>
          </tr>
          <tr>
            <td className={style.name}>КПП</td>
            <td className={style.content}>032643001</td>
          </tr>
          <tr>
            <td className={style.name}>К/с</td>
            <td className={style.content}>
              30101810700000000744 в Отделении — НБ Республика Бурятия
            </td>
          </tr>
          <tr>
            <td className={style.name}>БИК</td>
            <td className={style.content}>048142744</td>
          </tr>
          <tr>
            <td className={style.name}>SWIFT-код</td>
            <td className={style.content}>ASANRU8XXXX</td>
          </tr>
        </table>
        <p>Филиал «Азиатско-Тихоокеанский Банк» (АО) в г. Москва</p>
        <table>
          <tr>
            <td className={style.name}>Юридический адрес</td>
            <td className={style.content}>
              125009, Россия, г. Москва, пер. Вознесенский, д. 11, стр. 1
            </td>
          </tr>
          <tr>
            <td className={style.name}>Телефон</td>
            <td className={style.content}>8(495)988-30-61, 988-30-62</td>
          </tr>
          <tr>
            <td className={style.name}>Факс</td>
            <td className={style.content}>8(495)988-30-66</td>
          </tr>
          <tr>
            <td className={style.name}>ИНН</td>
            <td className={style.content}>2801023444</td>
          </tr>
          <tr>
            <td className={style.name}>КПП</td>
            <td className={style.content}>770343001</td>
          </tr>
          <tr>
            <td className={style.name}>К/с</td>
            <td className={style.content}>
              30101810145250000754 в ГУ Банка России по ЦФО
            </td>
          </tr>
          <tr>
            <td className={style.name}>БИК</td>
            <td className={style.content}>044525754</td>
          </tr>
          <tr>
            <td className={style.name}>SWIFT-код</td>
            <td className={style.content}>ASANRU8XXXX</td>
          </tr>
        </table>
        <p>Филиал «Азиатско-Тихоокеанский Банк» (АО) в г. Екатеринбург</p>
        <table>
          <tr>
            <td className={style.name}>Юридический адрес</td>
            <td className={style.content}>
              620133, Россия, г. Екатеринбург, ул. Луначарского, 57
            </td>
          </tr>
          <tr>
            <td className={style.name}>Телефон</td>
            <td className={style.content}>8(343)311-10-30</td>
          </tr>
          <tr>
            <td className={style.name}>Факс</td>
            <td className={style.content}>8(343)311-10-30 доб. 415</td>
          </tr>
          <tr>
            <td className={style.name}>ИНН</td>
            <td className={style.content}>2801023444</td>
          </tr>
          <tr>
            <td className={style.name}>КПП</td>
            <td className={style.content}>667843001</td>
          </tr>
          <tr>
            <td className={style.name}>К/с</td>
            <td className={style.content}>
              30101810465770000418 в Уральском ГУ Банка России
            </td>
          </tr>
          <tr>
            <td className={style.name}>БИК</td>
            <td className={style.content}>046577418</td>
          </tr>
          <tr>
            <td className={style.name}>SWIFT-код</td>
            <td className={style.content}>ASANRU8XXXX</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
