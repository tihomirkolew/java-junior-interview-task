import { Navigate, Outlet } from "react-router";
import { useUserContext } from "../../contexts/UserContext";

export default function ProtectedRoute() {
  const { isAuthenticated } = useUserContext();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;

}