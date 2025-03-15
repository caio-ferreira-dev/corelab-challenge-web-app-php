import { registerUser } from "@/lib/axios/registerUser";
import { useMutation } from "@tanstack/react-query";

export function useRegisterMutation() {
  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => registerUser(username, password),
  });
}
