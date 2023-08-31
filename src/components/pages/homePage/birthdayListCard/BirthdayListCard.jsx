import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import moment from "moment";
import { useGetImage } from "../../../../hooks/useImages";
import { Context, ProfileContext } from "../../../../context/context";

export default function BirthdayListCard(props) {
  const [image] = useGetImage(props.imageUrl, true);
  const { employeeId } = useContext(Context);
  const { setFromHomePage } = useContext(ProfileContext);

  const dateOfBirthday = moment(props.birthDate, "YYYY-MM-DD").format(
    "D[-го] MMMM"
  );

  return (
    <div className={style.otherBirthdayCard}>
      <div className={style.otherBirthdayCard__img}>
        <img src={image} alt="" />
      </div>
      <div className={style.otherBirthdayCard__info}>
        <div className={style.info__name}>
          <Link className={style.info__link} to={`/user/${props.id}`}>
            <p className={style.serName}>{props.lastName}</p>
            <p className={style.name}>{props.firstName}</p>
            <p className={style.date}>{dateOfBirthday}</p>
          </Link>
        </div>
        <Link
          to={`/user/${props.id}`}
          onClick={() => setFromHomePage(true)}
          className={`${style.info__present} ${
            employeeId === props.id ? style.close : ""
          }`}
        >
          Поздравить
        </Link>
      </div>
    </div>
  );
}
