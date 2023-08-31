import { useQuery } from "react-query";
import { instance } from "../api/api.config";
import { BASE_URL_IMAGE } from "./config";
import avatarImg from "../img/defaultAvatar.jpg";
import defaultImg from "../img/defaultImage.jpg";

export function useGetImage(imageUrl, isAvatar = false) {
  const { data = isAvatar ? avatarImg : defaultImg } = useQuery({
    queryKey: ["image", imageUrl],
    queryFn: async () => {
      const response = await instance.get(imageUrl, { responseType: "blob" });
      return URL.createObjectURL(response.data);
    },
  });
  return [data];
}

export async function postImage(formData) {
  try {
    return await instance.post(`${BASE_URL_IMAGE}/images`, formData);
  } catch (error) {
    console.error(error);
    return error;
  }
}
