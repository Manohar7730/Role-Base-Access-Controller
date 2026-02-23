import React from "react";
import PermissionGuard from "../components/PermissionGuard";

export default function Dashboard() {
  return (
    <>
      <PermissionGuard permission="user.read">
        <h2>Users Section Visible</h2>
      </PermissionGuard>

      <PermissionGuard permission="permission.create">
        <h2>Permission Create Visible</h2>
      </PermissionGuard>
    </>
  );
}
