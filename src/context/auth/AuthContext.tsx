import { createContext } from 'react';
import { User } from '../../types/User';
import { Job, WorkStyle, EmploymentType } from '../../types/Job';
import { State } from '../../types/State';

export type AuthContextType = {
    user: User | null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
    register: (name: string, email: string, password: string, phone: string, address: string, city: string, state: number) => Promise<boolean>;
    jobs: Job[] | null;
    getJobsList: () => Promise<Job[] | null>;
    addJob: (title: string, text: string, workStyle: WorkStyle, employmentType: EmploymentType, description: string, promoter: string, salary: number, city: string, state: number | null) => Promise<boolean>;
    removeJob: (id: number) => Promise<boolean>;
    //apiStates
    state: State[] | null;
    getStates: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>(null!);//so preenche contexto com informações no provider