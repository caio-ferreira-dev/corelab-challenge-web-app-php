import { updateNote } from "@/lib/axios";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

export function useUpdateMutation() {
  return useMutation({
    mutationFn: ({
      id,
      name,
      content,
      favorite,
      color,
    }: {
      id: number;
      name: string;
      content: string;
      favorite: boolean;
      color: string;
    }) => {
      return updateNote(id, name, content, favorite, color);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["notesArray"],
        type: "active",
        exact: true,
      });
    },
    retry: false
  });
}
