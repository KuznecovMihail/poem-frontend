import { useState, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { postImage } from "./useImages";
import { instance } from "../api/api.config";
import { BASE_URL_PROFILE } from "./config";
import { useDebounce } from "./useDebounce";
import { Context } from "../context/context";
import moment from "moment";

export function useGetProfile(id) {
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    instance
      .get(`${BASE_URL_PROFILE}/profiles/${id}`)
      .then((response) => setEmployee(response.data))
      .catch((error) => {
        setError(error);
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return { employee, setEmployee, isLoading, error };
}

export function usePutProfile(id) {
  const [isLoading, setIsLoading] = useState(false);

  async function putProfile(data) {
    setIsLoading(true);

    try {
      const response = await instance.put(
        `${BASE_URL_PROFILE}/profiles/${id}`,
        data
      );
      setIsLoading(false);
      return response;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return error;
    }
  }

  return { isLoading, putProfile };
}

export async function patchAvatar(formData, id) {
  try {
    const { data } = await postImage(formData);
    await instance.patch(`${BASE_URL_PROFILE}/profiles/${id}/avatar`, data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export function useGetSubordinates({ id, ...params }) {
  return useQuery({
    queryKey: ["subordinates", id, params],
    queryFn: async () => {
      const { data } = await instance.get(
        `${BASE_URL_PROFILE}/profiles/${id}/subordinates`,
        {
          params,
        }
      );
      return data.subordinates;
    },
  });
}

export function useGetHolidays(id) {
  return useQuery({
    queryKey: ["holidays", id],
    queryFn: async () => {
      const { data } = await instance.get(
        `${BASE_URL_PROFILE}/profiles/${id}/holidays`
      );
      return data;
    },
  });
}

export function useGetBirthdayList(dateFrom, dateTo) {
  const [birthdayList, setBirthdayList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    instance
      .get(
        `${BASE_URL_PROFILE}/profiles/birthdays?startDate=${dateFrom}&endDate=${dateTo}`
      )
      .then((response) => {
        setBirthdayList(response.data);
      })
      .catch((error) => {
        setIsError(true);
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, [dateFrom, dateTo]);
  return { birthdayList, isLoading, isError };
}

export const useSearch = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (debouncedValue.trim().length === 0) {
      setUsers([]);
      return;
    }
    setUsers([]);
    setIsError(false);
    setIsLoading(true);
    instance
      .get(
        encodeURI(
          `${BASE_URL_PROFILE}/profiles/search?searchText=${debouncedValue}`
        )
      )
      .then((res) => {
        setUsers(res.data.searchInfo);
      })
      .catch((err) => {
        console.error(err.message);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, [debouncedValue]);

  const handleInput = (e) => {
    if (e.target.value.length === 0) return setValue("");
    const charArr = e.target.value.split("");
    const regexp = /[a-zA-Z@.а-яА-Я\d ]/gim;
    const newValue = charArr.filter((char) => char.match(regexp)).join("");
    setValue(newValue);
  };
  return {
    value,
    handleInput,
    setValue,
    isLoading,
    isFocused,
    setIsFocused,
    users,
    isError,
    debouncedValue,
  };
};

export const useVacationFileUpload = (type) => {
  const [errorText, setErrorText] = useState(false);
  const [isUpLoading, setUpLoading] = useState(false); //Состояние загрузки файла на сервер
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [downloadLink, setDownloadLink] = useState();
  const [errorStatus, setErrorStatus] = useState();
  const [fileName, setFileName] = useState();
  const { employeeId } = useContext(Context);
  const { employee } = useGetProfile(employeeId);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();
  const time = moment(formattedTime, "HH:mm:ss").format("HH:mm");

  const createDownloadLink = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    return link;
  };

  const handleLoad = (info) => {
    setDownloadLink(null);
    setFileName(null);
    setErrorText(false);
    if (info.file.status !== "uploading") {
    }
    if (info.file.status === "done") {
      uploadFile(info.file)
        .catch((err) => {
          setErrorStatus(err.response.status);
          const errorStatus = err.response.status;
          if (errorStatus === 422) {
            const fileBlob = new Blob([err.response.data], {
              type: "text/csv",
            });
            if (type === "holiday/uploadFile") setFileName("VacationErrors");
            else setFileName("OrgStructureErrors");
            const downloadLink = createDownloadLink(fileBlob, info.file.name);
            setDownloadLink(downloadLink);
            setErrorText(
              `В вашем файле ошибки. Исправьте и повторите загрузку. Файл с ошибками: `
            );
          } else if (
            errorStatus === 400 ||
            errorStatus === 413 ||
            errorStatus === 415
          ) {
            setErrorText(JSON.parse(err.response.data).error.message);
          } else
            setErrorText(
              "Возникла непредвиденная ошибка при обработке файла." +
                " Повторите попытку снова. Если ошибка повторяется, обратитесь в техническую поддержку"
            );
          setIsModalOpen(true);
        })
        .finally(() => {
          setUpLoading(false);
        });
    }
    if (info.file.status === "error") {
      setErrorText("Ошибка при загрузке файла");
      setIsModalOpen(true);
    }
  };

  const uploadFile = async (file) => {
    setDataSource(null);
    setUpLoading(true);
    const formData = new FormData();
    formData.append("file", file.originFileObj);
    let res1 = await instance.post(`${BASE_URL_PROFILE}/${type}`, formData, {
      responseType: "blob, application/json",
    });
    console.log(res1);
    if (res1.status === 201) {
      setDataSource({
        key: 1,
        name: file.name,
        downloadDate: formattedDate,
        downloadTime: time,
        admin: (
          <>
            <span>{employee.employeeInfo.lastName} </span>
            <span>{employee.employeeInfo.firstName.slice(0, 1) + "."} </span>
            <span>{employee.employeeInfo.middleName.slice(0, 1) + "."}</span>
          </>
        ),
      });
    }
  };
  return {
    dataSource,
    errorText,
    isUpLoading,
    isModalOpen,
    downloadLink,
    errorStatus,
    fileName,
    setIsModalOpen,
    setErrorText,
    handleLoad,
  };
};
