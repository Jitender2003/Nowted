import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type loginPayload = {
  usernameOrEmail: string;
  password: string;
};

type loginResponse = {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
};

type loginError = {
  errorType: string;
  error: {
    field: string;
    message: string;
  };
};

type signupPayload = {
  username: string;
  email: string;
  password: string;
};

type signupResponse = {
  message: string;
  userId: string;
};

type signupError = {
  errorType: string;
  error: {
    field: string;
    message: string;
  };
};

const privateAxios = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const useAuthApi = {
  useLogin: (
    options?: Partial<
      UseMutationOptions<loginResponse, AxiosError<loginError>, loginPayload>
    >
  ) => {
    return useMutation({
      mutationKey: ["login"],
      mutationFn: async (data: loginPayload) => {
        const response = await privateAxios.post("/auth/login", {
          usernameOrEmail: data.usernameOrEmail,
          password: data.password,
        });
        return response.data;
      },
      ...options,
    });
  },

  useSignup: (
    options?: Partial<
      UseMutationOptions<signupResponse, AxiosError<signupError>, signupPayload>
    >
  ) => {
    return useMutation({
      mutationKey: ["signup"],
      mutationFn: async (data: signupPayload) => {
        const response = await privateAxios.post("/auth/signup", {
          username: data.username,
          email: data.email,
          password: data.password,
        });
        return response.data;
      },
      ...options,
    });
  },
};
