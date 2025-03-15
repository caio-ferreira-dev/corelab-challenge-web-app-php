import { axiosInstance } from "./axios";

export async function registerUser(username: string, password: string) {
  const { data } = await axiosInstance.post("/register", {
    username,
    password,
  });

  return data.token;
}
