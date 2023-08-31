import moment from "moment";
import 'moment/locale/ru'

const convert = datetime => {
  moment.locale('ru')
  let a = moment(datetime)
  if ((Date.now() - new Date(datetime)) / 1000 / 60 / 60 >= 48)
    return a.format("Do MMM, HH:mm")
  return a.calendar()
}

export default convert
