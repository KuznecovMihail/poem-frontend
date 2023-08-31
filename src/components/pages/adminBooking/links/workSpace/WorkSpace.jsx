import React, {useMemo} from "react";
import {deleteWorkspace, useAddWorkspace, useChangeWorkspace} from "../../../../../hooks/useBooking";
import style from "./style.module.css"
import {Alert, Button, Input, Modal, Popconfirm, Select, Tooltip, Upload} from "antd";
import Spinner from "../../../../common/spinner/Spinner";

const {Option} = Select
const {TextArea} = Input

function WorkSpace({getWorkspaces, levelId}) {
  const {
    workspaces,
    workspaceId,
    isLoading: isLoadingGetWorkspaces,
    isError: isErrorGetWorkspaces,
    trigger,
    handleClearOrSelectWorkspace
  } = getWorkspaces

  const {
    types,
    handleChangeNewTypeId,
    handleChangeNewDescription,
    handleChangeNewNumberOfWorkspaces,
    handleClick,
    newNumberOfWorkSpaces,
    newDescription,
    newTypeId,
    alertShow: alertShowAddWorkspace,
    isError: isErrorAddWorkspace,
    isLoading: isLoadingAddWorkspace
  } = useAddWorkspace(levelId)
  const workspace = useMemo(() => workspaces.find(workspace => workspace.id === workspaceId), [workspaceId, workspaces])
  const renderedWorkspaces = useMemo(() => workspaces.map((workspace, i) => (
    <Option value={workspace.id} key={i} label={workspace.description}>
      <div className={style.option_content}>
        <Tooltip title={workspace.description}>
            {workspace.description}
        </Tooltip>
      </div>
    </Option>
  )), [workspaces])
  const {
    alertShow: alertShowChangeWorkspace,
    customRequest,
    handleChangeChangedNumberOfWorkspaces,
    handleChangeChangedFileList,
    handlePreview,
    handleCancel,
    handleChangeChangedDescription,
    handleClick: handleClickChangeWorkspace,
    changedActivity,
    changedDescription,
    changedNumberOfWorkSpaces,
    setChangedActivity,
    preview,
    changedFileList,
    // changedImageUrls,
    isError: isErrorChangeWorkspace,
    isLoading: isLoadingChangeWorkspace,
    beforeUpload,
    handleRemove
  } = useChangeWorkspace(levelId, workspace)

  if (isLoadingGetWorkspaces) return <Spinner/>

  if (isErrorGetWorkspaces) return <h4>{isErrorGetWorkspaces}</h4>

  return (
    <div className={style.content}>
      <div className={style.first_column}>
        <div>
          <label><h4>Место</h4></label>
          <Select
            defaultValue={workspaceId}
            placeholder="Выберите место"
            allowClear
            showSearch
            onSelect={handleClearOrSelectWorkspace}
            onClear={handleClearOrSelectWorkspace}
            className={style.select}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          >
            {renderedWorkspaces}
          </Select>
        </div>
        {workspaceId &&
          <div>
            <Popconfirm
              onConfirm={(e) => {
                e.stopPropagation()
                deleteWorkspace(workspaceId, trigger)
              }}

              title="Удаление места"
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
        {workspaceId ?
          <div>
            <label><h4>Изменить место</h4></label>
            <label><h4>Количество рабочих мест</h4></label>
            <Input
              type="number"
              className={style.element}
              value={changedNumberOfWorkSpaces}
              onChange={handleChangeChangedNumberOfWorkspaces}
            />
            <label><h4>Описание</h4></label>
            <TextArea
              allowClear={true}
              rows={3}
              type="text"
              placeholder="Введите описание"
              className={style.element}
              value={changedDescription}
              onChange={handleChangeChangedDescription}
            />
            <div className={style.element} style={{display: "flex", justifyContent: "space-between"}}>
              <Button
                className={style.activate_button}
                disabled={changedActivity}
                onClick={() => setChangedActivity(v => !v)}
              >
                Активировать
              </Button>
              <Button
                className={style.deactivate_button}
                disabled={!changedActivity}
                onClick={() => setChangedActivity(v => !v)}
              >
                Деактивировать
              </Button>
            </div>
            <Upload
              className={style.element}
              listType="picture-card"
              fileList={changedFileList}
              customRequest={customRequest}
              onRemove={handleRemove}
              onPreview={handlePreview}
              onChange={handleChangeChangedFileList}
              beforeUpload={beforeUpload}
              accept="image/png, image/jpeg"
            >
              <div>Загрузить</div>
            </Upload>
            <div>
              <Button
                className={style.element}
                onClick={() => handleClickChangeWorkspace(trigger)}
                disabled={isLoadingChangeWorkspace || !changedDescription}
              >
                Сохранить
              </Button>
            </div>
            {alertShowChangeWorkspace &&
              <Alert
                message={isErrorChangeWorkspace ? isErrorChangeWorkspace : "Место успешно изменено"}
                type={isErrorChangeWorkspace ? "error" : "success"}
              />
            }
            <Modal
              open={preview.open}
              title={preview.title}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="Не удалось загрузить изображение" src={preview.image}/>
            </Modal>
          </div> :
          <div>
            <label><h4>Добавить место</h4></label>
            <Select
              className={style.element}
              placeholder="Выберите тип"
              allowClear
              options={types}
              onSelect={handleChangeNewTypeId}
              onClear={handleChangeNewTypeId}
            />
            <label><h4>Количество рабочих мест</h4></label>
            <Input
              type="number"
              className={style.element}
              value={newNumberOfWorkSpaces}
              onChange={handleChangeNewNumberOfWorkspaces}
            />
            <label><h4>Описание</h4></label>
            <TextArea
              allowClear={true}
              rows={3}
              type="text"
              placeholder="Введите описание"
              className={style.element}
              value={newDescription}
              onChange={handleChangeNewDescription}
            />
            <Button
              onClick={() => handleClick(trigger)}
              disabled={!newDescription || !newTypeId || !newNumberOfWorkSpaces || isLoadingAddWorkspace}
            >
              Сохранить
            </Button>
            {alertShowAddWorkspace &&
              <Alert
                className={style.element}
                message={isErrorAddWorkspace ? isErrorGetWorkspaces : "Место успешно создано"}
                type={isErrorAddWorkspace ? "error" : "success"}
              />
            }
          </div>
        }
      </div>
    </div>
  );
}

export default WorkSpace;
