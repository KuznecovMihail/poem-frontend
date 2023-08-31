import React, { useEffect } from "react";
import style from "./style.module.css";
import Icon from "../../../common/icon/Icon";
import { Link } from "react-router-dom";

export default function Application(props) {
  const {
    application,
    setOpenApplicationModal,
    setOpenDeleteModal,
    setChosenAppication,
    state,
    convertDate,
    dict,
  } = props;
  useEffect(() => {
    if (state) {
      setChosenAppication(state);
      setOpenApplicationModal(true);
    }
  }, [application, setChosenAppication, setOpenApplicationModal, state]);
  return (
    <>
      <tr>
        <td>{convertDate(application.created)}</td>
        <td>{application.id}</td>
        <td>
          {
            dict?.find((obj) => obj.id === application.typeOfApplicationId)
              ?.valueName
          }
        </td>
        <td>
          {dict?.find((obj) => obj.id === application.statusId)?.valueName}
        </td>
        <td className={style.buttons}>
          <div className={style.alignment}>
            <Icon
              type="eye"
              onClick={() => {
                setChosenAppication(application.id);
                setOpenApplicationModal(true);
              }}
            />
            {(application.statusId === 16 || application.statusId === 23) && (
              <Link to={`/applications/edit/${application.id}`}>
                <Icon type="pen" className={style.edit} />
              </Link>
            )}
            {(application.statusId === 16 || application.statusId === 17) && (
              <Icon
                type="bin"
                onClick={() => {
                  setChosenAppication(application.id);
                  setOpenDeleteModal(true);
                }}
              />
            )}
          </div>
        </td>
      </tr>
    </>
  );
}
