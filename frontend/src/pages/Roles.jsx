import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../features/roles/rolesSlice";
import { Link } from "react-router-dom";

export default function Roles() {
  const dispatch = useDispatch();
  const { roleList, roleLoading } = useSelector((s) => s.roles);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  if (roleLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Roles</h2>
      <Link to="/roles/create">+ Add Role</Link>{" "}
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Permissions Count</th>
            <th>Permissions</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {roleList.map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.permissions.length}</td>
              <td>
                <ul style={{ listStyleType: "none" }}>
                  {r.permissions.map((p) => (
                    <li key={p._id}>{p.description}</li>
                  ))}
                </ul>
              </td>
              <td>
                <Link to={`/roles/${r._id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
