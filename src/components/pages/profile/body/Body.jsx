import React, { useState, useEffect } from "react";
import Name from "./Name";
import Navbar from "./navbar/Navbar";
import About from "./about/About";
import Colleagues from "./colleagues/Colleagues";
import style from "./style.module.css";

export default function Body({ employee, setEmployee, isCurrentUserPage }) {
  const [page, setPage] = useState("about");
  useEffect(() => setPage("about"), [employee.employeeInfo.id]);

  return (
    <div className={style.body}>
      <Name {...employee} />
      <Navbar
        page={page}
        setPage={setPage}
        isCurrentUserPage={isCurrentUserPage}
      />
      {page === "about" ? (
        <About
          employee={employee}
          setEmployee={setEmployee}
          isCurrentUserPage={isCurrentUserPage}
        />
      ) : null}
      {page === "colleagues" ? <Colleagues {...employee} /> : null}
    </div>
  );
}
