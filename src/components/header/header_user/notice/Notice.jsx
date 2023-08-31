import React, { useContext, useState } from "react";
import style from "./style.module.css";
import { NotificationModal } from "./NotificationModal";
import { Badge } from "antd";
import useCountOfNotification from "./hooks/useCountOfNotification";
import { Context } from "../../../../context/context";
import { BellOutlined } from "@ant-design/icons";

export default function Notice() {
  const { employeeId } = useContext(Context);
  const { countOfNotification, toggle } = useCountOfNotification(employeeId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <NotificationModal
          toggle={toggle}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
      <Badge count={countOfNotification} offset={[-10, 45]} overflowCount={50}>
        <BellOutlined
          className={style.header__notice}
          onClick={() => setIsModalOpen(!isModalOpen)}
          style={{ fontSize: "36px", color: "#ff7839" }}
        />
      </Badge>
    </>
  );
}
