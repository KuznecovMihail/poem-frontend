import React, { useContext } from "react";
import style from "./style.module.css";
import PaidHolidayInput from "./paidHolidayInput/PaidHolidayInput";
import Spinner from "../../../common/spinner/Spinner";
import { useGetProfile } from "../../../../hooks/useProfiles";
import { Context } from "../../../../context/context";

export default function PaidHolidays() {
  const { employeeId } = useContext(Context);
  const { isLoading, isError } = useGetProfile(employeeId);
  if (isError) return <h1>Что-то пошло не так...</h1>;

  if (isLoading) return <Spinner />;
  return (
    <section className={style.bgc}>
      <div>
        <div className={style.title}>
          <h2>Заявка на предоставление планового отпуска</h2>
        </div>
        <div className={style.applic__form}>
          <PaidHolidayInput />
          <div className={style.window}>
          </div>
        </div>
      </div>
    </section>
  );
}
