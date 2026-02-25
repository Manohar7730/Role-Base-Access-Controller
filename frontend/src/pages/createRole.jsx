import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPermissions } from "../features/permissions/permissionsSlice";
import { createRoleThunk } from "../features/roles/rolesSlice";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { toast } from "react-toastify";

export default function CreateRole() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: permissions } = useSelector((s) => s.permissions);

  const [name, setName] = useState("");
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  const togglePermission = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Role name is required");
      return;
    }

    if (selected.length === 0) {
      toast.error("Select at least one permission");
      return;
    }

    dispatch(
      createRoleThunk({
        name,
        permissions: selected,
      })
    );

    navigate("/roles");
  };

  /* Internal CSS */
  const styles = {
    title: {
      fontSize: "22px",
      fontWeight: "600",
      marginBottom: "16px",
      color: "#111827",
    },
    card: {
      maxWidth: "500px",
      background: "#ffffff",
      padding: "24px",
      borderRadius: "8px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    },
    checkboxRow: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "8px",
    },
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Create Role</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Role name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <h4 style={{ marginBottom: "8px", fontWeight: "600" }}>
          Permissions
        </h4>

        {permissions.map((p) => (
          <div key={p._id} style={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={selected.includes(p._id)}
              onChange={() => togglePermission(p._id)}
            />
            <label>{p.key}</label>
          </div>
        ))}

        <div style={{ marginTop: "12px" }}>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
}