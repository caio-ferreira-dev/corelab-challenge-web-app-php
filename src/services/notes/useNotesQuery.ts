import { fetchNotes } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useNotesQuery() {
  return useQuery({
    queryKey: ["notesArray"],
    queryFn: () => {
      return fetchNotes();
    },
    retry: false,
  });
}
