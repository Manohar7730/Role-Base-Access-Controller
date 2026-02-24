import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, makeUpdateUserRole } from "../features/users/usersSlice";
import { makeUpdateUserStatus } from "../features/users/usersSlice";
import { fetchRoles } from "../features/roles/rolesSlice";

export default function Users() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.users);
  const { roleList, roleLoading } = useSelector((state) => state.roles);
  const toggleStatus = (user) => {
    const newStatus = user.status === "ACTIVE" ? "PENDING" : "ACTIVE";

    dispatch(
      makeUpdateUserStatus({
        id: user._id,
        status: newStatus,
      }),
    );
  };
  const handleRoleChange = (userId, roleId) => {
    dispatch(makeUpdateUserRole({ id: userId, role: roleId }));
  };
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRoles());
  }, [dispatch]);
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Activate/Deactivate</th>
          </tr>
        </thead>
        <tbody>
          {list.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.status}</td>
              <td>
                <select
                  value={u.role?.name || ""}
                  disabled={roleLoading}
                  onChange={(e) => handleRoleChange(u._id, e.target.value)}
                >
                  {roleList.map((r) => (
                    <option key={r._id} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button onClick={() => toggleStatus(u)} disabled={loading}>
                  {u.status === "ACTIVE" ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
