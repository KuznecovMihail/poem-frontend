import { useState, useEffect } from "react";
import { instance } from "../api/api.config";
import { BASE_URL_APPLICATIONS } from "./config";

export function useGetUsersApplications(id) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [applications, setApplications] = useState(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(1);
  const [perPage, setPerPage] = useState(20);

  useEffect(() => {
    setIsLoading(true);
    instance
      .get(
        `${BASE_URL_APPLICATIONS}/applications?applicantId=${id}&page=${page}&perPage=${perPage}&sort=id,desc`
      )
      .then((response) => {
        setApplications(response.data.values);
        setTotal(response.data.total);
        setPage(response.data.page);
      })
      .catch((error) => {
        setIsError(true);
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, [id, page, perPage]);
  return {
    applications,
    setApplications,
    isLoading,
    isError,
    total,
    page,
    setPage,
    perPage,
    setPerPage,
  };
}

export function useGetApplications(filter) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [applications, setApplications] = useState(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [handler, setHandler] = useState(false);
  function toggle() {
    setHandler(!handler);
  }
  useEffect(() => {
    setIsLoading(true);
    instance
      .get(
        `${BASE_URL_APPLICATIONS}/applications?page=${page}&perPage=${perPage}&${filter}&sort=id,desc`
      )
      .then((response) => {
        setApplications(response.data.values);
        setTotal(response.data.total);
        setPage(response.data.page);
      })
      .catch((error) => {
        setIsError(true);
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, [page, perPage, filter, handler]);
  return {
    applications,
    isLoading,
    isError,
    total,
    page,
    setPage,
    perPage,
    toggle,
    setPerPage,
  };
}

export function useGetApplicationById(id) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [application, setApplication] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    instance
      .get(`${BASE_URL_APPLICATIONS}/applications/${id}`)
      .then((response) => {
        setApplication(response.data);
      })
      .catch((error) => {
        setIsError(true);
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, [id]);
  return { application, isLoading, isError };
}

export function useDeleteApplication() {
  const [isError, setIsError] = useState(false);

  async function deleteApplication(
    applicationId,
    applications,
    setApplications,
    onClose
  ) {
    setIsError(false);
    try {
      await instance.delete(
        `${BASE_URL_APPLICATIONS}/applications/${applicationId}`
      );
      const updatedApplications = applications.filter(
        (app) => app.id !== applicationId
      );
      setApplications(updatedApplications);
      onClose();
    } catch (err) {
      setIsError(true);
    }
  }
  return { isError, deleteApplication };
}

export function usePatchApplication() {
  const [isError, setIsError] = useState(false);

  async function updateStatus(applicationId, statusId, toggle, onClose) {
    setIsError(false);
    try {
      await instance
        .patch(
          `${BASE_URL_APPLICATIONS}/applications/${applicationId}/status`,
          {
            statusId: statusId,
          }
        )
        .then(() => toggle());
      onClose();
    } catch (err) {
      setIsError(true);
    }
  }
  return { isError, updateStatus };
}

export function usePutApplications(id) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function putApplication(data) {
    setIsLoading(true);
    setError(null);
    try {
      const response = await instance.put(
        `${BASE_URL_APPLICATIONS}/applications/${id}`,
        data
      );
      setIsLoading(false);
      return response;
    } catch (error) {
      setError(error);
      console.error(error);
      setIsLoading(false);
      return error;
    }
  }

  return { isLoading, error, putApplication };
}
