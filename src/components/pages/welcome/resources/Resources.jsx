import React from "react";
import Card from "../../../common/card/Card";
import Tooltip from "../../../common/tooltip/Tooltip";
import confluenceImg from "../static/confluence.png";
import remoteLearn from "../static/remoteLearn.jpg";
import jiraImg from "../static/jira.png";
import docsImg from "../static/docs.png";
import bankImg from "../static/bank.png";
import mailImg from "../static/mail.png";
import style from "./style.module.css";

const cards = [
  {
    id: 1,
    title: "Confluence (рабочая)",
    url: "https://wiki.atb.su/",
    image: confluenceImg,
    desc: "База знаний для продуктовых команд и команд разработки",
  },
  {
    id: 2,
    title: "Jira",
    url: "https://task.atb.su/",
    image: jiraImg,
    desc: "Трекер задач для продуктовых команд и производственных процессов банка, связанных с проектным управлением",
  },
  {
    id: 3,
    title: "СЭД / Центр документов",
    url: "http://portal.atb.su/",
    image: docsImg,
    desc: "Система электронного документооборота для оформления и согласования внутренних документов в банке",
  },
  {
    id: 4,
    title: "Внутренний портал банка",
    url: "http://portal.atb.su/",
    image: bankImg,
    desc: "Портал для сотрудников банка",
  },
  {
    id: 5,
    title: "Корпоративный университет банка",
    url: "https://blgatb-webtutor.atb.su/",
    image: bankImg,
    desc: "Портал университета банка",
  },
  {
    id: 6,
    title: "Confluence (учебная)",
    url: "https://wiki.atbplugin.tech",
    image: confluenceImg,
    desc: "База знаний для обучающего проекта ATB-Plugin",
  },
  {
    id: 7,
    title: "Система дистанционного обучения",
    url: "https://atbplugin.ispringlearn.ru/dashboard",
    image: remoteLearn,
    desc: "Система дистанционного обучения, используемая в рамках проекта ATB-Plugin",
  },
  {
    id: 8,
    title: "Веб-почта",
    url: "https://mail.atb.su/owa/",
    image: mailImg,
    desc: "Веб-доступ к почтовому серверу",
  },
];

export default function Resources() {
  return (
    <div className={style.resources}>
      <div className={style.resources__flex}>
        {cards.map((card) => (
          <Card key={card.id}>
            <div className={style.resources__item}>
              <Tooltip text={card.desc}>
                <img src={card.image} alt="" />
              </Tooltip>
              <a href={card.url}>{card.title}</a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
