import { useQuery } from "react-query";
import { instance } from "../api/api.config";
import { BASE_URL_DICTIONARY } from "./config";

export function useGetDictionaryForApplications() {
  return useQuery("applications", async () => {
    const response = await instance.get(
      `${BASE_URL_DICTIONARY}/dictionaries?technicalCode=tc1&technicalCode=tc2&technicalCode=tc3&technicalCode=tc5`
    );
    return response.data.values;
  });
}

export function useGetDictionaryForNotifications() {
  return useQuery("notifications", async () => {
    const response = await instance.get(
      `${BASE_URL_DICTIONARY}/dictionaries?technicalCode=tc10&technicalCode=tc11&technicalCode=tc12`
    );
    return response.data.values;
  });
}

export function useGetDictionaryForNews() {
  return useQuery("news", async () => {
    const response = await instance.get(
      `${BASE_URL_DICTIONARY}/dictionaries?technicalCode=tc6`
    );
    return response.data.values;
  });
}

export function useGetDictionaryForBantiki() {
  return useQuery("bantiki", async () => {
    const response = await instance.get(
      `${BASE_URL_DICTIONARY}/dictionaries?technicalCode=tc4`
    );
    return response.data.values;
  });
}

export function useGetDictionaryForEmployeeStatus() {
  return useQuery("employeeStatus", async () => {
    const response = await instance.get(
      `${BASE_URL_DICTIONARY}/dictionaries?technicalCode=tc9`
    );
    return response.data.values;
  });
}

export function useGetDictionaryForUserStatus() {
  return useQuery("userStatus", async () => {
    const response = await instance.get(
      `${BASE_URL_DICTIONARY}/dictionaries?technicalCode=tc8`
    );
    return response.data.values;
  });
}
