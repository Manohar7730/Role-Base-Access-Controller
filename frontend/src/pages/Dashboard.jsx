import React from "react";
import PermissionGuard from "../components/PermissionGuard";
import Users from "./Users";

export default function Dashboard() {
  return (
    <>
      <PermissionGuard permission="user.read">
        <Users/>
      </PermissionGuard>

      <PermissionGuard permission="permission.create">
        <h2>Permission Create Visible</h2>
      </PermissionGuard>
   
    </>
  );
}
