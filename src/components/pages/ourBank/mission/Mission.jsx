import React, { useContext } from "react";
import style from "./style.module.css";
import Spinner from "../../../common/spinner/Spinner";
import { useGetProfile } from "../../../../hooks/useProfiles";
import { Context } from "../../../../context/context";
import miss from '../../../../img/ourbankimg/missionLogo.jpg'
import miss2 from '../../../../img/ourbankimg/mis1.jpg'
import miss3 from '../../../../img/ourbankimg/mis2.jpg'

export default function Mission() {
  const { employeeId } = useContext(Context);
  const { isLoading, isError } = useGetProfile(employeeId);
  if (isError) return <h1>Что-то пошло не так...</h1>;

  if (isLoading) return <Spinner />;
  return (
    <section>
      <div>
        <div>
          <h1 className={style.title}>Наша миссия</h1>
        </div>
        <div className={style.mission__logo}><img src={miss} alt="" /></div>
        <div className={style.mission__first__card}><img src={miss2} alt="" /></div>
        <div className={style.miss}></div>
        <div className={style.mission__second__card}><img src={miss3} alt="" /></div>
      </div>
    </section>
  );
}
