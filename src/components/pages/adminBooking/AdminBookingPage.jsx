import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import Employees from "./employees/Employees";
import Reservations from "./links/reservations/Reservations";
import Card from "../../common/card/Card";
import officesBlackImg from "../../../img/officesBlack.svg";
import usersImg from "../../../img/users.png";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Links from "./links/Links";

const offices = "offices";
const employees = "employees";

function AdminBookingPage(props) {
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();
  const isOneEmployee = !isNaN(+location.pathname.split("/").at(-1));
  useEffect(() => {
    let path = location.pathname
      .split("/")
      .some((path) => path.startsWith(offices))
      ? offices
      : employees;
    setCurrentPage(path);
  }, [location.pathname]);

  return (
    <div className={style.content}>
      <div className={style.link_buttons}>
        {isOneEmployee && (
          <Link to="/admin/booking/employees">
            <Card onClick={() => null}>
              <div className={style.link_content}>
                <h4>Назад</h4>
              </div>
            </Card>
          </Link>
        )}
        <Link to={`${offices}/city`} className={style.link_wrapper}>
          <Card
            onClick={() => setCurrentPage(offices)}
            isActive={currentPage === offices}
          >
            <div className={style.link_content}>
              <img src={officesBlackImg} alt="" className={style.link_icon} />
              <h4>Офисы</h4>
            </div>
          </Card>
        </Link>
        <Link to={employees} className={style.link_wrapper}>
          <Card
            onClick={() => setCurrentPage(employees)}
            isActive={currentPage === employees}
          >
            <div className={style.link_content}>
              <img src={usersImg} alt="" className={style.link_icon} />
              <h4>Сотрудники</h4>
            </div>
          </Card>
        </Link>
      </div>
      <Card className={style.subPage_content}>
        <Routes>
          <Route path={`${offices}/*`} element={<Links />} />
          <Route path={`${employees}/*`} element={<Employees />} />
          <Route path={"reservations/:id"} element={<Reservations />} />
        </Routes>
      </Card>
    </div>
  );
}

export default AdminBookingPage;
