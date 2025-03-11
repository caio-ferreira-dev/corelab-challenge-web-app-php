import { deleteNote } from "@/lib/axios";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

export function useDeleteMutation() {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return deleteNote(id);
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
