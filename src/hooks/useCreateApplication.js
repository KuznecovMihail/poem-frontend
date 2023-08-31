import { useState } from "react";
import { instance } from "../../src/api/api.config";
import { BASE_URL_APPLICATIONS } from "./config";

export default function useCreateApplication() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const createApplication = async (formData) => {
    setIsLoading(true);
    try {
      // eslint-disable-next-line
      const response = await instance.post(
        `${BASE_URL_APPLICATIONS}/applications`,
        formData
      );
    } catch (e) {
      console.error(e);
      setError(e);
    }
    setIsLoading(false);
  };
  return { createApplication, isLoading, error };
}
