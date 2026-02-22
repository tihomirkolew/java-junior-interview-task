import { createContext, useContext, useState } from "react";

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

            let error;
            if (response.ok) {

                const contentType = response.headers.get('content-type');

                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    setUser({ ...data, plainPassword: password });
                } else {
                    error = await response.text();
                    setUser({ email, plainPassword: password });
                }
            } else {
                error = await response.text();
                throw new Error(error);
            }

        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }

    }

    const contextValues = {
        isAuthenticated: !!user,
        user,
        loginHandler,
        setUser
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