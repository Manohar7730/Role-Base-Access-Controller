import { Link, useNavigate } from "react-router-dom";
import PermissionGuard from "./PermissionGuard";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const isSuperAdmin = user?.role?.name === "SUPER_ADMIN";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <Link to="/dashboard">Dashboard</Link>

      {isSuperAdmin ? (
        <Link to="/users">Users</Link>
      ) : (
        <PermissionGuard permission="user.read">
          <Link to="/users">Users</Link>
        </PermissionGuard>
      )}

      {isSuperAdmin ? (
        <Link to="/roles">Roles</Link>
      ) : (
        <PermissionGuard permission="role.read">
          <Link to="/roles">Roles</Link>
        </PermissionGuard>
      )}

      {isSuperAdmin ? (
        <Link to="/permissions">Permissions</Link>
      ) : (
        <PermissionGuard permission="permission.read">
          <Link to="/permissions">Permissions</Link>
        </PermissionGuard>
      )}

      <Link to="/change-password">Change Password</Link>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
