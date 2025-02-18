import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const storedUserInfo = localStorage.getItem('adminInfo');
    const [user, setUser] = useState(storedUserInfo ? JSON.parse(storedUserInfo) : null);

    const login = (adminInfo) => {
        setUser(adminInfo);
    };

    const logout = () => {
        localStorage.removeItem('adminInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
             user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

