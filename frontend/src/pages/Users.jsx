import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/users/usersSlice";
import { makeUpdateUserStatus } from "../features/users/usersSlice";

export default function Users() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.users);
  const toggleStatus = (user) => {
    const newStatus = user.status === "ACTIVE" ? "PENDING" : "ACTIVE";

    dispatch(
      makeUpdateUserStatus({
        id: user._id,
        status: newStatus,
      }),
    );
  };
  useEffect(() => {
    dispatch(fetchUsers());
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
            <th>Actions</th>
            <th>Activate/Deactivate</th>
          </tr>
        </thead>
        <tbody>
          {list.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.status}</td>
              <td>{u.role?.name || "N/A"}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
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
