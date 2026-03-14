import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const UserContext = createContext({
    isAuthenticated: false,
    user: {
        _id: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
    },
    loginHandler() { },
    setUser() { },
});

export function UserProvider({ children }) {

    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const loginHandler = async (email, password) => {

        const credentials = { email, password };

        try {
            const response = await fetch('http://localhost:8086/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrors(errorData);
                return;
            }

            if (response.ok) {
                const data = await response.json();
                setUser({ ...data, plainPassword: password });

                navigate("/")
            }

        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }

    }

    // todo: add registerHandler
    // todo: add logoutHandler

    const contextValues = {
        isAuthenticated: !!user,
        user,
        loginHandler,
        setUser,
        errors,
        setErrors
    };

    return (
        <UserContext.Provider value={contextValues}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const contextData = useContext(UserContext);

    return contextData;
}

export default UserContext;
