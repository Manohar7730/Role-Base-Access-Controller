import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  makeUpdateUserRole,
  makeUpdateUserStatus,
} from "../features/users/usersSlice";
import { fetchRoles } from "../features/roles/rolesSlice";
import api from "../services/api";

export default function Users() {
  const dispatch = useDispatch();

  const { list, loading } = useSelector((state) => state.users);
  const { roleList, roleLoading } = useSelector((state) => state.roles);

  const [showReset, setShowReset] = useState(null);
  const [tempPassword, setTempPassword] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRoles());
  }, [dispatch]);

  const toggleStatus = (user) => {
    const newStatus = user.status === "ACTIVE" ? "PENDING" : "ACTIVE";

    dispatch(
      makeUpdateUserStatus({
        id: user._id,
        status: newStatus,
      })
    );
  };

  const handleRoleChange = (userId, roleName) => {
    dispatch(makeUpdateUserRole({ id: userId, role: roleName }));
  };

  const handleReset = async (userId) => {
    if (!tempPassword) return alert("Enter new password");

    try {
      await api.patch(`/api/users/${userId}/reset-password`, {
        newPassword: tempPassword,
      });

      alert("Password reset successfully");

      setShowReset(null);
      setTempPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Error resetting password");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Activate / Deactivate</th>
            <th>Reset Password</th>
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
                  onChange={(e) =>
                    handleRoleChange(u._id, e.target.value)
                  }
                >
                  {roleList.map((r) => (
                    <option key={r._id} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                <button onClick={() => toggleStatus(u)}>
                  {u.status === "ACTIVE"
                    ? "Deactivate"
                    : "Activate"}
                </button>
              </td>

              <td>
                {showReset === u._id ? (
                  <>
                    <input
                      placeholder="Temp Password"
                      value={tempPassword}
                      onChange={(e) =>
                        setTempPassword(e.target.value)
                      }
                    />
                    <button onClick={() => handleReset(u._id)}>
                      Save
                    </button>
                    <button onClick={() => setShowReset(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => setShowReset(u._id)}>
                    Reset
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}