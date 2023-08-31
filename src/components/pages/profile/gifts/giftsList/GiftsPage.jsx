import React, { useState } from "react";
import { useGetInteractions } from "../../../../../hooks/useInteractions";
import { PER_PAGE } from "../../constants";
import Gift from "../gift/Gift";
import Pages from "../../../../common/pages/Pages";
import Spinner from "../../../../common/spinner/Spinner";
import style from "./style.module.css";

export default function GiftsPage({ id, typeId }) {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetInteractions({
    receiverId: id,
    typeId: typeId,
    page: page,
    perPage: PER_PAGE,
  });

  if (error) return <p>Не удалось получить данные</p>;

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className={style.scrollable}>
        {data.values.map((gift) => (
          <>
            <Gift key={gift.id} {...gift} />
            <hr />
          </>
        ))}
      </div>
      <div className={style.pagination}>
        <Pages
          page={page}
          setPage={setPage}
          perPage={PER_PAGE}
          total={data.total}
        />
      </div>
    </div>
  );
}
