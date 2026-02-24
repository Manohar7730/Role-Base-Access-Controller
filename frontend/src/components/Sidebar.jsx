import { Link, useNavigate, useLocation } from "react-router-dom";
import PermissionGuard from "./PermissionGuard";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import React from "react";

const MENU_ITEMS = [
  { label: "Dashboard", path: "/dashboard" },

  { label: "Users", path: "/users", permission: "user.read" },

  { label: "Roles", path: "/roles", permission: "role.read" },

  { label: "Permissions", path: "/permissions", permission: "permission.read" },

  { label: "Change Password", path: "/change-password" },
];

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const isSuperAdmin = user?.role?.name === "SUPER_ADMIN";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">

      <h1 className="text-xl font-bold mb-6">RBAC Panel</h1>

      <nav className="flex flex-col gap-1">
        {MENU_ITEMS.map((item) => {
          const link = (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded transition
                ${
                  location.pathname === item.path
                    ? "bg-gray-700"
                    : "hover:bg-gray-800"
                }`}
            >
              {item.label}
            </Link>
          );

          if (isSuperAdmin || !item.permission) return link;

          return (
            <PermissionGuard key={item.path} permission={item.permission}>
              {link}
            </PermissionGuard>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto bg-red-500 hover:bg-red-600 py-2 rounded transition"
      >
        Logout
      </button>

    </aside>
  );
}

export default React.memo(Sidebar);