import React from "react";
import { Upload } from "antd";
import style from "./style.module.css";
import { useVacationFileUpload } from "../../../../hooks/useProfiles";
import Modal from "../../../common/modal/Modal.jsx";
import ButtonClose from "../../../common/buttonClose/ButtonClose";
import Button from "../../../common/buttonGradient/ButtonGradientCustom";
import Table from "./table/Table";

function UploadVacationFile(props) {
  const {
    dataSource,
    errorText,
    isUpLoading,
    isModalOpen,
    downloadLink,
    errorStatus,
    fileName,
    setIsModalOpen,
    setErrorText,
    handleLoad,
  } = useVacationFileUpload("holiday/uploadFile");
  const typeCheck = (file) => {
    const isCSV =
      file.type === "application/vnd.ms-excel" || file.type === "text/csv";
    if (!isCSV) {
      setErrorText("Неверный формат файла");
      setIsModalOpen(true);
    }
    const isSmallerThan10MB = file.size <= 10 * 1024 * 1024;
    if (!isSmallerThan10MB) {
      setErrorText("Размер файла не должен превышать 10MB");
      setIsModalOpen(true);
    }
    return (isCSV && isSmallerThan10MB) || Upload.LIST_IGNORE;
  };
  return (
    <>
      <div className={style.flex_column}>
        <div className={style.content}>
          <div className={style.button_load}>
            <Upload
              name="file"
              customRequest={({ onSuccess }) => onSuccess("OK")}
              onChange={handleLoad}
              multiple={false}
              maxCount={1}
              accept=".csv"
              beforeUpload={typeCheck}
            >
              <Button>Загрузить файл</Button>
            </Upload>
          </div>
          <div>
            <Table data={dataSource} isLoading={isUpLoading}></Table>
          </div>
        </div>
      </div>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <div className={style.modal_content}>
          <div className={style.modal_close_button}>
            <ButtonClose onClick={() => setIsModalOpen(false)} />
          </div>
          <div className={style.modal_main_content}>
            <div className={style.error_title}>Ошибка загрузки файла</div>
            <div className={style.error_message}>
              {errorStatus !== 422 ? (
                <p className={style.error_text}>{errorText}</p>
              ) : (
                <p className={style.error_text}>
                  {errorText}
                  <a className={style.error_file} href={downloadLink}>
                    {fileName}
                  </a>
                </p>
              )}
            </div>
          </div>
          <div style={{ height: 25 }}></div>
        </div>
      </Modal>
    </>
  );
}

export default UploadVacationFile;
