import { Checkbox, ConfigProvider } from "antd";
import React from "react";

export default function CheckBox({ children, onChange, checked }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#d9d9d9",
        },
      }}
    >
      <Checkbox checked={checked} onChange={onChange}>
        {children}
      </Checkbox>
    </ConfigProvider>
  );
}
