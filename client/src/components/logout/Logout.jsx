import { useNavigate } from "react-router";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect } from "react";

export default function Logout() {
    const navigate = useNavigate();
    const { setUser } = useUserContext();

    useEffect(() => {
        localStorage.removeItem('token');

        setUser(null);

        navigate('/');
    }, [navigate, setUser]);

    return null;
}