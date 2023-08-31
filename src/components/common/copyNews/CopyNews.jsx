import React from "react";
import style from "./style.module.css";
import { message } from "antd";

export default function CopyNews(props) {
  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Ссылка скопирована в буфер обмена");
      })
      .catch((error) => {
        console.error("Ошибка при копировании в буфер обмена:", error);
      });
  }

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Ссылка скопирована",
      duration: 1.5,
    });
  };

  return (
    <>
      {contextHolder}
      <p
        className={style.copy_news}
        onClick={() => {
          success();
          copyToClipboard(props.url);
        }}
      >
        Копировать ссылку
      </p>
    </>
  );
}
