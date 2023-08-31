import React, {useState, useEffect} from "react";
import style from "./style.module.css";
import {ConfigProvider, Switch} from "antd";
import ButtonClose from "../../../../common/buttonClose/ButtonClose";

const Modal = ({isOpen, toggleModal, children, viewFlags, handleChangeSwitch}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  if (!showModal) {
    return null;
  }

  return (
    <div className={style.modal_overlay} onClick={toggleModal}>
      <div
        className={style.modal_content}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={style.title}>
          <h3>Уведомления</h3>
          <ButtonClose onClick={() => setShowModal(false)}/>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ff7a45",
              fontFamily: "Roboto, sans-serif",
            },
          }}
        >
          <div className={style.filter_container}>
            <Switch onChange={handleChangeSwitch} style={{margin: "10px 0"}}/>
            <span className={style.switch_text}>{viewFlags ? "Показать все" : "Показать непрочитанные"}</span>
          </div>
        </ConfigProvider>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
