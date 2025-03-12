import { useMutation } from "@tanstack/react-query";
import { fetchToken } from "@/lib/axios";

export function useLoginMutation() {
  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => fetchToken(username, password),
    retry: false,
  });
}
