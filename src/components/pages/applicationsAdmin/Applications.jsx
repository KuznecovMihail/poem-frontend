import React, { useState } from "react";
import style from "./style.module.css";
import Application from "./application/Application";
import ModalApplication from "./modalApplication/ModalApplication";
import Filter from "./filter/Filter";
import { useGetApplications } from "../../../hooks/useApplications";
import { Pagination, ConfigProvider, Alert } from "antd";
import { useGetDictionaryForApplications } from "../../../hooks/useDictionaries";
import Modal from "../../common/modal/Modal";
import Spinner from "../../common/spinner/Spinner";

export default function Applications() {
  const [filter, setFilter] = useState(
    "statusId=17&statusId=18&statusId=19&statusId=20&statusId=23"
  );
  const {
    applications,
    isLoading,
    isError,
    total,
    page,
    setPage,
    perPage,
    toggle,
  } = useGetApplications(filter);
  const [typeOfApplicationId, setTypeOfApplicationId] = useState(null);
  const [typeOfReceiptId, setTypeOfReceiptId] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [changedFrom, setChangedFrom] = useState(null);
  const [changedTo, setChangedTo] = useState(null);
  const [createdFrom, setCreatedFrom] = useState(null);
  const [createdTo, setCreatedTo] = useState(null);
  const { data: dict } = useGetDictionaryForApplications();
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [chosenApplication, setChosenAppication] = useState(null);
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
        <h1 className={style.applcations__title}>Управление заявками</h1>
        <Filter
          typeOfApplicationId={typeOfApplicationId}
          setTypeOfApplicationId={setTypeOfApplicationId}
          typeOfReceiptId={typeOfReceiptId}
          setTypeOfReceiptId={setTypeOfReceiptId}
          statusId={statusId}
          setStatusId={setStatusId}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          changedFrom={changedFrom}
          setChangedFrom={setChangedFrom}
          changedTo={changedTo}
          setChangedTo={setChangedTo}
          createdFrom={createdFrom}
          setCreatedFrom={setCreatedFrom}
          createdTo={createdTo}
          setCreatedTo={setCreatedTo}
          setFilter={setFilter}
          setPage={setPage}
          dict={dict}
        />
      </div>
      <div className={style.applcations__list}>
        <table>
          <thead>
            <tr>
              <th>Дата создания</th>
              <th>Номер</th>
              <th>Тип</th>
              <th>Заявитель</th>
              <th>Статус</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <Application
                key={application.id}
                application={application}
                setOpenApplicationModal={setIsApplicationModalOpen}
                setChosenAppication={setChosenAppication}
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
            applications={applications}
            dict={dict}
            toggle={toggle}
          />
        </Modal>
      )}
      {!isError && !isLoading && (
        <div className={style.footer}>
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: "#d9d9d9",
              },
            }}
          >
            <Pagination
              hideOnSinglePage={true}
              defaultPageSize={perPage}
              current={page + 1}
              onChange={(page) => setPage(page - 1)}
              total={total}
              showSizeChanger={false}
            />
          </ConfigProvider>
        </div>
      )}
    </>
  );
}
