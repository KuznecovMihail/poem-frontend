import React, { useContext, useState } from "react";
import style from "./style.module.css";
import { Context } from "../../../context/context";
import { useParams } from "react-router-dom";
import {
  useGetApplicationById,
  usePutApplications,
} from "../../../hooks/useApplications";
import Spinner from "../../common/spinner/Spinner";
import { ConfigProvider, Form, Alert } from "antd";
import FieldsForCertificate from "./fieldsForCertificate/FieldForCertificate";
import FieldsForVacation from "./fieldsForVacation/FieldsForVacation";
import FieldsForUnpaidVacation from "./fieldsForUnpaidVacation/FieldsForUnpaidVacation";
import FieldsForIllness from "./fieldsForIllness/FieldsForIllness";
import { useNavigate } from "react-router-dom";

export default function EditApplication() {
  const { employeeId } = useContext(Context);
  const id = parseInt(useParams().id);
  const { application, isLoading, isError } = useGetApplicationById(id);
  const { error, putApplication } = usePutApplications(id);
  const [body, setBody] = useState(null);
  const [isDraft, setIsDraft] = useState(false);
  const navigate = useNavigate();
  if (isError)
    return (
      <Alert
        className={style.edit_error}
        message="Заявки с таким ID не существует"
        type="error"
        showIcon
      />
    );
  if (application?.applicantId !== employeeId && !isLoading)
    return (
      <Alert
        className={style.edit_error}
        message="Доступ запрещен"
        type="error"
        showIcon
      />
    );
  if (
    application?.statusId !== 16 &&
    application?.statusId !== 23 &&
    !isLoading
  )
    return (
      <Alert
        className={style.edit_error}
        message="Заявка c данным статусом не подлежит редактированию"
        type="error"
        showIcon
      />
    );
  if (isLoading) return <Spinner />;
  let header;
  let fields;
  if (application.typeOfApplicationId === 4) {
    header = "Заявка на открытие больничного листа";
    fields = (
      <FieldsForIllness
        application={application}
        setBody={setBody}
        setIsDraft={setIsDraft}
      />
    );
  } else if (application.typeOfApplicationId === 5) {
    header = "Заявка на предоставление планового отпуска";
    fields = (
      <FieldsForVacation
        application={application}
        setBody={setBody}
        employeeId={employeeId}
        setIsDraft={setIsDraft}
      />
    );
  } else if (application.typeOfApplicationId === 6) {
    header = "Заявка на предоставление отгула (неоплачиваемый отпуск)";
    fields = (
      <FieldsForUnpaidVacation
        application={application}
        setBody={setBody}
        setIsDraft={setIsDraft}
      />
    );
  } else if (application.typeOfApplicationId === 7) {
    header = "Заявка на получение справки: для визы";
    fields = (
      <FieldsForCertificate
        application={application}
        setBody={setBody}
        setIsDraft={setIsDraft}
      />
    );
  } else if (application.typeOfApplicationId === 8) {
    header = "Заявка на получение справки: 2НДФЛ";
    fields = (
      <FieldsForCertificate
        application={application}
        setBody={setBody}
        setIsDraft={setIsDraft}
      />
    );
  } else if (application.typeOfApplicationId === 9) {
    header = "Заявка на получение справки: с места работы";
    fields = (
      <FieldsForCertificate
        application={application}
        setBody={setBody}
        setIsDraft={setIsDraft}
      />
    );
  } else if (application.typeOfApplicationId === 10) {
    header = "Заявка на получение справки: копия трудовой книжки";
    fields = (
      <FieldsForCertificate
        application={application}
        setBody={setBody}
        setIsDraft={setIsDraft}
      />
    );
  }
  const onSubmit = async () => {
    const updatedBody = { ...body, statusId: 17 };
    setBody(updatedBody);
    const response = await putApplication(updatedBody);
    if (response?.status === 200) navigate("/applications");
  };
  const saveAsDraft = () => {
    setIsDraft(true);
    const updatedBody = { ...body, statusId: 16 };
    setBody(updatedBody);
    putApplication(updatedBody);
  };
  return (
    <Form initialValues={application} onFinish={onSubmit}>
      <h1 className={style.header}>{header}</h1>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "#d9d9d9",
            borderRadius: "10px",
          },
        }}
      >
        {fields}
        {error && (
          <div className={style.error_block}>
            <Alert
              className={style.put_error}
              message="Что-то пошло не так..."
              type="error"
              showIcon
            />
          </div>
        )}
      </ConfigProvider>
      <div className={style.edit}>
        <button
          disabled={body == null}
          type="submit"
          className={`${style.edit_button} ${!body ? style.disabled : ""}`}
        >
          Отправить заявку
        </button>
        <button
          type="button"
          className={`${style.draft} ${isDraft || !body ? style.disabled : ""}`}
          onClick={saveAsDraft}
          disabled={isDraft || body == null}
        >
          {!isDraft ? "Сохранить (как черновик)" : "Сохранено (как черновик)"}
        </button>
      </div>
    </Form>
  );
}
