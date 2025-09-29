// src/pages/Signup.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setError(null); // reset previous error

      await axios.post(
        "http://localhost:3000/auth/signup",
        { username, email, password },
        { withCredentials: true }
      );

      navigate("/Nowted/login");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>Signup</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        style={{ display: "block", marginBottom: "1rem", width: "100%" }}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={{ display: "block", marginBottom: "1rem", width: "100%" }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{ display: "block", marginBottom: "1rem", width: "100%" }}
      />
      <button onClick={handleSignup} style={{ width: "100%" }}>
        Signup
      </button>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
};
