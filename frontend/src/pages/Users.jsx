import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  makeUpdateUserRole,
  makeUpdateUserStatus,
} from "../features/users/usersSlice";
import { fetchRoles } from "../features/roles/rolesSlice";
import api from "../services/api";
import "../styles/table.css";
import Button from "../components/ui/Button";

export default function Users() {

  /* Internal CSS */
  const styles = {
    title: {
      fontSize: "22px",
      fontWeight: "600",
      marginBottom: "16px",
      color: "#111827",
    },
  };

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

      {/* Page Title */}
      <h2 style={styles.title}>Users</h2>

      <div className="table-container">
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

                {/* Inline Conditional Styling */}
                <td
                  style={{
                    color: u.status === "ACTIVE" ? "#16a34a" : "#dc2626",
                    fontWeight: "500",
                  }}
                >
                  {u.status}
                </td>

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
                  <Button onClick={() => toggleStatus(u)}>
                    {u.status === "ACTIVE" ? "Deactivate" : "Activate"}
                  </Button>
                </td>

                <td>
                  {showReset === u._id ? (
                    <>
                      <input
                        className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Temp Password"
                        value={tempPassword}
                        onChange={(e) =>
                          setTempPassword(e.target.value)
                        }
                      />

                      <div style={{ display: "flex", gap: "6px" }}>
                        <Button onClick={() => handleReset(u._id)}>
                          Save
                        </Button>

                        <Button onClick={() => setShowReset(null)}>
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Button onClick={() => setShowReset(u._id)}>
                      Reset
                    </Button>
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}