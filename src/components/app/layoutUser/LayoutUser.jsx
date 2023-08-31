import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import style from "./style.module.css";
import HeaderUser from "../../header/header_user/Header";
import { useGetProfile } from "../../../hooks/useProfiles";
import Spinner from "../../common/spinner/Spinner";
import { CloseBurger, Context } from "../../../context/context";
import jwtDecode from "jwt-decode";
import Error404 from "../../pages/erros/Error404";
import Error500 from "../../pages/erros/Error500";

export default function LayoutUser() {
  const { setEmployeeId, employeeRole, setEmployeeRole } = useContext(Context);
  const { setCloseBurger } = useContext(CloseBurger);

  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  useEffect(() => {
    setEmployeeId(decodedToken.employeeId);
    setEmployeeRole(decodedToken.roles);
    // eslint-disable-next-line
  }, [setEmployeeRole, setEmployeeId]);

  const { employee, isLoading, error } = useGetProfile(decodedToken.employeeId);

  if (error)
    return error?.response?.status === 404 ? <Error404 /> : <Error500 />;

  if (isLoading) return <Spinner />;
  return (
    <>
      <HeaderUser {...employee} role={employeeRole.includes("ROLE_ADMIN")} />
      <div className={style.container} onClick={() => setCloseBurger(true)}>
        <Outlet />
      </div>
    </>
  );
}
