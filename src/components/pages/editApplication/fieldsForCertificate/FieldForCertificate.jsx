import React, { useState } from "react";
import { Select, Form, Input } from "antd";
import { useGetDictionaryForApplications } from "../../../../hooks/useDictionaries";
import style from "./style.module.css";

export default function FieldForCertificate({
  application,
  setBody,
  setIsDraft,
}) {
  const { data: dict } = useGetDictionaryForApplications();
  const typeOfReceipt = dict?.filter((item) => item.technicalCode === "tc1");
  const category = dict?.filter((item) => item.technicalCode === "tc3");
  const [typeOfReceiptId, setTypeOfReceiptId] = useState(
    application?.typeOfReceiptId
  );
  const [categoryId, setCategoryId] = useState(application?.categoryId);
  const [deliveryAddress, setDeliveryAddress] = useState(
    application?.deliveryAddress
  );
  return (
    <>
      <div className={style.edit_form}>
        <label>
          <h4>Способ получения</h4>
        </label>
        <Select
          value={typeOfReceiptId}
          className={style.edit_select}
          options={typeOfReceipt?.map((type) => ({
            value: type.id,
            label: type.valueName,
          }))}
          onSelect={(value) => {
            setTypeOfReceiptId(value);
            setBody({
              ...application,
              deliveryAddress,
              typeOfReceiptId: value,
              categoryId,
            });
            setIsDraft(false);
          }}
        />
      </div>
      {typeOfReceiptId === 3 ? (
        <div className={style.edit_form}>
          <label>
            <h4>Адрес доставки</h4>
          </label>
          <Form.Item
            className={style.edit_select}
            name="deliveryAddress"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите адрес доставки",
              },
            ]}
            help={!deliveryAddress && "Пожалуйста, введите адрес доставки"}
          >
            <Input
              value={deliveryAddress}
              onChange={(e) => {
                const { value } = e.target;
                setDeliveryAddress(value);
                setBody({
                  ...application,
                  deliveryAddress: value,
                  typeOfReceiptId,
                  categoryId,
                });
                setIsDraft(false);
              }}
            />
          </Form.Item>
        </div>
      ) : (
        <></>
      )}
      <div className={style.edit_form}>
        <label>
          <h4>Формат получаемого документа</h4>
        </label>
        <Select
          value={categoryId}
          className={style.edit_select}
          options={category?.map((type) => ({
            value: type.id,
            label: type.valueName,
          }))}
          onSelect={(value) => {
            setCategoryId(value);
            setBody({
              ...application,
              deliveryAddress,
              typeOfReceiptId,
              categoryId: value,
            });
            setIsDraft(false);
          }}
        />
      </div>
    </>
  );
}
