import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPermissions } from "../features/permissions/permissionsSlice";

export default function Permissions() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.permissions);

  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Permissions</h2>

      <ul>
        {list.map((p) => (
          <li key={p._id}>{p.key}</li>
        ))}
      </ul>
    </div>
  );
}