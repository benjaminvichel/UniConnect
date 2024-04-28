//aqui eu uso as informacoes do useApi
import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [user, setUser] = useState<User | null>(null);
    const api = useApi();

    //validar token
    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem('authToken');
            if (storageData) {
                console.log(storageData);
                const data = await api.validateToken(storageData);
                if (data.user) {
                    setUser(data.user);
                }
            }
        }
        validateToken();
    }, [])

    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);
        if (data.user && data.token) {
            setUser(data.user);
            setToken(data.token);
            return true;
        }
        return false;
    }

    const signout = async () => {
        setUser(null);
        setToken('');
        // await api.logout();
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
}


