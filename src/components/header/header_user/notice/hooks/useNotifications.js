import {useEffect, useState} from "react";
import {useGetDictionaryForNotifications} from "../../../../../hooks/useDictionaries";
import {BASE_URL_NOTIFICATIONS} from "../../../../../hooks/config";
import {instance} from "../../../../../api/api.config";


const useNotifications = userId => {
  const [notifications, setNotifications] = useState([])
  const [page, setPage] = useState(1) // текущий номер страницы
  const [totalPage, setTotalPage] = useState(1) // общее кол-во страниц
  const [perPage, setPerPage] = useState(8) //кол-во элементов на странице
  const [viewFlags, setViewFlags] = useState(false) //кол-во элементов на странице
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState("")
  const {data: dict, isLoading: isLoadingDictionaries} = useGetDictionaryForNotifications()

  const handleChangeSwitch = () => {
    setPage(1)
    setViewFlags(v => !v)
  }

  useEffect(() => {
    if (isLoadingDictionaries) return
    setLoading(true)
    setError("")
    const fetchData = async () => {
      try {
        let a = await instance.get(`${BASE_URL_NOTIFICATIONS}/notifications?employeeId=${userId}&page=${page}&perPage=${perPage}&viewFlags=${viewFlags}`)
        setNotifications(a.data.values)
        setTotalPage(a.data.totalPage)
      } catch (e) {
        console.error(e.message)
        if (e?.response.status >= 400 && e?.response.status <= 404)
          setError("Не удалось получить уведомления")
        else
          setError("Что-то пошло не так")
      }
    }
    fetchData().finally(() => setLoading(false))

  }, [page, userId, perPage, viewFlags, isLoadingDictionaries])
  return {
    notifications,
    isLoading,
    isError,
    totalPage,
    page,
    setPage,
    perPage,
    setPerPage,
    viewFlags,
    handleChangeSwitch,
    dict
  }
}

export default useNotifications
