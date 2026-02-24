import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import PublicRoute from "./PublicRoute";
import Users from "../pages/Users";
import Permissions from "../pages/Permissions";
import Roles from "../pages/Roles";
import EditRole from "../pages/EditRole";
import CreateRole from "../pages/createRole";
import ChangePassword from "../pages/ChangePassword";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/permissions" element={<Permissions />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/roles/:id" element={<EditRole />} />
            <Route path="/roles/create" element={<CreateRole />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
