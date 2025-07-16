// In frontend/src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({ isAuthenticated: false });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if a token exists in local storage to keep the user logged in
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const value = { isAuthenticated };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};