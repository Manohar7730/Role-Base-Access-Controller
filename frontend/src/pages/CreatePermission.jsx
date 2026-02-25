import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPermissionThunk } from "../features/permissions/permissionsSlice";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { toast } from "react-toastify";

export default function CreatePermission() {
  const [key, setKey] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!key.trim()) {
      toast.error("Permission key is required");
      return;
    }

    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }

    dispatch(
      createPermissionThunk({
        key,
        description,
      })
    );

    setKey("");
    setDescription("");

    navigate("/permissions");
  };

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
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Create Permission</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="permission.key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />

        <input
          className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}