import { createContext, useState, useContext, useEffect } from "react"

//Types
import type { ReactNode } from "react"
import type { User, LoginCredentials, AuthResponse, AuthContextType } from "../types/UserTypes"

//Context
const AuthContext = createContext<AuthContextType | null>(null);

//Provider interface
interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {

    const [ user, setUser ] = useState<User | null>(null);

    //Validating token
    useEffect(() => {
        validateToken();
    }, []);

    //Logging in user
    const login = async(credentials: LoginCredentials) => {
        try {
            const response = await fetch("https://dt210g-project-backend-hapi.onrender.com/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            if(!response.ok) {
                throw new Error("Inloggning misslyckades.");
            }

            const data = await response.json() as AuthResponse;
            const user: User = { _id: data.userId, username: data.username, displayName: data.displayName }

            localStorage.setItem("token", data.token);
            setUser(user);

        } catch(error) {
            throw error;
        }
    }

    //Logging out user
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    //Validating token
    const validateToken = async() => {
        const token = localStorage.getItem("token");

        if(!token) {
            return;
        }

        try {
            const result = await fetch("https://dt210g-project-backend-hapi.onrender.com/validate", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
            });

            if(!result.ok) {
                return logout();
            }

            const data = await result.json() as AuthResponse;
            const user: User = { _id: data.userId, username: data.username, displayName: data.displayName }

            setUser(user);

        } catch(error) {
            logout();
        }
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextType => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
}