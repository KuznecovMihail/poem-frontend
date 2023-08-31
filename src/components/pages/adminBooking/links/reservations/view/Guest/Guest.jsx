import React from "react";
import {useGetImage} from "../../../../../../../hooks/useImages";
import style from "./style.module.css"
import {Link} from "react-router-dom";

function Guest({guest}) {
  const [avatar] = useGetImage(guest.imageUrl, true)
  return (
    <div className={style.content}>
      <div>
        <Link to={`/user/${guest.id}`}>
        <img src={avatar} alt="" className={style.avatar}/>
        </Link>
      </div>
      <div className={style.info}>
        <p className={style.name}>{guest.lastName} {guest.firstName} {guest?.middleName}</p>
        <p>{guest.email}</p>
      </div>
    </div>
  );
}

export default Guest;
