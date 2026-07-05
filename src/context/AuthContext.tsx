import React, { useState, useContext, createContext } from "react";

type UserSession = {
    email: string;
};

type AuthContextType = {
    isAuthenticated: boolean;
    user: UserSession | null;
    login: (email: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserSession | null>(() => {
        const saved = localStorage.getItem("current_user");
        try {
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const login = (email: string) => {
        const session = { email };
        localStorage.setItem("current_user", JSON.stringify(session));
        setUser(session);
    };

    const logout = () => {
        localStorage.removeItem("current_user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}