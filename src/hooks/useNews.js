import { useEffect, useState } from "react";
import { instance } from "../api/api.config";
import { BASE_URL_NEWS } from "./config";

export function useGetNews(queryParams, parametrsCode, shouldFetch) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [news, setNews] = useState(null);

  const fetchData = () => {
    setIsLoading(true);

    instance
      .get(
        `${BASE_URL_NEWS}/news?${
          parametrsCode.statusId1 ? `statusId=${parametrsCode.statusId1}&` : ""
        }${
          parametrsCode.statusId2 ? `statusId=${parametrsCode.statusId2}&` : ""
        }${parametrsCode.title ? `title=${parametrsCode.title}&` : ""}${
          parametrsCode.dateCreationFrom
            ? `dateCreationFrom=${parametrsCode.dateCreationFrom} 00%3A00&`
            : ""
        }${
          parametrsCode.dateCreationTo
            ? `dateCreationTo=${parametrsCode.dateCreationTo}`
            : ""
        }${
          parametrsCode.dateFrom
            ? `dateFrom=${parametrsCode.dateFrom} 00%3A00&`
            : ""
        }${parametrsCode.dateTo ? `dateTo=${parametrsCode.dateTo}` : ""}`,
        {
          params: queryParams,
        }
      )
      .then((response) => {
        setNews(response.data);
        if (queryParams.statusId == null) setIsLoading(true);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [shouldFetch, queryParams.perPage, queryParams.page]);

  return {
    isLoading,
    isError,
    news,
    fetchData,
  };
}

export function useGetNewsById(id) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [news, setNews] = useState(null);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      instance
        .get(`${BASE_URL_NEWS}/news/${id}`)
        .then((response) => setNews(response.data))
        .catch((error) => {
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  return { news, isLoading, isError };
}

export function useCreateNews() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const createNews = async (data) => {
    setIsLoading(true);
    try {
      const response = await instance.post(`${BASE_URL_NEWS}/news`, data);
      return response;
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return { createNews, isLoading, isError };
}

export function useEditNews(id) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const editNews = async (data) => {
    setIsLoading(true);
    try {
      const response = await instance.put(`${BASE_URL_NEWS}/news/${id}`, data);
      return response;
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return { editNews, isLoading, isError };
}

export function useEditStatusNews(id) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const editStatusNews = async (data) => {
    setIsLoading(true);
    try {
      const response = await instance.patch(
        `${BASE_URL_NEWS}/news/${id}/status`,
        data
      );
      return response;
    } catch (err) {
      setIsError(true);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return { editStatusNews, isLoading, isError };
}
