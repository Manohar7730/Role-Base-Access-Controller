import { useState } from "react";
import { changePassword } from "../services/userService";
import Button from "../components/ui/Button";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirm) {
      return setMsg("Passwords do not match");
    }

    try {
      const res = await changePassword({
        currentPassword,
        newPassword,
      });

      setShowPassword(false);
      setMsg(res.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
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
      maxWidth: "450px",
      background: "#ffffff",
      padding: "24px",
      borderRadius: "8px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    },
    label: {
      display: "block",
      marginBottom: "4px",
      fontWeight: "500",
    },
  };

  return (
    <div style={styles.card}>

      <h2 style={styles.title}>Change Password</h2>

      <form onSubmit={handleSubmit}>

        <label style={styles.label}>Current Password</label>
        <input
          className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type={showPassword ? "text" : "password"}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <label style={styles.label}>New Password</label>
        <input
          className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <label style={styles.label}>Confirm New Password</label>
        <input
          className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type={showPassword ? "text" : "password"}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <Button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </Button>

        <div style={{ marginTop: "12px" }}>
          <Button type="submit">Change</Button>
        </div>

      </form>

      {msg && (
        <p
          style={{
            marginTop: "12px",
            fontWeight: "500",
            color: msg.toLowerCase().includes("error")
              ? "#dc2626"
              : "#16a34a",
          }}
        >
          {msg}
        </p>
      )}

    </div>
  );
}