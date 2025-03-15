import { LoginErrorResponse } from "@/interfaces/ILoginError";
import axios from "axios";
import { axiosInstance } from "./axios";

export async function logUser(username: string, password: string) {
  try {
    const { data } = await axiosInstance.post("/login", {
      username,
      password,
    });

    localStorage.setItem("authToken", data.token);
    localStorage.setItem("username", data.user.username);
    return data.token;
  } catch (error: unknown) {
    throw handleAxiosError(error);
  }
}

function handleAxiosError(error: unknown): Error {
  if (axios.isAxiosError<LoginErrorResponse>(error)) {
    return new Error(error.response?.data?.error || "Erro inesperado.");
  }
  return new Error("Erro desconhecido.");
}
