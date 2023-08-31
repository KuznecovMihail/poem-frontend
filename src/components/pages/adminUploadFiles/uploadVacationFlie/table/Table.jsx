import React from 'react';
import style from "./style.module.css"
import loadingImg from '../../../../../img/loading.svg'

function Table({data = null, isLoading}) {
  return (
    <div className={style.table_container}>
      <table className={style.table}>
        <thead className={style.thead}>
        <tr>
          <th>Название</th>
          <th>Дата Загрузки</th>
          <th>Время Загрузки</th>
          <th>Администратор</th>
        </tr>
        </thead>
        <tbody className={style.tbody}>
        {!(!isLoading && data) ||
            <tr>
              <td>{data?.name}</td>
              <td>{data?.downloadDate}</td>
              <td>{data?.downloadTime}</td>
              <td>{data?.admin}</td>
            </tr>
        }
        </tbody>
      </table>
      {isLoading &&
        <div className={style.loading_container}>
          <img alt='' src={loadingImg} className={style.loading}/>
        </div>
      }
    </div>
  )
    ;
}

export default Table;
