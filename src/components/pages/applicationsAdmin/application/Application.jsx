import React from "react";
import style from "./style.module.css";
import Icon from "../../../common/icon/Icon";

export default function Application(props) {
  const {
    application,
    setOpenApplicationModal,
    setChosenAppication,
    convertDate,
    dict,
  } = props;
  const fullName = application
    ? `${application.applicantObject.lastName} ${application.applicantObject.firstName[0]}.${application.applicantObject.middleName[0]}.`
    : "";
  return (
    <tr>
      <td>{convertDate(application.created)}</td>
      <td>{application.id}</td>
      <td>
        {
          dict?.find((obj) => obj.id === application.typeOfApplicationId)
            ?.valueName
        }
      </td>
      <td>{fullName}</td>
      <td>{dict?.find((obj) => obj.id === application.statusId)?.valueName}</td>
      <td>
        {(application.statusId === 17 || application.statusId === 18) && (
          <div className={style.align}>
            <Icon
              type="pen"
              onClick={() => {
                setChosenAppication(application.id);
                setOpenApplicationModal(true);
              }}
            />
          </div>
        )}
      </td>
    </tr>
  );
}
