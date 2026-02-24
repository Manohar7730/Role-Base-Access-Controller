import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPermissions } from "../features/permissions/permissionsSlice";
import { updateRolePermissions } from "../features/roles/rolesSlice";

export default function EditRole() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { roleList } = useSelector((s) => s.roles);
  const { list: permissions } = useSelector((s) => s.permissions);

  const role = roleList.find((r) => r._id === id);

  const [selected, setSelected] = useState(() =>
    role ? role.permissions.map((p) => p._id) : [],
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
        : [...prev, permId],
    );
  };

  const handleSave = async () => {
    await dispatch(
      updateRolePermissions({
        id,
        permissions: selected,
      }),
    );

    navigate("/roles");
  };

  if (!role) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Role: {role.name}</h2>

      {permissions.map((p) => (
        <div key={p._id}>
          <label>
            <input
              type="checkbox"
              checked={selected.includes(p._id)}
              onChange={() => handleToggle(p._id)}
            />
            {p.key}
          </label>
        </div>
      ))}

      <button onClick={handleSave}>Save</button>
    </div>
  );
}
