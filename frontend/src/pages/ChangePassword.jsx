import { useState } from "react";
import { changePassword } from "../services/userService";

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

  return (
    <div>
      <h2>Change Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm New Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {" "}
          {showPassword ? "🙈" : "👁️"}
        </button>
        <button type="submit">Change</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}
