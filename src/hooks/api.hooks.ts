import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type {
  RecentNotesResponseData,
  FoldersResponseData,
  NoteListResponseData,
} from "../types/interface";

export type GetNotesParams = {
  folderid?: string;
  archived?: boolean;
  favorite?: boolean;
  deleted?: boolean;
  searchstring?: string;
  enabled?: boolean;
};

type PatchNoteParams = {
  name?: string;
  content?: string;
  isFavorite?: boolean;
  isArchived?: boolean;
};

type PatchFolderParams = {
  name: string;
  id: string;
};

type CreateNoteParams = {
  folderid: string;
  name: string;
  content: string;
};

type CreateFolderParams = {
  name: string;
};

type DeleteNoteParams = {
  id?: string;
};

type RestoreNoteParams = {
  id?: string;
};

// Public Axios for signup/login
export const publicAxios = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

// Private Axios for authenticated requests
export const privateAxios = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // important for JWT cookies
});

// Create new note
export const useCreateNewNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: CreateNoteParams) => {
      const response = await privateAxios.post("/notes", params);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["recentnotes"] });
    },
    onError: (error) => console.error("Failed to create note:", error),
  });
};

// Get notes
export const useGetNote = (params: GetNotesParams) => {
  return useQuery<NoteListResponseData>({
    queryKey: ["notes", params],
    queryFn: async () => {
      const response = await privateAxios.get("/notes", { params });
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: params?.enabled !== false,
  });
};

// Get note by id
export const useGetNoteById = (noteid?: string) => {
  return useQuery({
    queryKey: ["notes", noteid],
    queryFn: async () => {
      const response = await privateAxios.get(`/notes/${noteid}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!noteid,
  });
};

// Patch note
export const usePatchNote = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PatchNoteParams) => {
      const response = await privateAxios.patch(`/notes/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["recentnotes"] });
    },
    onError: (error) => console.error("Failed to update note:", error),
  });
};

// Delete note
export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: DeleteNoteParams) => {
      const response = await privateAxios.delete(`/notes/${data.id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["recentnotes"] });
    },
  });
};

// Restore note
export const useRestoreNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RestoreNoteParams) => {
      const response = await privateAxios.post(`/notes/${data.id}/restore`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["recentnotes"] });
    },
  });
};

// Get recent notes
export const useGetRecentNotes = () => {
  return useQuery<RecentNotesResponseData>({
    queryKey: ["recentnotes"],
    queryFn: async () => {
      const response = await privateAxios.get("/notes/recent");
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

// -------------------- Folders --------------------

// Create new folder
export const useCreateNewFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (param: CreateFolderParams) => {
      const response = await privateAxios.post("/folders", param);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
    onError: (error) => console.error("Failed to create folder:", error),
  });
};

// Get folders
export const useGetFolders = () => {
  return useQuery<FoldersResponseData>({
    queryKey: ["folders"],
    queryFn: async () => {
      const response = await privateAxios.get("/folders");
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

// Patch folder
export const usePatchFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PatchFolderParams) => {
      const response = await privateAxios.patch(`/folders/${data.id}`, {
        name: data.name,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error) => console.error("Failed to update folder:", error),
  });
};
