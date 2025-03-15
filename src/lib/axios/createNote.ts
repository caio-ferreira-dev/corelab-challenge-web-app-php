import { axiosInstance } from "./axios";

export async function createNote(
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

  const { data } = await axiosInstance.post("/notes", requestData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
}
