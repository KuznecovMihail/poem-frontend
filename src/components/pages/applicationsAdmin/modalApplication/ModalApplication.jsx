import React, { useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, message, ConfigProvider } from "antd";
import style from "./style.module.css";
import { usePatchApplication } from "../../../../hooks/useApplications";
import ButtonClose from "../../../common/buttonClose/ButtonClose";
import ButtonGradientCustom from "../../../common/buttonGradient/ButtonGradientCustom";
import { useGetApplicationById } from "../../../../hooks/useApplications";
import Spinner from "../../../common/spinner/Spinner";
import { useGetProfile } from "../../../../hooks/useProfiles";

export default function Modal(props) {
  const { setIsModalOpen, applicationId, convertDate, dict, toggle } = props;
  const { application, isLoading } = useGetApplicationById(applicationId);
  const { employee, isLoading: ProfileLoading } = useGetProfile(
    application?.applicantId
  );
  const { isError, updateStatus } = usePatchApplication();
  const [messageApi, contextHolder] = message.useMessage();
  const fullName = employee
    ? `${employee.employeeInfo.lastName} ${employee.employeeInfo.firstName} ${employee.employeeInfo.middleName}`
    : "";
  useEffect(() => {
    if (isError) {
      messageApi.open({
        type: "error",
        content: "Возникла ошибка",
      });
    }
  }, [isError, messageApi]);
  if (!application) return null;
  let fieldsToRender;
  if (application.typeOfApplicationId === 4) {
    fieldsToRender = (
      <>
        <p>
          <b>Номер больничного листа:</b>{" "}
          {application.illnessListNumber || "Не приложено"}
        </p>
        <p>
          <b>Дата открытия больничного:</b> {convertDate(application.started)}
        </p>
        <p>
          <b>Дата закрытия больничного:</b>{" "}
          {application.ended ? convertDate(application.ended) : "Не указано"}
        </p>
      </>
    );
  } else if (application.typeOfApplicationId === 5) {
    fieldsToRender = (
      <>
        <p>
          <b>Дата начала отпуска:</b> {convertDate(application.started)}
        </p>
        <p>
          <b>Дата окончания отпуска:</b> {convertDate(application.ended)}
        </p>
      </>
    );
  } else if (application.typeOfApplicationId === 6) {
    fieldsToRender = (
      <>
        <p>
          <b>Дата начала отгула:</b> {convertDate(application.started)}
        </p>
        <p>
          <b>Дата окончания отгула:</b> {convertDate(application.ended)}
        </p>
        <p>
          <b>Комментарий:</b> {application.absenceReason || "Не указано"}
        </p>
      </>
    );
  } else if (application.typeOfReceiptId === 3) {
    fieldsToRender = (
      <>
        <p>
          <b>Тип получения:</b>{" "}
          {application.typeOfReceiptId
            ? dict?.find((obj) => obj.id === application.typeOfReceiptId)
                ?.valueName
            : "Не указано"}
        </p>
        <p>
          <b>Адрес доставки:</b> {application.deliveryAddress || "Не указано"}
        </p>
        <p>
          <b>Формат получаемого документа:</b>{" "}
          {application.categoryId
            ? dict?.find((obj) => obj.id === application.categoryId)?.valueName
            : "Не указано"}
        </p>
      </>
    );
  } else {
    fieldsToRender = (
      <>
        <p>
          <b>Тип получения:</b>{" "}
          {application.typeOfReceiptId
            ? dict?.find((obj) => obj.id === application.typeOfReceiptId)
                ?.valueName
            : "Не указано"}
        </p>
        <p>
          <b>Формат получаемого документа:</b>{" "}
          {application.categoryId
            ? dict?.find((obj) => obj.id === application.categoryId)?.valueName
            : "Не указано"}
        </p>
      </>
    );
  }
  const onClose = () => {
    setIsModalOpen(false);
  };
  const items = [];
  switch (application.statusId) {
    case 17:
      items.push({ label: "В работе", key: "18" });
      break;
    case 18:
      items.push(
        { label: "Выполнена", key: "19" },
        { label: "Отказано", key: "20" }
      );
      break;
    default:
      break;
  }
  if (application.typeOfApplicationId === 4 && application.statusId === 18)
    items.push({ label: "Требует доработки", key: "23" });
  const onClick = ({ key }) => {
    updateStatus(applicationId, parseInt(key), toggle, onClose);
  };
  if (isLoading || ProfileLoading) return <Spinner />;
  return (
    <>
      {contextHolder}
      <div className={style.header}>
        <ButtonClose onClick={onClose} />
      </div>
      <div className={style.content}>
        <p>
          <b>Дата создания:</b> {convertDate(application.created)}
        </p>
        <p>
          <b>Тип заявки:</b>{" "}
          {
            dict?.find((obj) => obj.id === application.typeOfApplicationId)
              ?.valueName
          }
        </p>
        <p>
          <b>Заявитель:</b> {fullName}
        </p>
        {fieldsToRender}
        <ConfigProvider
          theme={{
            token: {
              fontSize: 16,
            },
          }}
        >
          <Dropdown
            menu={{
              items,
              onClick,
            }}
            trigger={["click"]}
          >
            <ButtonGradientCustom>
              <Space>
                Изменить статус
                <DownOutlined style={{ color: "white", fontSize: 20 }} />
              </Space>
            </ButtonGradientCustom>
          </Dropdown>
        </ConfigProvider>
      </div>
    </>
  );
}
