import {useCallback, useEffect, useState} from "react";
import {instance} from "../api/api.config";
import {BASE_URL_IMAGE, BASE_URL_PROFILE, BASE_URL_RESERVATIONS} from "./config";
import {getDateStringFromValue} from "../components/pages/adminBooking/helpers/convertTime";
import {Upload} from "antd";
import { useNavigate } from "react-router-dom";

export const useEmployeeBooking = id => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [user, setUser] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)
    instance.get(`${BASE_URL_PROFILE}/profiles/${id}`)
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
        setIsError(true)
        console.error(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  return {
    isLoading,
    isError,
    user
  }
}

export const useGetBookingsByEmployeeId = id => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState("")
  const [bookings, setBookings] = useState([])
  const [flag, setFlag] = useState(false)

  const trigger = useCallback(() => {
    setFlag(!flag)
  }, [flag])

  useEffect(() => {
    setIsLoading(true)
    setIsError("")
    instance.get(`${BASE_URL_RESERVATIONS}/reservations/user/${id}`, {
      params: {
        isHolder: true,
      }
    })
      .then(res => {
        setBookings(res.data)
      })
      .catch(e => {
        setIsError("Ошибка при получении списка броней")
        console.error(e.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [flag, id])

  return {
    isLoading, isError, bookings, trigger
  }
}

export const deleteBooking = (id, callback = null) => new Promise((resolve, reject) =>
  instance.delete(`${BASE_URL_RESERVATIONS}/reservations/${id}`)
    .then(() => {
      if (callback) {
        callback(true)
      }
      resolve()
    })
    .catch(e => {
      console.error(e.message)
      reject(e)
    })
)

export const useGetCities = () => {
  const [cityId, setCityId] = useState(null)
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [flag, setFlag] = useState(false)

  const trigger = (value = false) => {
    setFlag(!flag)
    if (value) {
      setCityId(null)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)
    instance.get(encodeURI(`${BASE_URL_RESERVATIONS}/cities?cityName=${""}`))
      .then(res => {
        setCities(res.data)
      })
      .catch(e => {
        setIsError(true)
        console.error(e.message)
      })
      .finally(() => setIsLoading(false))
  }, [flag])

  return {
    cities, cityId, setCityId, isLoading, isError, trigger
  }
}

export const useAddCity = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [cityName, setCityName] = useState("")
  const [timeZone, setTimeZone] = useState(null)
  const [alertShow, setAlertShow] = useState(false)
  let id = 3 //todo : заглушка
  const handleChangeCityName = e => {
    if (!e.target.value.trim()) return setCityName("")
    let value = e.target.value
    value = value.charAt(0).toUpperCase() + value.slice(1)
    setCityName(value)
  }

  const handleChangeOrClearTimeZone = (value = null) => {
    setTimeZone(value)
  }

  const handleClick = (callback) => {
    if (!cityName.trim() || !timeZone) return
    setIsError(false)
    setIsLoading(true)
    instance.post(`${BASE_URL_RESERVATIONS}/cities`, {name: cityName, timeZone, id})
      .then((res) => {
        id++
        setCityName("")
        setTimeZone(null)
        callback(res.data.id)
      })
      .catch(e => {
        setIsError(true)
        console.error(e)
      })
      .finally(() => {
        setIsLoading(false)
        setAlertShow(true)
        setTimeout(() => setAlertShow(false), 3000)
      })
  }

  return {
    cityName,
    handleChangeCityName,
    handleClick,
    handleChangeOrClearTimeZone,
    isLoading,
    isError,
    alertShow,
    timeZone
  }
}

export const useChangeCity = (name, timeZone, cityId) => {
  const [newName, setNewName] = useState(name)
  const [newTimeZone, setNewTimeZone] = useState(timeZone)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [alertShow, setAlertShow] = useState(false)

  useEffect(() => {
    setNewName(name)
    setNewTimeZone(timeZone)
  }, [cityId, name, timeZone])
  const handleChangeNewName = e => {
    if (!e.target.value.trim()) return setNewName("")
    let value = e.target.value
    value = value.charAt(0).toUpperCase() + value.slice(1)
    setNewName(value)
  }

  const handleChangeNewTimeZone = (value = null) => {
    setNewTimeZone(value)
  }

  const handleClickChangeCity = (callback) => {
    if (!timeZone || !newName) return
    setIsError(false)
    setIsLoading(true)
    instance.put(`${BASE_URL_RESERVATIONS}/cities/${cityId}`, {name: newName, timeZone: newTimeZone})
      .then(() => {
        callback()
      })
      .catch(e => {
        setIsError(true)
        console.error(e.message)
      })
      .finally(() => {
        setIsLoading(false)
        setAlertShow(true)
        setTimeout(() => setAlertShow(false), 3000)
      })
  }

  return {
    newName,
    newTimeZone,
    handleChangeNewName,
    handleChangeNewTimeZone,
    isError,
    isLoading,
    handleClickChangeCity,
    alertShow
  }
}

export const deleteCity = (cityId, callback) => {
  instance.delete(`${BASE_URL_RESERVATIONS}/cities/${cityId}`)
    .then(() => callback(true))
    .catch(e => {
      console.error(e)
    })
}

export const useGetOffices = cityId => {
  const [officeId, setOfficeId] = useState(null)
  const [offices, setOffices] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [flag, setFlag] = useState(false)

  const trigger = (value = false) => {
    setFlag(!flag)
    if (value) {
      setOfficeId(null)
    }
  }

  const onClearOrSelectOffice = (value = null) => {
    setOfficeId(value)
  }

  useEffect(() => {
    if (!cityId) return
    setIsLoading(true)
    setIsError(false)
    instance.get(`${BASE_URL_RESERVATIONS}/offices/city/${cityId}`)
      .then((res) => {
        setOffices(res.data)
      })
      .catch(e => {
        setIsError(true)
        console.error(e.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [flag, cityId])

  return {offices, isLoading, isError, officeId, setOfficeId, setOffices, trigger, onClearOrSelectOffice}
}

export const useAddOffice = (city = null) => {
  const defaultNewOffice = {
    address: "",
    maxDuration: 7,
    workStart: "2022-11-30T00:00:00Z",
    workEnd: "2022-11-30T10:00:00Z",
    cityId: city?.id,
  }
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [newOffice, setNewOffice] = useState({...defaultNewOffice})
  const [alertShow, setAlertShow] = useState(false)

  const handleChangeNewAddress = e => {
    let value = e.target.value
    value = value.charAt(0).toUpperCase() + value.slice(1)
    setNewOffice(office => ({
      ...office,
      address: value
    }))
  }

  const handleChangeNewMaxDuration = e => {
    if (e.target.value < 0) return
    setNewOffice(office => ({
      ...office,
      maxDuration: e.target.value
    }))
  }

  const handleChangeNewWorkTime = ([start, end]) => {
    if (start >= end) [start, end] = [end, start]
    setNewOffice(office => ({
      ...office,
      workStart: getDateStringFromValue(start),
      workEnd: getDateStringFromValue(end),
    }))
  }

  const handleClick = (callback) => {
    setIsError(false)
    setIsLoading(true)
    instance.post(`${BASE_URL_RESERVATIONS}/offices`,
      newOffice)
      .then(() => {
        setAlertShow(true)
        setNewOffice(defaultNewOffice)
        setTimeout(() => setAlertShow(false), 3000)
      })
      .catch(e => {
        setIsError(true)
        console.error(e)
      })
      .finally(() => {
        setIsLoading(false)
        callback()
      })
  }
  return {
    newOffice,
    handleChangeNewAddress,
    handleChangeNewMaxDuration,
    handleChangeNewWorkTime,
    handleClick,
    isLoading,
    isError,
    alertShow
  }
}

export const useGetOffice = (office = null) => {
  const [changedOffice, setChangedOffice] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [alertShow, setAlertShow] = useState(false)

  const handleChangeAddress = e => {
    let value = e.target.value
    value = value.charAt(0).toUpperCase() + value.slice(1)
    setChangedOffice(office => ({
      ...office,
      address: value
    }))
  }

  const handleChangeMaxDuration = e => {
    if (e.target.value < 0) return
    setChangedOffice(office => ({
      ...office,
      maxDuration: e.target.value
    }))
  }

  const handleChangeWorkTime = ([start, end]) => {
    if (start >= end) [start, end] = [end, start]
    setChangedOffice(office => ({
      ...office,
      workStart: getDateStringFromValue(start),
      workEnd: getDateStringFromValue(end),
    }))
  }


  const handleClick = (callback) => {
    setIsError(false)
    setIsLoading(true)
    instance.put(`${BASE_URL_RESERVATIONS}/offices`, changedOffice)
      .then(() => {
        callback()
      })
      .catch(e => {
        setIsError(true)
        console.error(e.message)
      })
      .finally(() => {
        setIsLoading(false)
        setAlertShow(true)
        setTimeout(() => setAlertShow(false), 3000)
      })
  }

  useEffect(() => {
    if (!office) return
    setIsError(false)
    setIsLoading(true)
    instance.get(`${BASE_URL_RESERVATIONS}/offices/info/${office.id}`)
      .then(res => {
        setChangedOffice(res.data)
      })
      .catch(e => {
        console.error(e.message)
        setIsError(true)
      })
      .finally(() => [
        setIsLoading(false)
      ])
  }, [office])
  return {
    isLoading,
    isError,
    changedOffice,
    alertShow,
    handleChangeMaxDuration,
    handleChangeWorkTime,
    handleChangeAddress,
    handleClick
  }
}

export const deleteOffice = (officeId, callback) => {
  instance.delete(`${BASE_URL_RESERVATIONS}/offices/${officeId}`)
    .then(() => callback(true))
    .catch(e => {
      console.log(e)
    })
}

export const useGetOfficeLevels = officeId => {
  const [levelId, setLevelId] = useState(null)
  const [levels, setLevels] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!officeId) return
    setIsLoading(true)
    setIsError(false)
    instance.get(`${BASE_URL_RESERVATIONS}/officeLevels/${officeId}`)
      .then((res) => {
        setLevels(res.data)
      })
      .catch(e => {
        setIsError(true)
        console.error(e.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [officeId])

  return {levels, isLoading, isError, levelId, setLevelId, setLevels}
}

export const useGetOfficeLevelsWithWorkspaces = officeLevelId => {
  const [workspaceId, setWorkspaceId] = useState(null)
  const [workspaces, setWorkspaces] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [levelImage, setLevelImage] = useState(null)

  useEffect(() => {
    if (!officeLevelId) return
    setIsLoading(true)
    setIsError(false)
    instance.get(`${BASE_URL_RESERVATIONS}/officeLevels/levelWithWorkplaces/${officeLevelId}`)
      .then((res) => {
        setLevelImage(res.data.imageUrl)
        setWorkspaces(res.data.workspaces)
      })
      .catch(e => {
        setIsError(true)
        console.error(e.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [officeLevelId])

  return {workspaces, isLoading, isError, workspaceId, setWorkspaceId, setWorkspaces, levelImage}
}

export const useGetWorkspacePhotos = workspaceId => {
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!workspaceId) return
    setIsLoading(true)
    setIsError(false)
    instance.get(`${BASE_URL_RESERVATIONS}/workspaces/${workspaceId}`)
      .then((res) => {
        setPhotos(res.data.photos)
      })
      .catch(e => {
        setIsError(true)
        console.error(e.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [workspaceId])

  return {photos, isLoading, isError, setPhotos}
}

export const useGetWorkspaceFreeIntervals = (workspaceId, date) => {
  const [intervals, setIntervals] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!workspaceId || !date) return
    setIsLoading(true)
    setIsError(false)
    instance.get(`${BASE_URL_RESERVATIONS}/reservations?date=${date}&workspaceId=${workspaceId}`)
      .then((res) => {
        setIntervals(res.data.freeIntervals)
      })
      .catch(e => {
        setIsError(true)
        console.error(e.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [workspaceId, date])

  return {intervals, isLoading, isError, setIntervals}
}

export const useGetLevels = (officeId = null) => {
  const [levels, setLevels] = useState([])
  const [levelId, setLevelId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState("")
  const [flag, setFlag] = useState(false)

  const trigger = (value = false) => {
    setFlag(!flag)
    if (value) {
      setLevelId(null)
    }
  }

  const handleClearOrSelectLevel = (value = null) => {
    setLevelId(value)
  }

  useEffect(() => {
    if (!officeId) return
    setIsLoading(true)
    setIsError("")
    instance.get(`${BASE_URL_RESERVATIONS}/officeLevels/${officeId}`)
      .then(res => {
        setLevels(res.data)
      })
      .catch(e => {
        setIsError("Ошибка при загрузке этажей")
        console.error(e.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [officeId, flag])

  return {levels, levelId, isLoading, isError, trigger, handleClearOrSelectLevel}
}

export const useAddLevel = (officeId = null) => {
  const [newNumber, setNewNumber] = useState(1)
  const [newImageUrl, setNewImageUrl] = useState("")
  const [newFileList, setNewFileList] = useState([])
  const [preview, setPreview] = useState({
    open: false,
    title: "",
    image: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState("")
  const [alertShow, setAlertShow] = useState(false)
  const handleChangeNewNumber = e => {
    if (!e.target.value.length) return setNewNumber(0)
    setNewNumber(+e.target.value)
  }
  const customRequest = async ({onProgress, onError, onSuccess, file}) => {
    const fmData = new FormData()
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      },
      onUploadProgress: e => {
        const percent = Math.floor((e.loaded / e.total) * 100)
        onProgress({percent})
      }
    }
    fmData.append("image", file)
    instance.post(`${BASE_URL_IMAGE}/images`, fmData, config)
      .then(res => {
        onSuccess("OK")
        setNewImageUrl(res.data.imageUrl)
      })
      .catch(e => {
        onError("ERROR")
        console.log(e)
      })
  }

  const handleChangeNewFileList = ({fileList}) => {
    if (!fileList.length) setNewImageUrl("")
    setNewFileList(fileList)
  }

  const beforeUpload = file => {
    const isPNG = file.type === "image/png"
    const isJPG = file.type === "image/jpeg"
    return (isJPG || isPNG) || Upload.LIST_IGNORE
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
        reader.onerror = e => reject(e)
      })
    }
    setPreview({
      image: file.url || file.preview,
      open: true,
      title: file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    })
  }
  const handleCancel = () => {
    setPreview(v => ({...v, open: false}))
  }

  const handleClick = (callback) => {
    setIsLoading(true)
    setIsError("")
    instance.post(`${BASE_URL_RESERVATIONS}/officeLevels`, {
      officeId,
      number: newNumber,
      imageUrl: newImageUrl
    })
      .then(() => {
        callback()
        setNewImageUrl("")
        setNewFileList([])
        setNewNumber(1)
      })
      .catch(() => {
        setIsError("Ошибка при создании этажа")
      })
      .finally(() => {
        setIsLoading(false)
        setAlertShow(true)
        setTimeout(() => setAlertShow(false), 3000)
      })
  }

  return {
    newNumber,
    newFileList,
    newImageUrl,
    handleClick,
    isLoading,
    isError,
    alertShow,
    beforeUpload,
    handlePreview,
    customRequest,
    handleChangeNewNumber,
    preview,
    handleCancel,
    handleChangeNewFileList
  }
}

export const useChangeLevel = (officeId = null, level) => {
  const [changedNumber, setChangedNumber] = useState(null)
  const [changedImageUrl, setChangedImageUrl] = useState(null)
  const [changedFileList, setChangedFileList] = useState([])
  const [preview, setPreview] = useState({
    open: false,
    title: "",
    image: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState("")
  const [alertShow, setAlertShow] = useState(false)

  useEffect(() => {
    if (!level) return
    setIsLoading(true)
    setChangedNumber(level.number)

    if (!level.imageUrl) {
      setChangedFileList([])
      setChangedImageUrl("")
      return;
    }

    setChangedImageUrl(level.imageUrl)
    setChangedFileList([{
      uid: "-1",
      status: "done",
      percent: 100,
      name: "План",
      url: level.imageUrl
    }])
    setIsLoading(false)
  }, [level])

  const handleChangeChangedNumber = e => {
    if (!e.target.value.length) setChangedNumber(0)
    setChangedNumber(+e.target.value)
  }

  const customRequest = async ({onProgress, onError, onSuccess, file}) => {
    const fmData = new FormData()
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      },
      onUploadProgress: e => {
        const percent = Math.floor((e.loaded / e.total) * 100)
        onProgress({percent})
      }
    }
    fmData.append("image", file)
    instance.post(`${BASE_URL_IMAGE}/images`, fmData, config)
      .then(res => {
        onSuccess("OK")
        setChangedImageUrl(res.data.imageUrl)
      })
      .catch(e => {
        onError("ERROR")
        console.log(e)
      })
  }

  const handleChangeChangedFileList = ({fileList}) => {
    if (!fileList.length) setChangedImageUrl("")
    setChangedFileList(fileList)
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
        reader.onerror = e => reject(e)
      })
    }
    setPreview({
      image: file.url || file.preview,
      open: true,
      title: file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    })
  }
  const handleCancel = () => {
    setPreview(v => ({...v, open: false}))
  }

  const handleClick = (callback) => {
    setIsLoading(true)
    setIsError("")
    instance.put(`${BASE_URL_RESERVATIONS}/officeLevels/${level.id}`, {
      number: changedNumber,
      imageUrl: changedImageUrl
    })
      .then(() => {
        callback()
        setChangedImageUrl("")
        setChangedFileList([])
        setChangedNumber(1)
      })
      .catch(() => {
        setIsError("Ошибка при изменении этажа")
      })
      .finally(() => {
        setIsLoading(false)
        setAlertShow(true)
        setTimeout(() => setAlertShow(false), 3000)
      })
  }

  return {
    changedNumber,
    changedFileList,
    changedImageUrl,
    handleClick,
    isLoading,
    isError,
    alertShow,
    handlePreview,
    customRequest,
    handleChangeChangedNumber,
    preview,
    handleCancel,
    handleChangeChangedFileList
  }
}

export const deleteLevel = (levelId, callback) => {
  instance.delete(`${BASE_URL_RESERVATIONS}/officeLevels/${levelId}`)
    .then(() => {
      callback(true)
    })
    .catch(e => {
      console.error(e.message)
    })
}

export const useGetWorkspaces = (levelId = null) => {
  const [workspaces, setWorkspaces] = useState([])
  const [workspaceId, setWorkspaceId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState("")
  const [flag, setFlag] = useState(false)

  const trigger = (value = null) => {
    setFlag(!flag)
    if (value) {
      setWorkspaceId(null)
    }
  }

  const handleClearOrSelectWorkspace = (value = null) => {
    setWorkspaceId(value)
  }

  useEffect(() => {
    if (!levelId) return
    setIsLoading(true)
    setIsError("")
    instance.get(`${BASE_URL_RESERVATIONS}/officeLevels/levelWithWorkplaces/${levelId}`)
      .then(res => {
        setWorkspaces(res.data.workspaces)
      })
      .catch(e => {
        console.error(e)
        setIsError("Ошибка при загрузке рабочих мест")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [levelId, flag])

  return {
    workspaces,
    workspaceId,
    isLoading,
    isError,
    trigger,
    handleClearOrSelectWorkspace
  }
}

export const useAddWorkspace = (levelId = null) => {
  const [types, setTypes] = useState([])
  const [newTypeId, setNewTypeId] = useState(null)
  const [newNumberOfWorkSpaces, setNewNumberOfWorkSpaces] = useState(1)
  const [newDescription, setNewDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState("")
  const [alertShow, setAlertShow] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setIsError("")
    instance.get(`${BASE_URL_RESERVATIONS}/workspaces/types`)
      .then(res => {
        setTypes(res.data.map(el => ({label: el.type, value: el.id})))
      })
      .catch(e => {
        console.error("Ошибка про загрузке типов рабочих мест")
        console.error(e.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])
  const handleChangeNewNumberOfWorkspaces = e => {
    const value = e.target.value
    if (!value.length || +value < 1) return setNewNumberOfWorkSpaces(1)
    setNewNumberOfWorkSpaces(+value)
  }

  const handleChangeNewTypeId = (value = null) => {
    setNewTypeId(value)
  }

  const handleChangeNewDescription = e => {
    setNewDescription(e.target.value)
  }

  const handleClick = callback => {
    setIsLoading(true)
    setIsError("")
    instance.post(`${BASE_URL_RESERVATIONS}/workspaces`, {
      numberOfWorkspaces: newNumberOfWorkSpaces,
      description: newDescription,
      isActive: true,
      positionX: 40,
      positionY: 40,
      sizeX: 40,
      sizeY: 40,
      typeId: newTypeId,
      levelId: levelId,
      photos: []
    })
      .then(() => {
        callback()
        setNewNumberOfWorkSpaces(1)
        setNewDescription("")
        setNewTypeId(null)
      })
      .catch(e => {
        console.error(e.message)
        setIsError("Ошибка при создании места")
      })
      .finally(() => {
        setIsLoading(false)
        setAlertShow(true)
        setTimeout(() => setAlertShow(false), 3000)
      })
  }
  return {
    alertShow,
    isLoading,
    isError,
    types,
    newTypeId,
    newDescription,
    newNumberOfWorkSpaces,
    handleClick,
    handleChangeNewNumberOfWorkspaces,
    handleChangeNewDescription,
    handleChangeNewTypeId
  }
}

export const useChangeWorkspace = (levelId = null, workspace = null) => {
  const [changedNumberOfWorkSpaces, setChangedNumberOfWorkSpaces] = useState(1)
  const [changedDescription, setChangedDescription] = useState("")
  const [changedFileList, setChangedFileList] = useState([])
  const [changedImageUrls, setChangedImageUrls] = useState([])
  const [changedActivity, setChangedActivity] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState("")
  const [preview, setPreview] = useState({
    open: false,
    title: "",
    image: ""
  })
  const [alertShow, setAlertShow] = useState(false)

  useEffect(() => {
    if (!workspace) return
    setChangedDescription(workspace.description)
    setChangedNumberOfWorkSpaces(workspace.numberOfWorkspaces)
    setChangedActivity(workspace.isActive)
    setChangedFileList(
      workspace.photos
        .map((imageUrl, i) => ({
          uid: `-${i + 1}`,
          status: "done",
          percent: 100,
          name: "photo",
          url: imageUrl,
        }))
    )
    setChangedImageUrls(
      workspace.photos.map((v, i) => ({uid: `-${i + 1}`, url: v}))
    )
  }, [workspace])

  const handleChangeChangedNumberOfWorkspaces = e => {
    const value = e.target.value
    if (!value.length || +value < 1) return setChangedNumberOfWorkSpaces(1)
    setChangedNumberOfWorkSpaces(+value)
  }

  const beforeUpload = file => {
    const isPNG = file.type === "image/png"
    const isJPG = file.type === "image/jpeg"
    return (isJPG || isPNG) || Upload.LIST_IGNORE
  }

  const handleChangeChangedDescription = e => {
    setChangedDescription(e.target.value)
  }
  const handleClick = callback => {
    setIsLoading(true)
    setIsError("")
    instance.put(`${BASE_URL_RESERVATIONS}/workspaces`, [{
      id: workspace.id,
      numberOfWorkspaces: changedNumberOfWorkSpaces,
      description: changedDescription,
      isActive: changedActivity,
      positionX: 40,
      positionY: 40,
      sizeX: 40,
      sizeY: 40,
      photos: [...changedImageUrls.map(({url}) => url)]
    }])
      .then(() => {
        callback()
      })
      .catch(e => {
        console.error(e.message)
        setIsError("Ошибка при изменении места")
      })
      .finally(() => {
        setIsLoading(false)
        setAlertShow(true)
        setTimeout(() => setAlertShow(false), 3000)
      })
  }

  const customRequest = async ({onProgress, onError, onSuccess, file}) => {
    const fmData = new FormData()
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      },
      onUploadProgress: e => {
        const percent = Math.floor((e.loaded / e.total) * 100)
        onProgress({percent})
      }
    }
    fmData.append("image", file)
    instance.post(`${BASE_URL_IMAGE}/images`, fmData, config)
      .then(res => {
        onSuccess("OK")
        setChangedImageUrls(v => [...v, {url: res.data.imageUrl, uid: file.uid}])
      })
      .catch(e => {
        onError("ERROR")
        console.log(e)
      })
  }

  const handleRemove = (file) => {
    setChangedImageUrls(arr => arr.filter(({uid}) => file.uid !== uid))
  }

  const handleChangeChangedFileList = ({fileList}) => {
    if (!fileList.length) setChangedImageUrls([])
    setChangedFileList(fileList)
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
        reader.onerror = e => reject(e)
      })
    }
    setPreview({
      image: file.url || file.preview,
      open: true,
      title: file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    })
  }

  const handleCancel = () => {
    setPreview(v => ({...v, open: false}))
  }

  return {
    changedNumberOfWorkSpaces,
    changedDescription,
    changedFileList,
    changedImageUrls,
    changedActivity,
    isLoading,
    isError,
    preview,
    setChangedActivity,
    handleChangeChangedDescription,
    handleClick,
    handleCancel,
    handlePreview,
    handleChangeChangedFileList,
    handleChangeChangedNumberOfWorkspaces,
    customRequest,
    alertShow,
    beforeUpload,
    handleRemove
  }
}

export const deleteWorkspace = (workspaceId, callback) => {
  instance.delete(`${BASE_URL_RESERVATIONS}/workspaces/${workspaceId}`)
    .then(() => {
      callback(true)
    })
    .catch(e => {
      console.error(e.message)
    })
}


export function useGetUsersBookings(id, page) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    instance
      .get(
        `${BASE_URL_RESERVATIONS}/reservations/user/${id}?isHolder=${
          page === "guests" ? false : true
        }&isGuest=${page === "guests" ? true : false}`
      )
      .then((response) => setBookings(response.data))
      .catch((error) => {
        setIsError(true);
        console.error(error);
      })
      .finally(() => setIsLoading(false));
      // eslint-disable-next-line
  }, [id]);
  return [bookings, setBookings,isError, isLoading];
}

export function useDeleteBookings() {
  // eslint-disable-next-line
  const [isError, setIsError] = useState(false);

  async function deleteBooking(bookingId, bookings, setBookings, onClose) {
    setIsError(false);
    try {
      await instance.delete(
        `${BASE_URL_RESERVATIONS}/reservations/${bookingId}`
      );
      const updatedBookings = bookings.filter(
        (booking) => booking.id !== bookingId
      );
      setBookings(updatedBookings);
      onClose();
    } catch (err) {
      setIsError(true);
      console.error(err);
    }
  }
  return [deleteBooking];
}

export function usePostBooking() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function postBooking(data) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await instance.post(
        `${BASE_URL_RESERVATIONS}/reservations`,
        data
      );
      setIsLoading(false);
      navigate("/bookings");
      return response;
    } catch (error) {
      setError(error);
      console.error(error);
      setIsLoading(false);
      return error;
    }
  }

  return { isLoading, error, postBooking };
}

export const useGetOfficeInfo = (officeId) => {
  const [office, setOffice] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!officeId) return
    setIsError(false)
    setIsLoading(true)
    instance.get(`${BASE_URL_RESERVATIONS}/offices/info/${officeId}`)
      .then(res => {
        setOffice(res.data)
      })
      .catch(e => {
        console.error(e.message)
        setIsError(true)
      })
      .finally(() => [
        setIsLoading(false)
      ])
  }, [officeId])
  return {isLoading, isError, office, setOffice}
}

export const useGetWorkspaceImagesUrls = (photos) => {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!photos || !Array.isArray(photos)) return;
    setIsLoading(true);
    setIsError(false);
    const promises = photos.map(photo =>
      instance
        .get(photo, { responseType: "blob" })
        .then(res => URL.createObjectURL(res.data))
        .catch(e => {
          setIsError(true);
          console.error(e.message);
          return null;
        })
    );
    Promise.all(promises).then(results => {
      setUrls(results.filter(url => url !== null));
      setIsLoading(false);
    });
  }, [photos]);
  return { urls, isLoading, isError, setUrls };
};
