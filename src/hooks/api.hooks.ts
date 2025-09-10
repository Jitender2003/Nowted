import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type {
  RecentNotesResponseData,
  FoldersResponseData,
  NoteListResponseData,
} from "../types/interface";

type GetNotesParams = {
  folderid?: string;
  archived?: boolean;
  favorite?: boolean;
  deleted?: boolean;
  searchstring?: string;
};

const publicAxios = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

// get recent notes
export const useGetRecentNotes = () => {
  return useQuery<RecentNotesResponseData>({
    queryKey: ["recentnotes"],
    queryFn: async () => {
      const response = await publicAxios.get("/notes/recent");
      return response.data;
    },

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

//get folder list
export const useGetFolders = () => {
  return useQuery<FoldersResponseData>({
    queryKey: ["folders"],
    queryFn: async () => {
      const response = await publicAxios.get("/folders");
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

// get notes =
export const useGetNote = (params: GetNotesParams) => {
  return useQuery<NoteListResponseData[]>({
    queryKey: ["notes", params],
    queryFn: async () => {
      const response = await publicAxios.get("/notes", { params });
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

// get note by id
export const useGetNoteById = (noteid?: string) => {
  return useQuery({
    queryKey: ["notes", noteid],
    queryFn: async () => {
      const response = await publicAxios.get(`/notes/${noteid}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!noteid,
  });
};
