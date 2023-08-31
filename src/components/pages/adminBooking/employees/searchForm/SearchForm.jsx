import React from "react";
import style from "./style.module.css"
import searchImg from "../../../../../img/search.svg"
import Spinner from "../../../../common/spinner/Spinner";
import SearchItem from "../../../../header/header_user/search/searchItem/SearchItem";
import {Link} from "react-router-dom";
import {useSearch} from "../../../../../hooks/useProfiles";

function SearchForm() {

  const {value, isLoading, debouncedValue, isError, users, handleInput} = useSearch();
  return (
    <div className={style.content}>
      <div className={style.form}>
        <label htmlFor={style.input}><h3>Поиск сотрудника</h3></label>
        <img alt="" src={searchImg} className={style.searchImg}/>
        <input
          value={value}
          id={style.input}
          className={style.input}
          onChange={handleInput}
          placeholder={"Введите ФИО, телефон, табельный номер или email в свободной форме"}
          type="search"
        />
      </div>
      <div className={style.results}>
        {isError ?
          <div><h3>Что-то пошло не так</h3></div> :
          isLoading ?
            <Spinner/> :
            users.length !== 0 ?
              users.map((user, index) =>
                <Link to={`${user.employeeSearchInfo.id}`}>
                  <SearchItem
                    debouncedValue={debouncedValue}
                    key={index}
                    user={user}
                    isFromBooking
                  />
                </Link>
                  ) :
              value.length === 0 ?
                <div><h3>Введите запрос</h3></div> :
                <div><h3>Не удалось найти сотрудников по этому запросу</h3></div>
        }
      </div>
    </div>
  )
}

export default SearchForm;
