import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export default function PermissionGuard({ permission,children }) {
  const permissions = useSelector((state) => state.auth.permissions);
  if (!permissions?.includes(permission)) {
    return null;
  }

  return <>{children}</>;
}
