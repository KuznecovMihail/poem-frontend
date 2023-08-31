import React from "react";
import { Navigate, Outlet } from "react-router";
import { useLogin } from "../../../hooks/useAuthorization";
import Spinner from "../../common/spinner/Spinner";

export default function PrivateRoute() {
  const { isLoading } = useLogin();
  const isAuth = localStorage.getItem("Auth");
  const token = localStorage.getItem("accessToken");

  if (isLoading) return <Spinner />;

  return !isAuth || !token ? <Navigate to="login" /> : <Outlet />;
}
