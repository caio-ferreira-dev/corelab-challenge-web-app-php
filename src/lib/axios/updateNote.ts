import { axiosInstance } from "./axios";

export async function updateNote(
  id: number,
  name: string,
  content: string,
  favorite: boolean,
  color: string
) {
  const token = localStorage.getItem("authToken");
  const requestData = {
    name,
    content,
    favorite,
    color,
  };

  const { data } = await axiosInstance.patch(`/notes/${id}`, requestData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
}
