import React, { useState } from "react";
import { registerUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({name, email, password}));
    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your name</label>
        <input
          type="name"
          value={name}
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
