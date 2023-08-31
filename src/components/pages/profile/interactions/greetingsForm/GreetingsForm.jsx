import React from "react";
import { message } from "antd";
import { useForm } from "react-hook-form";
import { useGetImage } from "../../../../../hooks/useImages";
import { usePostInteraction } from "../../../../../hooks/useInteractions";
import ButtonClose from "../../../../common/buttonClose/ButtonClose";
import Spinner from "../../../../common/spinner/Spinner";
import style from "./style.module.css";

export default function GreetingsForm({ gift, receiverId, onClose }) {
  const [image] = useGetImage(gift.imageLink);

  const { isLoading, postInteraction } = usePostInteraction();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      receiverId: receiverId,
      typeId: gift.typeId,
      imageInteractionId: gift.id,
    },
    mode: "all",
  });

  const onSubmit = async (data) => {
    const response = await postInteraction(data);

    if (response?.status === 201) {
      message.success("Подарок отправлен", 5);
      onClose();
    } else {
      message.error("Не удалось отправить подарок", 5);
    }
  };

  if (isLoading)
    return (
      <div className={style.greetingsForm}>
        <div className={style.greetingsForm__header}>
          <h3>Отправляем подарок</h3>
          <ButtonClose onClick={onClose} />
        </div>
        <hr />
        <Spinner />
      </div>
    );

  return (
    <div className={style.greetingsForm}>
      <div className={style.greetingsForm__header}>
        <h3>Добавьте сообщение</h3>
        <ButtonClose onClick={onClose} />
      </div>
      <hr />
      <div className={style.greetingsForm__body}>
        <div className={style.greetingsForm__box}>
          <img src={image} alt="" />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Ваше сообщение</h4>
        <textarea
          className={style.greetingsForm__text}
          {...register("text", {
            required: {
              value: true,
              message: "Заполните поле",
            },
            maxLength: {
              value: 255,
              message: "Превышение длины",
            },
          })}
        />
        <div className={style.greetingsForm__error}>
          {errors.text ? (
            <div>
              <p>{errors?.text?.message}</p>
            </div>
          ) : null}
        </div>
        <div className={style.greetingsForm__footer}>
          <button onClick={onClose}>
            <h4>Отменить</h4>
          </button>
          <button type="submit" className={isValid ? style.marked : undefined}>
            <h4>Отправить</h4>
          </button>
        </div>
      </form>
    </div>
  );
}
