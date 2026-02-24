import { Link, useNavigate } from "react-router-dom";
import PermissionGuard from "./PermissionGuard";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <Link to="/dashboard">Dashboard</Link>
      <PermissionGuard permission="user.read">
        <Link to="/users">Users</Link>
      </PermissionGuard>
      <PermissionGuard permission="role.read">
        <Link to="/roles">Roles</Link>
      </PermissionGuard>
      <PermissionGuard permission="permission.read">
        <Link to="/permissions">Permissions</Link>
      </PermissionGuard>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
