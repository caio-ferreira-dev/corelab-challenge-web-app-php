import { useMutation } from "@tanstack/react-query";
import { logUser } from "@/lib/axios/loginUser";

export function useLoginMutation() {
  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => logUser(username, password),
    retry: false,
  });
}
