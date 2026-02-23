import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email</label>
        <input
          type="email"
          value={email}
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Enter your password</label>
        <input
          type="password"
          value={password}
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
