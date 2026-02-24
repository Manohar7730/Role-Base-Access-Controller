import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPermissions } from "../features/permissions/permissionsSlice";
import { Link } from "react-router-dom";
import "../styles/table.css";

export default function Permissions() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.permissions);

  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

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
      <h2 style={styles.title}>Permissions</h2>

      {/* Add Permission */}
      <Link
        className="link-btn mb-3 inline-block"
        to="/permissions/create"
      >
        + Add Permission
      </Link>

      <div className="table-container">
        <table>

          <thead>
            <tr>
              <th>Key</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {list.map((p) => (
              <tr key={p._id}>
                <td>{p.key}</td>
                <td>{p.description}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}