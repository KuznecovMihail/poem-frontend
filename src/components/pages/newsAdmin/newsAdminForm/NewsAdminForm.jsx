import React, { useState } from "react";
import style from "./style.module.css";
import noPhoto from "../../../../img/no_photo.png";
import { useForm } from "react-hook-form";
import moment from "moment";
import InputDate from "../../../common/inputDate/InputDate";
import { useCreateNews } from "../../../../hooks/useNews";
import Spinner from "../../../common/spinner/Spinner";
import { postImage } from "../../../../hooks/useImages";
import { Tooltip } from "antd";

export default function NewsAdminForm(props) {
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState();
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [errMessageImage, setErrMessageImage] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const { createNews, isLoading, isError } = useCreateNews();

  const fileReader = new FileReader();
  const formData = new FormData();

  fileReader.onloadend = () => {
    setImageURL(fileReader.result);
  };
  const handleOnChange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      setImage(file);
      fileReader.readAsDataURL(file);
    }
  };

  const disabledDate = (current) => {
    // Запрещаем выбирать прошедшее время
    return current && current < moment().startOf("day");
  };

  const disabledTime = (current, type) => {
    if (type === "time") {
      if (moment().isSame(selectedDateTime, "day")) {
        // Запрещаем выбирать прошедшее время в течение текущего дня
        return current && current < moment().subtract(1, "minute");
      }
    }
    return false;
  };

  const handleDateTimeChange = (value) => {
    setSelectedDateTime(value);
  };

  const onSubmit = async (data) => {
    if (!image) {
      setErrMessageImage("Необходимо загрузить изображение");
      return;
    }
    formData.append("image", image);
    const dataImageUrl = image !== "" ? await postImage(formData) : null;

    const picture = dataImageUrl === null ? null : dataImageUrl.data.imageUrl;

    const formattedDateTime = selectedDateTime
      ? selectedDateTime.subtract(3, "hours").format("YYYY-MM-DD HH:mm")
      : "";

    const paragraphsArray = data.content.split("\n");

    const formattedParagraphs = paragraphsArray.map(
      (paragraph) => `<p>${paragraph}</p>`
    );
    const formattedText = formattedParagraphs.join(" ");

    const post = {
      title: data.title,
      content: formattedText,
      picture: picture,
      datePublication: formattedDateTime,
    };

    await createNews(post);

    props.setButton(!props.button);
  };

  if (isError) return <h1>Что-то пошло не так ...</h1>;

  if (isLoading) return <Spinner />;

  return (
    <div className={style.NewsAdminInput}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Тема</label>
        <input
          type="text"
          placeholder="Не более 150 символов"
          className={`${style.newsAdmin__input} ${style.newsAdmin__input_title}`}
          {...register("title", {
            required: {
              value: true,
              message: "Поле обязательно для заполнения",
            },
            minLength: {
              value: 3,
              message: "Минимум 3 символов в поле Тема",
            },
            maxLength: {
              value: 150,
              message: "Максимум 150 символов",
            },
          })}
        />
        <label htmlFor="">Текст</label>
        <textarea
          placeholder="Не более 2000 символов"
          className={`${style.newsAdmin__input} ${style.newsAdmin__input_content}`}
          {...register("content", {
            required: {
              value: true,
              message: "Поле обязательно для заполнения",
            },
            minLength: {
              value: 3,
              message: "Минимум 3 символов в поле Текст",
            },
            maxLength: {
              value: 2000,
              message: "Максимум 2000 символов",
            },
          })}
        ></textarea>
        <label htmlFor="">Дата и время публикации</label>
        <div className={style.newsAdmin__input_footer}>
          <div className={style.newsAdmin__input_date}>
            <Tooltip placement="rightTop" title="Время по ВДК">
              <div>
                <InputDate
                  showTime={true}
                  format={"DD.MM.YYYY HH:mm"}
                  placeholder={"Дата и время"}
                  disabledDate={disabledDate}
                  disabledTime={disabledTime}
                  onChange={handleDateTimeChange}
                  value={selectedDateTime}
                />
              </div>
            </Tooltip>
          </div>
          <div className={style.newsAdmin__input_img}>
            <div className={style.newsAdmin__input_img_flex}>
              <label
                htmlFor="file-loader"
                className={style.newsAdmin__input_button_custom_img}
              >
                Загрузить фото
              </label>
              <input
                id="file-loader"
                onChange={handleOnChange}
                type="file"
                accept=".png, .jpg, .jpeg"
                className={style.newsAdmin__input_button_img}
                // {...register("file", {
                //   required: {
                //     value: true,
                //     message: "Необходимо добавить картинку",
                //   },
                // })}
              />
            </div>
            <div>
              <div className={style.newsAdmin__input_preview}>
                <img
                  className={style.newsAdmin__input_preview_img}
                  src={imageURL ? imageURL : noPhoto}
                  alt="preview"
                />
              </div>
              <div className={style.newsAdmin__input_preview_title}>
                {image ? image.name : ""}
              </div>
            </div>
          </div>
        </div>
        {errors.title || errors.content || errMessageImage ? (
          <div className={style.form__error}>
            {errors.title?.message ||
              errors.content?.message ||
              errMessageImage}
          </div>
        ) : (
          ""
        )}
        <button
          disabled={!isValid}
          type="submit"
          className={style.newsAdmin__submit}
        >
          Сохранить новость
        </button>
      </form>
    </div>
  );
}
