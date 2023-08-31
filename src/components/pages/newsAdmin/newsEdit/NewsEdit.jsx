import React, { useState } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import moment from "moment";
import InputDate from "../../../common/inputDate/InputDate";
import { useGetNewsById, useEditNews } from "../../../../hooks/useNews";
import { useNavigate, useParams } from "react-router";
import { postImage } from "../../../../hooks/useImages";
import Spinner from "../../../common/spinner/Spinner";
import { Breadcrumb, ConfigProvider, Tooltip } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import NewsAdminImage from "../newsAdminImage/NewsAdminImage";

export default function NewsAdminForm() {
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const id = parseInt(useParams().id);

  const { news, isLoading, isError } = useGetNewsById(id);

  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const { editNews } = useEditNews(id);
  const navigate = useNavigate();

  const postData = news
    ? {
        title: news.title,
        clearText: news.content.replace(/<\/?p>/g, function (match) {
          if (match === "<p>") {
            return "";
          } else if (match === "</p>") {
            return "\n";
          }
        }),
        defImg: news.picture,
      }
    : "";

  const fileReader = new FileReader();
  const formData = new FormData();

  fileReader.onloadend = async (e) => {
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

  const sendImageUrl = async () => {};

  const onSubmit = async (data) => {
    formData.append("image", image);
    const dataImageUrl = image !== "" ? await postImage(formData) : null;

    const formattedDateTime = selectedDateTime
      ? selectedDateTime.subtract(3, "hours").format("YYYY-MM-DD HH:mm")
      : null;

    const paragraphsArray = data.content.split("\n");

    const formattedParagraphs = paragraphsArray.map(
      (paragraph) => `<p>${paragraph}</p>`
    );
    const formattedText = formattedParagraphs.join(" ");

    const datePublication =
      formattedDateTime === null
        ? moment(news.datePublication, "YYYY-MM-DD HH:mm:ss.SSS Z")
            .subtract(3, "hours")
            .format("YYYY-MM-DD HH:mm")
        : formattedDateTime;

    const picture =
      dataImageUrl === null ? news.picture : dataImageUrl.data.imageUrl;

    console.log(datePublication, formattedDateTime);

    const post = {
      title: data.title,
      content: formattedText,
      picture: picture,
      datePublication: datePublication,
    };

    await editNews(post);
    navigate("/admin");
  };

  if (isError) return <h1>Что-то пошло не так ...</h1>;

  if (isLoading) return <Spinner />;

  const data = moment(news.datePublication, "YYYY-MM-DD HH:mm:ss.SSS Z");

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Roboto, sans-serif",
          },
        }}
      >
        <Breadcrumb
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              href: "/admin",
              title: "Список новостей",
            },
            {
              title: "Редактирование новости",
            },
          ]}
        />
      </ConfigProvider>
      <div className={style.NewsAdminInput}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">Тема</label>
          <input
            type="text"
            placeholder="Не более 150 символов"
            className={`${style.newsAdmin__input} ${style.newsAdmin__input_title}`}
            defaultValue={postData.title}
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
          {errors.title && (
            <div className={style.form__error}>{errors.title.message}</div>
          )}
          <label htmlFor="">Текст</label>
          <textarea
            placeholder="Не более 2000 символов"
            defaultValue={postData.clearText}
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
          {errors.content && (
            <div className={style.form__error}>{errors.content.message}</div>
          )}
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
                    defaultValue={news.datePublication === "" ? null : data}
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
                  accept=".png, .jpeg"
                  className={style.newsAdmin__input_button_img}
                />
              </div>
              <div>
                <NewsAdminImage image={imageURL} imageUrl={news.picture} />
                <div className={style.newsAdmin__input_preview_title}>
                  {image ? image.name : ""}
                </div>
              </div>
            </div>
          </div>
          <button
            disabled={!isValid}
            type="submit"
            className={style.newsAdmin__submit}
            onClick={sendImageUrl}
          >
            Изменить новость
          </button>
        </form>
      </div>
    </>
  );
}
