import React from "react";
import ButtonClose from "../../../../../common/buttonClose/ButtonClose";
import style from "./style.module.css";
import Guest from "./Guest/Guest";
import {useGetOfficeLevelsWithWorkspaces} from "../../../../../../hooks/useBooking";
import {useGetImage} from "../../../../../../hooks/useImages";

export default function View({ setIsModalOpen, view }) {
  const {levelImage} = useGetOfficeLevelsWithWorkspaces(view.levelId)
  const [plan] = useGetImage(levelImage, false)
  console.log(view)
  return (
    <div className={style.view}>
      <div className={style.view__header}>
        <ButtonClose onClick={() => setIsModalOpen(false)} />
      </div>
      <div className={style.view__body}>
        <div>
          <h2>Гости</h2>
          {view.guests.length === 0 ? (
            <h4>Список гостей пуст</h4>
          ) : (
            view.guests.map((guest, i) => {
              return <Guest guest={guest} key={i}/>;
            })
          )}
        </div>
        <div className={style.info}>
          <h2>План этажа</h2>
          <img alt="" className={style.plan} src={plan}/>
          <p>{view.workspaceInfo.description}</p>
        </div>
      </div>
    </div>
  );
}
