import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Tree, ConfigProvider } from "antd";
import style from "./style.module.css";

export default function StructureTree(props) {
  const { data, onSelect } = props;

  return (
    <div className={style.tree}>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 20,
            controlItemBgActive: "#FFDCCC",
          },
        }}
      >
        <Tree
          switcherIcon={<DownOutlined style={{ color: "#ff7a45" }} />}
          treeData={data}
          onSelect={onSelect}
        />
      </ConfigProvider>
    </div>
  );
}
