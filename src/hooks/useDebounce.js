import {useEffect, useState} from "react";

//Описание хука можете найти здесь
// https://habr.com/ru/articles/492248/

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [delay, value])

  return debouncedValue
}
