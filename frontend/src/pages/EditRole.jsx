import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPermissions } from "../features/permissions/permissionsSlice";
import { updateRolePermissions } from "../features/roles/rolesSlice";
import Button from "../components/ui/Button";

export default function EditRole() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { roleList } = useSelector((s) => s.roles);
  const { list: permissions } = useSelector((s) => s.permissions);

  const role = roleList.find((r) => r._id === id);

  const [selected, setSelected] = useState(() =>
    role ? role.permissions.map((p) => p._id) : []
  );

  if (role && selected.length === 0) {
    setSelected(role.permissions.map((p) => p._id));
  }
  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  const handleToggle = (permId) => {
    setSelected((prev) =>
      prev.includes(permId)
        ? prev.filter((id) => id !== permId)
        : [...prev, permId]
    );
  };

  const handleSave = async () => {
    await dispatch(
      updateRolePermissions({
        id,
        permissions: selected,
      })
    );

    navigate("/roles");
  };

  if (!role) return <p>Loading...</p>;

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

      <h2 style={styles.title}>Edit Role: {role.name}</h2>

      {permissions.map((p) => (
        <div key={p._id} style={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={selected.includes(p._id)}
            onChange={() => handleToggle(p._id)}
          />
          <label>{p.key}</label>
        </div>
      ))}

      <div style={{ marginTop: "12px" }}>
        <Button onClick={handleSave}>Save</Button>
      </div>

    </div>
  );
}