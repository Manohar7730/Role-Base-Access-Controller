import { useState } from "react";
import { createPermission } from "../services/permissionService";
import { useNavigate } from "react-router-dom";

export default function CreatePermission() {
  const [key, setKey] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createPermission({ key, description });
      setMsg(res.message);
      setKey("");
      setDescription("");

      setTimeout(() => navigate("/permissions"), 800);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div>
      <h2>Create Permission</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="permission.key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}