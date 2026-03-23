import { useNavigate } from "react-router";
import { useUserContext } from "../../contexts/UserContext";

export default function Logout() {
    const navigate = useNavigate();
    const { setUser, setErrors } = useUserContext();

    localStorage.removeItem('token');
    setUser(null);
    setErrors({});
    navigate('/');

    return null;
}