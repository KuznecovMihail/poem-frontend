import React, { useContext, useState } from "react";
import TopManagementModal from "./topManagementModal/TopManagementModal";
import Khismatullin from "../../../../img/Khismatullin.jpg";
import Korovin from "../../../../img/Korovin.jpeg";
import style from "./style.module.css";
import Card from "../../../common/card/Card";
import Modal from "../../../common/modal/Modal";
import Spinner from "../../../common/spinner/Spinner";
import { useGetProfile } from "../../../../hooks/useProfiles";
import { Context } from "../../../../context/context";

export default function TopManagement() {
  const { employeeId } = useContext(Context);
  const { isLoading, isError } = useGetProfile(employeeId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  function handleClick(manager) {
    setSelectedManager(manager);
    setIsModalOpen(true);
  }

  const top_management = [
    {
      name: "Хисматуллин Руслан Ильгизович",
      img: Khismatullin,
      position: "Заместитель Председателя Правления, член Правления",
      description:
        "В 1998 году окончил Московский авиационно-технологический университет им. Циолковского, факультет Прикладная математика и информационные технологии, АСУ. Долгое время работал в Альфа-банке, где вырос из старшего системного аналитика до директора Дирекции технологий массового бизнеса Блока «Информационные технологии». Руководил банковским центром компетенций в IBM/Восточная Европа/Азия. Также возглавлял ИТ-направления ХОУМ КРЕДИТ ЭНД ФИНАНС БАНК и ВТБ.",
    },
    {
      name: "Коровин Вадим Анатольевич",
      img: Korovin,
      position: "Директор по персоналу",
      description:
        "Обладает опытом работы в крупных финансовых и консалтинговых организациях России (в частности, в страховой компании «Ингосстрах»). До перехода в сферу управления персоналом он возглавлял службу внутреннего аудита в «Ингосстрахе», работал в консалтинговых компаниях «большой четверки», более 5 лет проработал в области управления кредитными рисками. 11 января 2021 года назначен директором по персоналу Азиатско-Тихоокеанского банка. Вадим Коровин успешно окончил университет Васэда (Waseda University) в Токио, получив степень MBA (магистр управления бизнесом). Имеет международную сертификацию в области управления персонала CIPD. Женат, 1 ребенок. Владеет английским языком.",
    },
  ];
  if (isError) return <h1>Что-то пошло не так...</h1>;

  if (isLoading) return <Spinner />;
  return (
    <div>
      <h1 className={style.title}>Топ-менеджмент</h1>
      <div className={style.cards}>
        {top_management.map((manager, index) => (
          <Card onClick={() => handleClick(manager)} key={index}>
            <img className={style.card_image} src={manager.img} alt="manager" />
            <p className={style.card_title}>{manager.name}</p>
            <p className={style.card_content}>{manager.position}</p>
          </Card>
        ))}
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <TopManagementModal
            setIsModalOpen={setIsModalOpen}
            selectedManager={selectedManager}
            setSelectedManager={setSelectedManager}
          />
        </Modal>
      </div>
    </div>
  );
}
