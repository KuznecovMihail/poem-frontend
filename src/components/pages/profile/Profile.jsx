import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useGetProfile } from "../../../hooks/useProfiles";
import { Context, ProfileContext } from "../../../context/context";
import { DELETED_TECHNICAL_CODE } from "./constants";
import Error500 from "./erros/Error500";
import Error404 from "./erros/Error404";
import Avatar from "./avatar/Avatar";
import Deleted from "./deleted/Deleted";
import GiftView from "./gifts/giftView/GiftView";
import VacationsCard from "./vacations/VacationsCard";
import GiftsCard from "./gifts/GiftsCard";
import GreetingsCard from "./interactions/GreetingsCard";
import Spinner from "../../common/spinner/Spinner";
import Body from "./body/Body";
import style from "./style.module.css";

export default function Profile() {
  const id = parseInt(useParams().id);
  const { employeeId } = useContext(Context);
  const { giftId, setGiftId } = useContext(ProfileContext);
  const { employee, setEmployee, isLoading, error } = useGetProfile(id);

  if (error)
    return error?.response?.status === 404 ? <Error404 /> : <Error500 />;

  if (isLoading) return <Spinner />;

  const isCurrentUserPage = id === employeeId;

  if (employee.employeeInfo.employeeStatusId === DELETED_TECHNICAL_CODE)
    return <Deleted />;

  return (
    <div className={style.profile}>
      <div>
        <Avatar {...employee} isCurrentUserPage={isCurrentUserPage} />
        {isCurrentUserPage ? <VacationsCard {...employee} /> : null}
        <GiftsCard id={id} isCurrentUserPage={isCurrentUserPage} />
        {!isCurrentUserPage ? <GreetingsCard receiverId={id} /> : null}
        {giftId ? <GiftView giftId={giftId} setGiftId={setGiftId} /> : null}
      </div>
      <Body
        employee={employee}
        setEmployee={setEmployee}
        isCurrentUserPage={isCurrentUserPage}
      />
    </div>
  );
}
