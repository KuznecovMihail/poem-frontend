import React from "react";
import search from "../../../../img/search.svg";
import style from "./style.module.css";
import SearchItem from "./searchItem/SearchItem";
import Spinner from "../../../common/spinner/Spinner";
import { useSearch } from "../../../../hooks/useProfiles";

export default function Search() {
  const {
    value,
    isFocused,
    isLoading,
    isError,
    users,
    setIsFocused,
    debouncedValue,
    handleInput,
  } = useSearch();

  return (
    <div
      className={style.header__search}
      style={{ zIndex: isFocused ? 1001 : 0 }}
    >
      <div className={style.form}>
        <input
          value={value}
          onChange={handleInput}
          onFocus={() => setIsFocused(true)}
          tabIndex={2}
          className={style.input_search}
          placeholder={
            isFocused
              ? "Введите ФИО, телефон, табельный номер или email в свободной форме"
              : "Найти коллегу"
          }
          type="search"
        />
        <img
          src={search}
          alt="search"
          className={style.input_img}
          style={{
            justifyContent: isError || isLoading ? "center" : "space-between",
          }}
        />
        {isFocused && (
          <div className={style.result}>
            {isError ? (
              "Что-то пошло не так"
            ) : isLoading ? (
              <Spinner />
            ) : users.length !== 0 ? (
              users.map((user, i) => (
                <SearchItem
                  debouncedValue={debouncedValue}
                  key={i}
                  user={user}
                  onClick={() => setIsFocused(false)}
                />
              ))
            ) : value.length === 0 ? (
              "Введите запрос"
            ) : (
              "Не удалось найти сотрудников по этому запросу"
            )}
          </div>
        )}
      </div>
      {isFocused && (
        <div className={style.overlay} onClick={() => setIsFocused(false)} />
      )}
    </div>
  );
}
