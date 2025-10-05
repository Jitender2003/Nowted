import { createContext, useContext } from "react";

export type User = { id: string; username: string; email: string };

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  checkAuth: () => Promise<void>;
  loading: boolean;
};

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  checkAuth: async () => {},
  loading: true,
});

// Custom hook for consuming the context
export const useAuth = () => useContext(AuthContext);
