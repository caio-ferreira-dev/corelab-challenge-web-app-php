import { axiosInstance } from "./axios";

export async function deleteNote(id: number) {
  const token = localStorage.getItem("authToken");

  const { data } = await axiosInstance.delete(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
}
