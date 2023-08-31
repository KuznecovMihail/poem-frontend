import React from "react";
import { Pagination } from "antd";

export default function Pages({ page, setPage, perPage, total }) {
  return (
    <Pagination
      current={page}
      onChange={(page) => setPage(page)}
      pageSize={perPage}
      total={total}
    />
  );
}
