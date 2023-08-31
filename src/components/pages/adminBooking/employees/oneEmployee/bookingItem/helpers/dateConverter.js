import moment from "moment";


export const toStringDate = datetime => {
  moment.locale('ru')
  return moment(datetime).format('D MMMM YYYY г.')
}

export const toNumberDate = datetime => {
  const date = new Date(datetime)
  return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`
}
