import React, { useState, useEffect } from "react";
import EmployeesCard from "./employeesCard/EmployeesCard";
import StructureTree from "./structureTree/StructureTree";
import style from "./style.module.css";
import { instance } from "../../../../api/api.config";
import Spinner from "../../../common/spinner/Spinner";
import { BASE_URL_PROFILE } from "../../../../hooks/config";
import { Alert } from "antd";

export default function BankStructure() {
  const [worker, setWorker] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchSubordinates(employeeId) {
    const response = await instance.get(
      `${BASE_URL_PROFILE}/profiles/${employeeId}/subordinates?showChildren=true`
    );
    const data = await response.data;
    return data.subordinates;
  }

  const employeeId = 1;
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    async function buildTreeData(employeeId, depth = 0) {
      const subordinates = await fetchSubordinates(employeeId);

      const promises = subordinates.map(async (subordinate) => {
        const { employeeBriefInfo, hasChildren } = subordinate;
        const {
          id,
          firstName,
          lastName,
          middleName,
          position,
          employeeStatusId,
        } = employeeBriefInfo;

        let fi;
        if (employeeStatusId === 33) {
          fi = `${lastName} ${firstName} ${middleName}`;
        } else {
          fi = `${lastName} ${firstName}`;
        }
        const title = (
          <div className={style.node}>
            <div>{fi}</div>
            <div className={style.tree_position}>
              {position.split(".").map((substring, index) => {
                return <div key={index}>{substring.trim()}</div>;
              })}
            </div>
          </div>
        );
        const key = id.toString();
        const nodeStyle = {
          paddingLeft: 20 + depth * 20,
          marginTop: 10,
        };

        if (hasChildren) {
          const children = await buildTreeData(id, depth + 1);
          return {
            key,
            title,
            style: nodeStyle,
            children,
          };
        } else {
          return {
            key,
            title,
            style: nodeStyle,
          };
        }
      });

      const data = await Promise.all(promises);

      return data;
    }
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await buildTreeData(employeeId);
        setTreeData([
          {
            key: "1",
            title: (
              <div className={style.node}>
                <div>Алтынбеков Кайрат</div>
                <div className={style.tree_position}>
                  Председатель правления
                </div>
              </div>
            ),
            children: data,
          },
        ]);
      } catch (e) {
        setError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const onSelect = async (selectedKey) => {
    try {
      const response = await instance.get(
        `${BASE_URL_PROFILE}/profiles/${selectedKey}`
      );
      const data = await response.data;
      setWorker(data);
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) return <Spinner />;
  if (error)
    return (
      <Alert
        className={style.error}
        message="Произошла ошибка при загрузке данных"
        type="error"
        showIcon
      />
    );
  return (
    <>
      <h1 className={style.title}>Организационная структура банка</h1>
      <div className={style.content}>
        <StructureTree data={treeData} onSelect={onSelect} />
        {worker && <EmployeesCard worker={worker} />}
      </div>
    </>
  );
}
