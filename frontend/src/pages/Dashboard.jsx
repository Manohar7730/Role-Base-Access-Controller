import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../features/dashboard/dashboardSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!data) {
    return <p className="text-red-500">Failed to load data</p>;
  }

  const styles = {
    title: {
      fontSize: "22px",
      fontWeight: "600",
      marginBottom: "16px",
      color: "#111827",
    },
  };

  return (
    <div className="space-y-6">
      <h2 style={styles.title}>RBAC Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-3xl font-bold">{data.users}</p>

          <div className="mt-3 text-sm text-gray-600">
            <p>Active: {data.activeUsers}</p>
            <p>Pending: {data.pendingUsers}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Total Roles</h3>
          <p className="text-3xl font-bold">{data.roles}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500">Total Permissions</h3>
          <p className="text-3xl font-bold">{data.permissions}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">
          Recent Users
        </h3>

        <ul className="divide-y">
          {data.recentUsers.map((u) => (
            <li
              key={u._id}
              className="py-2 flex justify-between items-center"
            >
              <span>{u.name}</span>
              <span className="text-sm text-gray-600">
                {u.role?.name} • {u.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}