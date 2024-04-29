import { createContext } from 'react';
import { User } from '../../types/User';
import { Job } from '../../types/Jobs';

export type AuthContextType = {
    user: User | null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    jobs: Job[] | null;
    getJobsList: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>(null!);//so preenche contexto com informações no provider