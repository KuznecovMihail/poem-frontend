import React, { useState, useContext } from "react";
import { ProfileContext } from "../../../../context/context";
import GiftsChoice from "./giftsChoice/GiftsChoice";
import GreetingsForm from "./greetingsForm/GreetingsForm";
import Card from "../../../common/card/Card";
import Modal from "../../../common/modal/Modal";
import style from "./style.module.css";
import sendGirtImg from "./../../../../img/sendGift.png";

export default function GreetingsCard({ receiverId }) {
  const { fromHomePage, setFromHomePage } = useContext(ProfileContext);
  const [isModalOpen, setIsModalOpen] = useState(fromHomePage);
  const [currentGift, setCurrentGift] = useState(null);

  return (
    <div className={style.greetings}>
      <Card onClick={() => setIsModalOpen(true)}>
        <div className={style.greetings__row}>
          <img src={sendGirtImg} alt="" className={style.greetings__icon} />
          <h4>Отправить подарок</h4>
        </div>
      </Card>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onClose={() => setTimeout(() => setFromHomePage(false), 500)}
      >
        {currentGift ? (
          <GreetingsForm
            gift={currentGift}
            receiverId={receiverId}
            onClose={() => setCurrentGift(null)}
          />
        ) : (
          <GiftsChoice
            onClose={() => {
              setIsModalOpen(false);
              setTimeout(() => setFromHomePage(false), 500);
            }}
            onPick={setCurrentGift}
            fromHomePage={fromHomePage}
          />
        )}
      </Modal>
    </div>
  );
}
