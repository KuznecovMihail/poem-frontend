import React, { useRef, useState } from "react";
import { message } from "antd";
import { useGetImage } from "../../../../hooks/useImages";
import { patchAvatar } from "../../../../hooks/useProfiles";
import Icon from "../../../common/icon/Icon";
import style from "./style.module.css";

const checkFile = (formData) => {
  const uploadedFile = formData.get("image");

  if (uploadedFile.size / 1024 / 1024 > 5) return "Размер файла превышает 5МБ";

  const imageRegex = /^image\/(jpeg|jpg|png)$/i;

  if (!imageRegex.test(uploadedFile.type))
    return "Формат файла не поддерживается";

  return null;
};

export default function Avatar({ employeeInfo, isCurrentUserPage }) {
  const [imageUrl, setImageUrl] = useState(employeeInfo.imageUrl);
  const [image] = useGetImage(imageUrl, true);

  const filePicker = useRef(null);

  const handleChange = async (e) => {
    const selectedFiles = e.target.files;

    if (selectedFiles.length === 0) {
      message.info("Файл не выбран", 5);
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFiles[0]);

    const checkResult = checkFile(formData);

    if (checkResult) {
      message.error(checkResult);
      return;
    }

    const response = await patchAvatar(formData, employeeInfo.id);

    if (response?.imageUrl) {
      setImageUrl(response.imageUrl);
      message.success("Аватар обновлен", 5);
    } else {
      message.error("Не удалось обновить аватар", 5);
    }
  };

  const handlePick = () => {
    filePicker.current.click();
  };

  return (
    <form className={style.avatar}>
      <img src={image} alt="" />
      {isCurrentUserPage ? (
        <>
          <input
            type="file"
            ref={filePicker}
            accept=".png,.jpeg,.jpg"
            onChange={handleChange}
          />
          <Icon className={style.avatar__icon} onClick={handlePick} />
        </>
      ) : null}
    </form>
  );
}
