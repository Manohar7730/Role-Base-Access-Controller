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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Permissions</h2>

      <Link className="link-btn mb-2 inline-block" to="/permissions/create">
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
