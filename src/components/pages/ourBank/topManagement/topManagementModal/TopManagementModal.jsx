import React from "react";
import ButtonClose from "../../../../common/buttonClose/ButtonClose";
import style from "./style.module.css";

export default function TopManagementModal({
  setIsModalOpen,
  selectedManager,
  setSelectedManager,
}) {
  if (!selectedManager) return null;
  return (
    <div className={style.modal_container}>
      <div className={style.modal_container__header}>
        <h1>Топ-менеджмент</h1>
        <ButtonClose
          onClick={() => {
            setIsModalOpen(false);
            setSelectedManager(null);
          }}
        />
      </div>
      <hr />
      <div className={style.modal_container__content}>
        <div className={style.modal_container__content__image}>
          <img src={selectedManager.img} alt="manager" />
        </div>
        <div className={style.modal_container__content__text}>
          <h2>{selectedManager.name}</h2>
          <h4 className={style.position}>{selectedManager.position}</h4>
          <p>{selectedManager.description}</p>
        </div>
      </div>
    </div>
  );
}
