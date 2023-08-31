import React, { useState, useContext } from "react";
import style from "./style.module.css";
import button_icon from "../../../img/pen_button.svg";
import Application from "./application/Application";
import ModalApplication from "./modalApplication/ModalAppliction";
import ModalDelete from "./modalDelete/ModalDelete";
import { useGetUsersApplications } from "../../../hooks/useApplications";
import { Pagination, Alert } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useGetDictionaryForApplications } from "../../../hooks/useDictionaries";
import ButtonGradientCustom from "../../common/buttonGradient/ButtonGradientCustom";
import Modal from "../../common/modal/Modal";
import Spinner from "../../common/spinner/Spinner";
import { Context } from "../../../context/context";

export default function Applications() {
  const { employeeId } = useContext(Context);
  const {
    applications,
    setApplications,
    isLoading,
    isError,
    total,
    page,
    setPage,
    perPage,
  } = useGetUsersApplications(employeeId);
  const { data: dict } = useGetDictionaryForApplications();
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [chosenApplication, setChosenAppication] = useState(null);
  const { state } = useLocation();
  function convertDate(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear().toString();
    return `${day}.${month}.${year}`;
  }
  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <Alert
        className={style.get_error}
        message="Не удалось получить данные"
        type="error"
        showIcon
      />
    );
  return (
    <>
      <div className={style.applcations__header}>
        <h1 className={style.applcations__title}>Мои заявки</h1>
        <Link to="/applications/create">
          <ButtonGradientCustom>
            <img src={button_icon} alt="icon" />
            Создать заявку
          </ButtonGradientCustom>
        </Link>
      </div>
      <div className={style.applcations__list}>
        <table>
          <thead>
            <tr>
              <th>Дата создания</th>
              <th>Номер</th>
              <th>Тип</th>
              <th>Статус</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <Application
                state={state === application.id ? state : null}
                key={application.id}
                application={application}
                setOpenApplicationModal={setIsApplicationModalOpen}
                setChosenAppication={setChosenAppication}
                setOpenDeleteModal={setIsDeleteModalOpen}
                convertDate={convertDate}
                dict={dict}
              />
            ))}
          </tbody>
        </table>
      </div>
      {chosenApplication && (
        <Modal
          isModalOpen={isApplicationModalOpen}
          setIsModalOpen={setIsApplicationModalOpen}
        >
          <ModalApplication
            setIsModalOpen={setIsApplicationModalOpen}
            convertDate={convertDate}
            applicationId={chosenApplication}
            dict={dict}
            employeeId={employeeId}
          />
        </Modal>
      )}
      <Modal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
      >
        <ModalDelete
          setIsModalOpen={setIsDeleteModalOpen}
          applicationId={chosenApplication}
          setApplications={setApplications}
          applications={applications}
          setChosenAppication={setChosenAppication}
        />
      </Modal>
      {!isError && !isLoading && (
        <div className={style.footer}>
          <Pagination
            hideOnSinglePage={true}
            defaultPageSize={perPage}
            current={page + 1}
            onChange={(page) => setPage(page - 1)}
            total={total}
            showSizeChanger={false}
          />
        </div>
      )}
    </>
  );
}
