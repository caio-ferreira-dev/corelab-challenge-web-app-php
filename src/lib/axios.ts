import INote from "@/interfaces/INote";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchToken(username: string, password: string) {
  const { data } = await axiosInstance.post("/login", {
    username,
    password,
  });

  localStorage.setItem("authToken", data.token);
  localStorage.setItem("username", data.user.username);
  return data.token;
}

export async function registerUser(username: string, password: string) {
  const { data } = await axiosInstance.post("/register", {
    username,
    password,
  });

  return data.token;
}

export async function fetchNotes() {
  const token = localStorage.getItem("authToken");
  const { data } = await axiosInstance.get<INote[]>("/notes", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
}

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

export async function deleteNote(id: number) {
  const token = localStorage.getItem("authToken");

  const { data } = await axiosInstance.delete(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
}
