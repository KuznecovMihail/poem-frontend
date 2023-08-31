import moment from "moment";

export const getValueFromDate = datetime => {
  const objectDate = new Date(datetime)
  return objectDate.getHours() * 60 + objectDate.getMinutes()
}

export const getDateStringFromValue = value => {
  return new Date(2023, 5, 4, Math.floor(value / 60), value % 60).toISOString()
}
export const convertTime = number => {
  moment.locale("ru")
  let a = moment(new Date(2023, 5, 3, Math.floor(number / 60), number % 60))
  return a.format(" HH:mm")
}

export const onChangeSlider = ([start, end], setOffice) => {
  if (start >= end) [start,end] = [end, start]

  setOffice(office => ({
    ...office,
    workStart:getDateStringFromValue(start),
    workEnd: getDateStringFromValue(end)
  }))
  return [end, start]
}
