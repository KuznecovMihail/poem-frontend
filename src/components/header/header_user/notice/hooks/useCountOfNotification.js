import {useEffect, useState} from "react";
import {BASE_URL_NOTIFICATIONS} from "../../../../../hooks/config";
import {instance} from "../../../../../api/api.config";

//Добавить норм реализацию, когда будет API
const useCountOfNotification = id => {
  const [countOfNotification, setCountOfNotification] = useState(0)
  const [handler, setHandler] = useState(false)
  function toggle() {
    setHandler(!handler)
  }
  useEffect(() => {
    instance.get(`${BASE_URL_NOTIFICATIONS}/notifications/new?employeeId=${id}`)
      .then(res => setCountOfNotification(res.data.count))
      .catch(err => console.error(err.message))
    const timeRef = setInterval(() => {
      instance.get(`${BASE_URL_NOTIFICATIONS}/notifications/new?employeeId=${id}`)
        .then(res => setCountOfNotification(res.data.count))
        .catch(err => console.error(err.message))
    }, 10000)
    return () => {
      clearInterval(timeRef)
    }
  }, [id,handler])
  return {countOfNotification, toggle}
};
export default useCountOfNotification
