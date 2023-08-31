import { useState } from "react";
import { useQuery } from "react-query";
import { instance } from "../api/api.config";
import { BASE_URL_INTERACTION } from "./config";

export function useGetInteractions({ receiverId, typeId, page, perPage }) {
  return useQuery({
    queryKey: ["interactions", receiverId, typeId, page, perPage],
    queryFn: async () => {
      const { data } = await instance.get(
        `${BASE_URL_INTERACTION}/interactions`,
        {
          params: {
            receiverId,
            typeId,
            page,
            perPage,
          },
        }
      );
      return data;
    },
  });
}

export function useGetImagesForType(typeId) {
  return useQuery({
    queryKey: ["imagesForType", typeId],
    queryFn: async () => {
      const { data } = await instance.get(
        `${BASE_URL_INTERACTION}/image-interactions/types/${typeId}`
      );
      return data.values;
    },
  });
}

export function useGetInteraction(id) {
  return useQuery({
    queryKey: ["interaction", id],
    queryFn: async () => {
      const { data } = await instance.get(
        `${BASE_URL_INTERACTION}/interactions/${id}`
      );
      return data;
    },
  });
}

export function usePostInteraction() {
  const [isLoading, setIsLoading] = useState(false);

  async function postInteraction(data) {
    setIsLoading(true);

    try {
      const response = await instance.post(
        `${BASE_URL_INTERACTION}/interactions`,
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

  return { isLoading, postInteraction };
}
