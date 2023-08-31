import React, {useMemo} from "react";
import style from "./style.module.css"
import {Alert, Button, Input, Modal, Popconfirm, Select, Upload} from "antd";
import Spinner from "../../../../common/spinner/Spinner";
import {deleteLevel, useAddLevel, useChangeLevel} from "../../../../../hooks/useBooking";


function Level({getLevels, officeId}) {
  const {
    levels,
    levelId,
    trigger,
    handleClearOrSelectLevel,
    isLoading: isLoadingGetLevels,
    isError: isErrorGetLevels,
  } = getLevels

  const {
    newNumber,
    newImageUrl,
    newFileList,
    handleChangeNewFileList,
    preview: previewAddLevel,
    handlePreview: handlePreviewAddLevel,
    handleCancel: handleCancelAddLevel,
    customRequest: customRequestAddLevel,
    beforeUpload,
    handleChangeNewNumber,
    handleClick: handleClickAddLevel,
    alertShow: alertShowAddLevel,
    isError: isErrorAddLevel,
    isLoading: isLoadingAddLevel
  } = useAddLevel(officeId)

  const level = useMemo(() => levels.find(level => level.id === levelId), [levelId, levels])

  const {
    changedNumber,
    changedImageUrl,
    changedFileList,
    handleChangeChangedFileList,
    handleChangeChangedNumber,
    isLoading: isLoadingChangeLevel,
    isError: isErrorChangeLevel,
    alertShow: alertShowChangeLevel,
    handleClick: handleClickChangeLevel,
    customRequest: customRequestChangeLevel,
    preview: previewChangeLevel,
    handleCancel: handleCancelChangeLevel,
    handlePreview: handlePreviewChangeLevel
  } = useChangeLevel(officeId, level)

  if (isLoadingGetLevels) return <Spinner/>

  if (isErrorGetLevels) return <h4>{isErrorGetLevels}</h4>
  return (
    <div className={style.content}>
      <div className={style.first_column}>
        <div>
          <label><h4>Этаж</h4></label>
          <Select
            options={levels.map(level => ({value: level.id, label: level.number}))}
            defaultValue={levelId}
            placeholder="Выберите этаж"
            allowClear
            showSearch
            onSelect={handleClearOrSelectLevel}
            onClear={handleClearOrSelectLevel}
            className={style.select}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </div>
        {levelId &&
          <div>
            <Popconfirm
              onConfirm={e => {
                e.stopPropagation()
                deleteLevel(levelId, trigger)
              }}
              title='Удаление этажа'
              description="Вы уверены?"
              okText="Да"
              cancelText="Нет"
            >
              <Button className={style.delete_button}>Удалить</Button>
            </Popconfirm>
          </div>
        }
      </div>
      <div className={style.form}>
        {levelId ?
          <div>
            <label><h4>Изменить этаж</h4></label>
            <Input
              type="number"
              value={changedNumber}
              onChange={handleChangeChangedNumber}
            />
            <label><h4>План этажа</h4></label>
            <Upload
              className={style.element}
              listType="picture-card"
              fileList={changedFileList}
              customRequest={customRequestChangeLevel}
              maxCount={1}
              onPreview={handlePreviewChangeLevel}
              onChange={handleChangeChangedFileList}
              beforeUpload={beforeUpload}
              accept="image/png, image/jpeg"
            >
              {changedFileList.length < 1 && <div>Загрузить</div>}
            </Upload>
            <Button
              className={style.element}
              onClick={() => handleClickChangeLevel(trigger)}
              disabled={
                !changedNumber ||
                !changedImageUrl ||
                isLoadingChangeLevel
              }
            >
              Сохранить
            </Button>
            {alertShowChangeLevel &&
              <Alert
                className={style.element}
                message={isErrorChangeLevel ? isErrorChangeLevel : "Этаж успешно изменён"}
                type={isErrorChangeLevel ? "error" : "success"}
              />
            }
            <Modal
              open={previewChangeLevel.open}
              title={previewChangeLevel.title}
              footer={null}
              onCancel={handleCancelChangeLevel}
            >
              <img alt="Не удалось загрузить изображение" src={previewChangeLevel.image}/>
            </Modal>
          </div> :
          <div>
            <label><h4>Добавить этаж</h4></label>
            <Input
              className={style.element}
              type="number"
              value={newNumber}
              onChange={handleChangeNewNumber}
            />
            <label><h4>Добавить план этажа</h4></label>
            <Upload
              className={style.element}
              listType="picture-card"
              fileList={newFileList}
              customRequest={customRequestAddLevel}
              maxCount={1}
              onPreview={handlePreviewAddLevel}
              onChange={handleChangeNewFileList}
              beforeUpload={beforeUpload}
              accept="image/png, image/jpeg"
            >
              {newFileList.length < 1 && <div>Загрузить</div>}
            </Upload>
            <Button
              className={style.element}
              onClick={() => handleClickAddLevel(trigger)}
              disabled={isLoadingAddLevel || !newNumber || !newImageUrl}
            >
              Сохранить
            </Button>
            {alertShowAddLevel &&
              <Alert
                className={style.element}
                message={isErrorAddLevel ? isErrorAddLevel : "Этаж успешно добавлен"}
                type={isErrorAddLevel ? "error" : "success"}
              />
            }
            <Modal
              open={previewAddLevel.open}
              title={previewAddLevel.title}
              footer={null}
              onCancel={handleCancelAddLevel}
            >
              <img alt="asd" src={previewAddLevel.image}/>
            </Modal>
          </div>
        }
      </div>
    </div>
  );
}

export default Level;
