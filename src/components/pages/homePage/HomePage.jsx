import React, { useContext, useEffect, useState } from "react";
import Birthday from "./birthday/Birthday";
import NewUser from "./newUser/NewUser";
import News from "./news/News";
import BirthdayList from "./birthdayList/BirthdayList";
import style from "./style.module.css";
import { useGetProfile } from "../../../hooks/useProfiles";
import { Context } from "../../../context/context";
import Spinner from "../../common/spinner/Spinner";
import moment from "moment";
import { useChangeFlag } from "../../../hooks/useAuthorization";

export default function HomePage() {
  const parseDateBirthday = (data) => {
    return moment(data, "YYYY-MM-DD").format("MM-DD");
  };

  const id = true;

  const [birthdayClose, setBirthdayClose] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const { employeeId, flagGuideShown } = useContext(Context);

  const { employee, isLoading, error } = useGetProfile(employeeId);

  const { changeFlag } = useChangeFlag();

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");
    if (!isLoading && employee && employee.employeeInfo) {
      if (
        parseDateBirthday(today) ===
        parseDateBirthday(employee.employeeInfo.birthDate)
      ) {
        setBirthdayClose(false);
      }
    }
  }, [isLoading, employee, birthdayClose, id]);

  useEffect(() => {
    const visitCount = localStorage.getItem("visitCount");
    if (visitCount) {
      setIsFirstVisit(false);
    }
    if (!flagGuideShown) {
      changeFlag();
    }

    // eslint-disable-next-line
  }, []);

  if (error) return <h1>Что-то пошло не так ...</h1>;

  if (isLoading) return <Spinner />;

  const handleClick = () => {
    localStorage.setItem("visitCount", "1");
  };

  return (
    <section className={style.homePage}>
      <div
        className={`${birthdayClose && !isFirstVisit ? style.close : ""} ${
          style.homePage__container
        }`}
      >
        <div className={style.homePage__top}>
          <Birthday
            employeeId={employee.employeeInfo.id}
            birthdayClose={birthdayClose}
          />
          <NewUser handleClick={handleClick} newUserClose={!isFirstVisit} />
        </div>
        <div className={style.homPage__news}>
          <News />
        </div>
        <div className={style.homePage__right}>
          <BirthdayList />
        </div>
      </div>
    </section>
  );
}
