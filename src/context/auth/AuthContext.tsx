import { createContext } from 'react';
import { User, role } from '../../types/User';
import { Job, WorkStyle, EmploymentType } from '../../types/Job';
import { State } from '../../types/State';

export type AuthContextType = {
    user: User | null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
    register: (name: string, email: string, password: string, phone: string, address: string, city: string, state: number) => Promise<boolean>;
    pendingUser: () => Promise<User[] | null>;
    pendingUsers: User[] | null;
    ApprovedOrDeniedUsers: (id: number, role: role, approvalStatus: string) => Promise<boolean>;
    uploadPDF: (PDF: File) => Promise<boolean>;
    getPDF: () => Promise<Blob | null>;
    jobs: Job[] | null;
    getJobsList: () => Promise<Job[] | null>;
    userJobs: Job[] | null;
    getUserJobsList: () => Promise<Job[] | null>;
    addJob: (title: string, workStyle: WorkStyle, employmentType: EmploymentType, description: string, promoter: string, salary: number, city: string, stateId: number | null, stateName: string | null) => Promise<boolean>;
    subscribeToJob: (id: number) => void;
    removeJob: (id: number) => Promise<boolean>;
    //apiStates
    state: State[] | null;
    getStates: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>(null!);//so preenche contexto com informações no provider