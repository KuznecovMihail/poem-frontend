import React, { useState } from "react";
import NewsAdminButton from "./newsAdminButton/NewsAdminButton.jsx";
import NewsAdminForm from "./newsAdminForm/NewsAdminForm";
import NewsList from "./newsList/NewsList";
import style from "./style.module.css";

export default function NewsAdmin(props) {
  const [button, setButton] = useState(true);

  return (
    <section className={style.news_admin}>
      <div className={style.news_admin__container}>
        <NewsAdminButton button={button} setButton={setButton} />
        {button === false ? (
          <NewsAdminForm button={button} setButton={setButton} />
        ) : (
          <NewsList />
        )}
      </div>
    </section>
  );
}
