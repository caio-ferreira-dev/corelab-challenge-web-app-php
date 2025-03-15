import { getNotes } from "@/lib/axios/getNotes";
import { useQuery } from "@tanstack/react-query";

export function useNotesQuery() {
  return useQuery({
    queryKey: ["notesArray"],
    queryFn: () => {
      return getNotes();
    },
    retry: false,
  });
}
