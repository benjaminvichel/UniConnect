//aqui eu uso as informacoes do useApi
import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { useApi } from "../../hooks/useApi";
import { User, role } from "../../types/User";
import { EmploymentType, Job, WorkStyle } from "../../types/Job";
import { State } from "../../types/State";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [user, setUser] = useState<User | null>(null);
    const [pendingUsers, setPendingUsers] = useState<User[] | null>(null);
    const [jobs, setJobs] = useState<Job[] | null>([]);
    const [userJobs, setUserJobs] = useState<Job[] | null>([]);
    const [state, setState] = useState<State[] | null>([]);
    const [token, setToken] = useState<string>('');
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
                    setTokenInBrowser(storageData);
                }
            }
        }
        validateToken();
        getStates();
    }, [])

    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);

        if (data.user && data.token) {
            setUser(data.user);
            setTokenInBrowser(data.token);
            console.log(data.user);
            console.log(data.token);
            return true;
        }
        return false;
    }

    const register = async (name: string, email: string, password: string, phone: string, address: string, city: string, state: number) => {
        const data = await api.register(name, email, password, phone, address, city, state);
        if (data.user && data.token) {
            setUser(data.user);
            setTokenInBrowser(data.token);
            return true;
        }
        return false;
    };

    const pendingUser = async (): Promise<User[] | null> => {
        try {
            const data = await api.pendingUser(token);
            if (data && data.user) {
                setPendingUsers(data.user); // Definir a lista de usuários no estado
                return data.user; // Retornar a lista de usuários
            }
            return null;
        } catch (error) {
            console.error('Erro ao recuperar usuários pendentes:', error);
            return null;
        }
    }
    const ApprovedOrDeniedUsers = async (id: number, role: role, approvalStatus: string): Promise<boolean> => {
        try {
            const data = await api.ApprovedOrDeniedUsers(id, role, approvalStatus, token);
            if (data) {
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erro ao recuperar usuários pendentes:', error);
            return false;
        }
    }
    const uploadPDF = async (PDF: File): Promise<boolean> => {
        try {
            // Chamar a função da API para fazer o upload da imagem
            await api.uploadPDF(PDF, token);
            // Se o upload for bem-sucedido, retornar true
            return true;
        } catch (error) {
            // Se houver algum erro durante o upload, retornar false
            console.error('Erro AuthProvider:', error);
            return false;
        }

    }
    const getPDF = async (): Promise<Blob | null> => {
        try {
            const pdfBlob = await api.getPDF(token);

            // Verifica se os dados do Blob estão corretos
            console.log('Blob recebido:', pdfBlob);

            if (pdfBlob) {
                return pdfBlob;
            }
            return null;
        } catch (error) {
            // Em caso de erro, registra no console
            console.error('Erro ao obter PDF authProvider:', error);
            return null;
        }
    };
    const getJobsList = async (): Promise<Job[] | null> => {
        try {
            const data = await api.getJobsList(token);
            if (data.jobs) {
                setJobs(data.jobs);
                return data.jobs;
            }
            return null;
        } catch (error) {
            console.error("Erro ao obter a lista de trabalhos:", error);
            return null;
        }

    }

    const getUserJobsList = async (): Promise<Job[] | null> => {
        try {
            const data = await api.getUserJobsList(token);
            if (data.jobs) {
                console.log(data.jobs);
                setUserJobs(data.jobs);
                return data.jobs;
            }
            return null;
        } catch (error) {
            console.error("Erro ao obter a lista de trabalhos do usuário:", error);
            return null;
        }
    }

    const addJob = async (title: string, workStyle: WorkStyle, employmentType: EmploymentType, description: string, promoter: string, salary: number, city: string, stateId: number | null, stateName: string | null) => {
        const data = await api.addJob(title, workStyle, employmentType, description, promoter, salary, city, stateId, stateName, token);
        if (data) {
            console.log(data);
            return true;
        }
        return false;
    }
    const subscribeToJob = async (id: number) => {
        const data = await api.subscribeToJob(id, token);
        return data;
    }

    const removeJob = async (id: number) => {
        const data = await api.removeJob(id, token);
        if (data) {
            return true;
        }
        return false;
    }


    const setTokenInBrowser = (token: string) => {
        localStorage.setItem('authToken', token);
        setToken(token);
    }

    //States methods
    const getStates = async () => {
        const data = await api.getStates();
        if (data) {
            setState(data);
            return true;

        }
        return false;
    }
    const signout = async () => {

        await api.logout(token);
        setUser(null);
        //setTokenInBrowser('');
        setJobs([]);
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout, register, pendingUser, pendingUsers, ApprovedOrDeniedUsers, uploadPDF, getPDF, jobs, getJobsList, userJobs, getUserJobsList, addJob, subscribeToJob, removeJob, state, getStates }}>
            {children}
        </AuthContext.Provider>
    )
}


