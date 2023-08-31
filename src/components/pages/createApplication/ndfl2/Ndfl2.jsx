import React, { useContext } from "react";
import style from "./style.module.css";
import FormForSpravka from "../fromForSpravka/FormForSpravka";
import { Context } from "../../../../context/context";
import { useGetProfile } from "../../../../hooks/useProfiles";
import Spinner from "../../../common/spinner/Spinner";

export default function Ndfl2() {
  const { employeeId } = useContext(Context);
  const { isLoading, isError } = useGetProfile(employeeId);
  if (isError) return <h1>Что-то пошло не так...</h1>;

  if (isLoading) return <Spinner />;
  return (
    <section className={style.bgc}>
      <div>
        <div className={style.title}>
          <h2>Заявка на получение справки: 2НДФЛ</h2>
        </div>
        <div className={style.applic__form}>
          <FormForSpravka typeOfApplicationId={8} />
          <div className={style.window}></div>
        </div>
      </div>
    </section>
  );
}
