import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
