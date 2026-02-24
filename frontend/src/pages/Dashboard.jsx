import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboardStats().then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>RBAC Overview</h2>

      <div>
        <p>Users: {data.users}</p>
        <p>Active: {data.activeUsers}</p>
        <p>Pending: {data.pendingUsers}</p>
        <p>Roles: {data.roles}</p>
        <p>Permissions: {data.permissions}</p>
      </div>

      <h3>Recent Users</h3>

      <ul>
        {data.recentUsers.map((u) => (
          <li key={u._id}>
            {u.name} - {u.role?.name} - {u.status}
          </li>
        ))}
      </ul>
    </div>
  );
}