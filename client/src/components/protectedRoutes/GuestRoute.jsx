import { Navigate, Outlet } from "react-router";
import { useUserContext } from "../../contexts/UserContext";

export default function GuestRoute() {
    const { isAuthenticated } = useUserContext();

    return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}