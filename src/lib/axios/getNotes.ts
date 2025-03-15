import INote from "@/interfaces/INote";
import { axiosInstance } from "./axios";

export async function getNotes() {
    const token = localStorage.getItem("authToken");
    const { data } = await axiosInstance.get<INote[]>("/notes", {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    return data;
  }