import React, { useCallback, useMemo } from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";
import regexifyString from "regexify-string";
import Card from "../../../../common/card/Card";
import { useGetImage } from "../../../../../hooks/useImages";

function SearchItem({
  user: { employeeSearchInfo, divisionInfo },
  debouncedValue,
  onClick,
  isFromBooking
}) {
  const name = `${employeeSearchInfo.lastName} ${employeeSearchInfo.firstName} ${employeeSearchInfo.middleName} `;
  const [imgUrl] = useGetImage(employeeSearchInfo.imageUrl, true);
  const arrOfQuery = useMemo(
    () =>
      debouncedValue
        .trim()
        .split(" ")
        .filter((el) => el !== "")
        .map((el) => (el === "." ? String.raw`\.` : el)),
    [debouncedValue]
  );
  const highlightText = useCallback(
    (text) => {
      if (!arrOfQuery.length) return text;
      return regexifyString({
        pattern: new RegExp(arrOfQuery.join("|"), "i"),
        decorator: (match, index) => (
          <span className={style.concurrence} key={index}>
            {match}
          </span>
        ),
        input: text,
      });
    },
    [arrOfQuery]
  );
  return (
    <Card className={style.content} onClick={isFromBooking ? () => null : false}>
      <div className={style.avatar}>
        <img alt="" src={imgUrl} className={style.img} />
        {isFromBooking ?
          <p className={style.name}>{highlightText(name)}</p> :
          <Link to={`/user/${employeeSearchInfo.id}`} onClick={onClick}>
            <p className={style.name}>{highlightText(name)}</p>
          </Link>
        }
        <p className={style.position}>{employeeSearchInfo.position}</p>
      </div>
      <div className={style.info}>
        {employeeSearchInfo?.phone && (
          <p className={style.info_item}>
            Телефон: {highlightText(employeeSearchInfo.phone)}
          </p>
        )}
        <p className={style.info_item}>
          E-mail: {highlightText(employeeSearchInfo.email)}
        </p>
        <p className={style.info_item}>
          Подразделение: {divisionInfo.titleDivision}
        </p>
        <p className={style.info_item}>
          Табельный номер:{" "}
          {highlightText(String(employeeSearchInfo.personnelNumber))}
        </p>
      </div>
    </Card>
  );
}

export default SearchItem;
