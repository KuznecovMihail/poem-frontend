import React from "react";
import style from "./style.module.css";

export default function Modal({
  isModalOpen,
  setIsModalOpen,
  onClose = () => {},
  children,
}) {
  return (
    <div
      className={
        isModalOpen ? [style.modal, style.active].join(" ") : style.modal
      }
      onClick={() => {
        setIsModalOpen(false);
        onClose();
      }}
    >
      <div
        className={
          isModalOpen
            ? [style.modal__content, style.active].join(" ")
            : style.modal__content
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
