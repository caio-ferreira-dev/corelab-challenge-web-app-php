import { createNote } from "@/lib/axios";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

export function useCreateMutation() {
  return useMutation({
    mutationFn: ({
      name,
      content,
      favorite,
      color,
    }: {
      name: string;
      content: string;
      favorite: boolean;
      color: string;
    }) => {
      return createNote(name, content, favorite, color);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["notesArray"],
        type: "active",
        exact: true,
      });
    },
    retry: false,
  });
}
