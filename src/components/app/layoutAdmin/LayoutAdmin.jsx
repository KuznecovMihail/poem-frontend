import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import HeaderAdmin from "../../header/header_admin/Header";
import { useGetProfile } from "../../../hooks/useProfiles";
import Spinner from "../../common/spinner/Spinner";
import jwtDecode from "jwt-decode";
import { Context } from "../../../context/context";
import Error404 from "../../pages/erros/Error404";
import Error500 from "../../pages/erros/Error500";

export default function LayoutAdmin(props) {
  const { setEmployeeId, employeeRole, setEmployeeRole } = useContext(Context);
  const navigate = useNavigate();

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
      {employeeRole.includes("ROLE_ADMIN") ? (
        <>
          <HeaderAdmin {...employee} />
          <div className={style.bacground_admin}>
            <div className={style.container}>
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        navigate("/")
      )}
    </>
  );
}
