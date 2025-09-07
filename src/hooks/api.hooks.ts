import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const publicAxios = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

export const useGetFolders = () => {
  return useQuery({
    queryKey: ["folders"],
    queryFn: async () => {
      const response = await publicAxios.get("/folders");
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
