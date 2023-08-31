import React, {useContext} from "react";
import {Card} from "antd";
import useNotifications from "./hooks/useNotifications";
import {Notification} from "./Notification";
import Modal from "./modal/Modal";
import {Pagination} from "antd"
import style from "./style.module.css"
import {Context} from "../../../../context/context";

export function NotificationModal(props) {
  const {employeeId} = useContext(Context)
  const {
    notifications,
    isError,
    isLoading,
    page,
    setPage,
    totalPage,
    perPage,
    viewFlags,
    handleChangeSwitch,
    dict
  } = useNotifications(employeeId)
  return (
    <div>
      <Modal
        isOpen={props.isModalOpen}
        toggleModal={() => props.setIsModalOpen(!props.isModalOpen)}
        viewFlags={viewFlags}
        handleChangeSwitch={handleChangeSwitch}
      >
        {isError ?
          isError :
          isLoading ?
            (<Card style={{border: "0px"}} loading={isLoading}></Card>) :
            notifications.length === 0 ?
              viewFlags ? "У вас пока нет непрочитанных уведомлений" : "У вас пока нет уведомлений" :
              notifications.map((notification, index) => (
                <Notification key={index} notification={notification} dict={dict} setIsModalOpen={props.setIsModalOpen}
                              toggle={props.toggle}/>
              ))
        }
        {!isError && !isLoading && !(notifications.length === 0) && (
          <div className={style.footer}>
            <Pagination current={page} onChange={page => setPage(page)} total={perPage * totalPage}/>
          </div>
        )}
      </Modal>
    </div>
  )
}
