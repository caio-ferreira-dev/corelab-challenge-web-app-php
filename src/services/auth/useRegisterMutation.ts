import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/axios";

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
