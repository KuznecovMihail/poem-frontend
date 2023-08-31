import { ConfigProvider, DatePicker, Space } from "antd";
import React from "react";

export default function InputDate({
  onChange,
  placeholder,
  showTime = false,
  format = "DD.MM.YYYY",
  disabledDate,
  disabledTime,
  defaultValue,
  value,
  disabled,
}) {
  return (
    <Space direction="vertical">
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "#d9d9d9",
          },
        }}
      >
        <DatePicker
          showTime={showTime}
          format={format}
          placeholder={placeholder}
          onChange={onChange}
          disabledDate={disabledDate}
          disabledTime={disabledTime}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
        />
      </ConfigProvider>
    </Space>
  );
}
