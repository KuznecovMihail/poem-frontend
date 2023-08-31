import React from "react";
import style from "./style.module.css";
import Spinner from "../../../common/spinner/Spinner";
import { useGetProfile } from "../../../../hooks/useProfiles";

export default function NewsUserName({ authorId }) {
  const { employee, isLoading, isError } = useGetProfile(authorId);

  if (isError) return <h1>Что-то пошло не так ...</h1>;

  if (isLoading) return <Spinner />;

  return (
    <p className={style.news_use_item__author}>
      Автор:
      <span> {employee.employeeInfo.lastName} </span>
      <span>{employee.employeeInfo.firstName.slice(0, 1) + "."} </span>
      <span>{employee.employeeInfo.middleName.slice(0, 1) + "."}</span>
    </p>
  );
}
