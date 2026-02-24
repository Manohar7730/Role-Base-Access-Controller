import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../features/roles/rolesSlice";
import { Link } from "react-router-dom";
import "../styles/table.css";

export default function Roles() {
  const dispatch = useDispatch();
  const { roleList, roleLoading } = useSelector((s) => s.roles);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  if (roleLoading) return <p>Loading...</p>;

  /* Internal CSS */
  const styles = {
    title: {
      fontSize: "22px",
      fontWeight: "600",
      marginBottom: "16px",
      color: "#111827",
    },
  };

  return (
    <div>

      {/* Page Title */}
      <h2 style={styles.title}>Roles</h2>

      {/* Add Role Link */}
      <Link className="link-btn mb-3 inline-block" to="/roles/create">
        + Add Role
      </Link>

      <div className="table-container">
        <table>

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
                  <ul style={{ paddingLeft: "16px" }}>
                    {r.permissions.map((p) => (
                      <li key={p._id}>{p.description}</li>
                    ))}
                  </ul>
                </td>

                <td>
                  <Link
                    className="link-btn"
                    to={`/roles/${r._id}`}
                  >
                    Edit
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}