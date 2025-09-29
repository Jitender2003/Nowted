// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError(null); // reset previous error

      await axios.post(
        "http://localhost:3000/auth/login",
        { usernameOrEmail, password },
        { withCredentials: true } // important for JWT cookie
      );

      await checkAuth(); // refresh auth context
      navigate("/Nowted"); // redirect after login
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>Login</h2>
      <input
        type="text"
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
        placeholder="Username or Email"
        style={{ display: "block", marginBottom: "1rem", width: "100%" }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{ display: "block", marginBottom: "1rem", width: "100%" }}
      />
      <button onClick={handleLogin} style={{ width: "100%" }}>
        Login
      </button>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
};
