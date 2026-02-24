import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPermissions } from "../features/permissions/permissionsSlice";
import { createRoleThunk } from "../features/roles/rolesSlice";
import { useNavigate } from "react-router-dom";

export default function CreateRole() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: permissions } = useSelector(
    (s) => s.permissions
  );

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      createRoleThunk({
        name,
        permissions: selected,
      })
    );

    if (createRoleThunk.fulfilled.match(result)) {
      navigate("/roles");
    }
  };

  return (
    <div>
      <h2>Create Role</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Role name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <h4>Permissions</h4>

        {permissions.map((p) => (
          <label key={p._id} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={selected.includes(p._id)}
              onChange={() => togglePermission(p._id)}
            />
            {p.key}
          </label>
        ))}

        <button type="submit">Create</button>
      </form>
    </div>
  );
}