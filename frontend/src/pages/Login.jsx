import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      navigate("/dashboard", { replace: true });
    }

    setShowPassword(false);
    setEmail("");
    setPassword("");
  };

  /* Internal CSS */
  const styles = {
    title: {
      fontSize: "22px",
      fontWeight: "600",
      marginBottom: "16px",
      color: "#111827",
    },
    card: {
      maxWidth: "450px",
      background: "#ffffff",
      padding: "24px",
      borderRadius: "8px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      width: "100%",
    },
    label: {
      display: "block",
      marginBottom: "4px",
      fontWeight: "500",
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen">

      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        <form onSubmit={handleSubmit}>

          <label style={styles.label}>Email</label>
          <input
            className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label style={styles.label}>Password</label>
          <input
            className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </Button>

          <div style={{ marginTop: "12px" }}>
            <Button type="submit">Login</Button>
          </div>

          <p style={{ marginTop: "14px" }}>
            New User?{" "}
            <Link className="link-btn" to="/register">
              Sign Up
            </Link>
          </p>

          <div style={{ marginTop: "10px" }}>
            <Button onClick={() => navigate("/")}>
              ⬅ Back to Home
            </Button>
          </div>

        </form>
      </div>

    </div>
  );
}