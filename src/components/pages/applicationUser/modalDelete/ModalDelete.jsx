import React, { useEffect } from "react";
import style from "./style.module.css";
import { message } from "antd";
import { useDeleteApplication } from "../../../../hooks/useApplications";
import ButtonClose from "../../../common/buttonClose/ButtonClose";
import ButtonGradientCustom from "../../../common/buttonGradient/ButtonGradientCustom";

export default function ModalDelete(props) {
  const {
    setIsModalOpen,
    setChosenAppication,
    applicationId,
    applications,
    setApplications,
  } = props;
  const { isError, deleteApplication } = useDeleteApplication();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (isError) {
      messageApi.open({
        type: "error",
        content: "Возникла ошибка",
      });
    }
  }, [isError, messageApi]);

  if (!applicationId) return null;
  const onClose = () => {
    setIsModalOpen(false);
    setChosenAppication(null);
  };
  const handleDelete = () => {
    deleteApplication(applicationId, applications, setApplications, onClose);
  };
  return (
    <>
      {contextHolder}
      <div className={style.header}>
        <ButtonClose onClick={onClose} />
      </div>
      <div className={style.content}>
        <div className={style.message}>
          <p>Вы действительно хотите удалить эту заявку?</p>
        </div>
        <div className={style.action}>
          <ButtonGradientCustom onClick={handleDelete}>Да</ButtonGradientCustom>
          <button className={style.button_no} onClick={onClose}>
            Нет
          </button>
        </div>
      </div>
    </>
  );
}
