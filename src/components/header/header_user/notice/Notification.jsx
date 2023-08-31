import React, { useContext } from "react";
import { Col, Row } from "antd";
import thank from "../../../../img/thank.png";
import gift from "../../../../img/gift.png";
import paper from "../../../../img/paper.svg";
import calendar from "../../../../img/calendar.svg";
import defaultNotification from "../../../../img/defaultNotification.svg";
import style from "./style.module.css";
import { Link } from "react-router-dom";
import convert from "./datetimeConverter";
import { instance } from "../../../../api/api.config";
import { Context, ProfileContext } from "../../../../context/context";
import { BASE_URL_NOTIFICATIONS } from "../../../../hooks/config";

export function Notification({ notification, dict, setIsModalOpen, toggle }) {
  const { employeeId } = useContext(Context);
  const { setGiftId } = useContext(ProfileContext);
  const { id, subjectId, typeId, dateCreate, dateView } = notification;
  let { text } = notification;
  const currDict = dict.find((dict) => dict.id === typeId);
  text = text.split("%");
  let icon;
  let linkTo;
  let giftId = null;

  switch (currDict?.technicalCode) {
    case "tc10":
      linkTo = `/applications`;
      icon = paper;
      break;
    case "tc11":
      linkTo = `/user/${employeeId}`;
      icon = currDict.valueCode === "n4" ? gift : thank;
      giftId = subjectId;
      break;
    case "tc12":
      linkTo = "/bookings";
      icon = calendar;
      break;
    default:
      icon = defaultNotification;
      linkTo = "/";
      break;
  }
  const handleClick = () => {
    if (giftId) setGiftId(giftId);

    if (!dateView)
      instance
        .post(`${BASE_URL_NOTIFICATIONS}/notifications/${id}/view`)
        .then(() => toggle())
        .catch((err) => console.error(err));
    setIsModalOpen(false);
  };
  return (
    <Row justify={"space-between"} className={style.notification_wrapper}>
      <Col span={1} className={style.img_container}>
        <div className={dateView ?? style.not_viewed}></div>
      </Col>
      <Col span={3} className={style.img_container}>
        <img alt="" className={style.img} src={icon} />
      </Col>
      <Col span={18}>
        <Col span={24}>
          {text[0]}
          <Link
            to={linkTo}
            className={style.notification_link}
            onClick={handleClick}
          >
            {text[1]}
          </Link>
          {text[2]}
        </Col>
        <Col className={style.dateText}>{convert(dateCreate)}</Col>
      </Col>
    </Row>
  );
}
