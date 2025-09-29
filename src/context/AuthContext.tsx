import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";

type User = { id: string; username: string; email: string };
type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  checkAuth: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  checkAuth: async () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // <--- new state

  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/check", {
        withCredentials: true,
      });
      setIsAuthenticated(true);
      setUser(res.data.user);
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false); // <--- mark loading done
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, checkAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
