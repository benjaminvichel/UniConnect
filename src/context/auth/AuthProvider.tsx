//aqui eu uso as informacoes do useApi
import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";
import { Job } from "../../types/Jobs";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [user, setUser] = useState<User | null>(null);
    const [jobs, setJobs] = useState<Job[] | null>([]);
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

    const register = async (name: string, email: string, password: string) => {
        const data = await api.register(name, email, password);
        if (data.user && data.token) {
            setUser(data.user);
            setToken(data.token);
            return true;
        }
        return false;
    };

    const getJobsList = async () => {
        const data = await api.getJobsList();
        if (data.jobs) {
            setJobs(data.jobs);
            return true;
        }
        return false;
    }

    const signout = async () => {
        setUser(null);
        setToken('');
        setJobs([]);
        // await api.logout();
    }



    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout, register, jobs, getJobsList }}>
            {children}
        </AuthContext.Provider>
    )
}


