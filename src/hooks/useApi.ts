//Aqui chamo os dados do backEnd
import axios from "axios";
import { EmploymentType, WorkStyle } from "../types/Job";
import { role } from "../types/User";


const api = axios.create({
    baseURL: import.meta.env.VITE_API
});

const apiStates = axios.create({
    baseURL: import.meta.env.VITE_APISTATE,
});


export const useApi = () => ({
    // Métodos para a back-end API
    validateToken: async (token: string) => {//working
        // return {
        //     user: { id: 3, name: 'José', email: 'jose@gmail.com', role: 'ADMIN' }
        // }
        const headers = {
            Authorization: `${token}`,
            'Content-Type': 'application/json', // Especificando o tipo de conteúdo como JSON
        };
        const response = await api.get('/auth/userdata', { headers });
        return response.data;
    },
    signin: async (email: string, password: string) => {//working

        // return {
        //     user: { name: 'José', id: 3, email: 'jose@gmail.com' },
        //     token: '123456sadwd'
        // }
        // return {
        //     user: {   token: '123456',id: 3, name: 'José', email: 'jose@gmail.com' },

        // }
        const response = await api.post('/auth/login', { email, password });
        console.log(response.data);
        return response.data;
    },
    //working
    register: async (name: string, email: string, password: string, phone: string, address: string, city: string, stateId: number) => {
        // return {
        //     user: { id: 3, name: 'José', email: 'jose@gmail.com' },
        //     token: '123456'
        // }
        const response = await api.post('/auth/signup', { name, email, password, phone, address, city, stateId });
        return response.data;
    },
    pendingUser: async (token: string) => {
        const headers = {
            Authorization: `${token}`,
            'Content-Type': 'application/json', // Especificando o tipo de conteúdo como JSON
        };
        const response = await api.get('/auth/pendinguser', { headers });
        return { user: response.data };
    },
    ApprovedOrDeniedUsers: async (id: number, role: role, approvalStatus: string, token: string) => {
        const headers = {
            Authorization: `${token}`,
            'Content-Type': 'application/json', // Especificando o tipo de conteúdo como JSON
        };
        const response = await api.post('/auth/pendinguser', { id, role, approvalStatus, token }, { headers });
        return response.data;
    },
    uploadPDF: async (PDF: File, token: string) => {
        const headers = {
            Authorization: `${token}`,
            'Content-Type': 'multipart/form-data', // Especificando o tipo de conteúdo como JSON
        };
        const response = await api.post('/auth/cv', { PDF }, { headers });
        return response.data;
    },

    getPDF: async (token: string) => {
        const headers = {
            Authorization: `${token}`,
        };
        const response = await api.get('/auth/cv', { headers, responseType: 'arraybuffer' });
        return new Blob([response.data]);
    },

    //working
    getJobsList: async (token: string) => {
        // return {
        //     jobs: [
        //         {
        //             id: 1, title: 'trabalho de cozinheira', text: 'venha se especializar na cozinha da sua Maria',
        //             employmentType: 'PRESENCIAL', description: 'aqui na casa da maria vo...',
        //             promoter: 'casa da maria empresas',
        //             salary: 1500,
        //             city: 'gramado',
        //             state: { id: 11, sigla: 'RJ', nome: 'rio de janeiro' }
        //         },
        //         {
        //             id: 2, title: 'trbvalho de pedreiro', text: 'venha se especializar como pedreiro',
        //             employmentType: 'PRESENCIAL', description: 'como pedreiro voce...',
        //             promoter: 'construtora pedreira',
        //             salary: 2000,
        //             city: 'gramado',
        //             state: { id: 11, sigla: 'PR', nome: 'Parana' }
        //         },
        //         {
        //             id: 3, title: 'Loja de sapatos', text: 'venha se especializar vendedor',
        //             employmentType: 'REMOTO', description: 'como vendedor voce...',
        //             promoter: 'Loja de sapatos',
        //             salary: 3000,
        //             city: 'Canela',
        //             state: { id: 11, sigla: 'RS', nome: 'Rio grande do Sul' }
        //         },

        //         {
        //             id: 4, title: 'trbvalho de pedreiro', text: 'venha se especializar como pedreiro',
        //             employmentType: 'PRESENCIAL', description: 'como pedreiro voce...',
        //             promoter: 'construtora pedreira',
        //             salary: 2000,
        //             city: 'gramado',
        //             state: { id: 11, sigla: 'RS', nome: 'Rio grande do Sul' }
        //         },

        //         {
        //             id: 5, title: 'trbvalho de pedreiro', text: 'venha se especializar como pedreiro',
        //             employmentType: 'PRESENCIAL', description: 'como pedreiro voce...',
        //             promoter: 'construtora pedreira',
        //             salary: 2000,
        //             city: 'gramado',
        //             state: { id: 11, sigla: 'RS', nome: 'Rio grande do Sul' }
        //         },


        //     ]
        // };
        const headers = {
            Authorization: `${token}`,
            'Content-Type': 'application/json', // Especificando o tipo de conteúdo como JSON
        };
        const response = await api.get('/job/list', { headers });
        return { jobs: response.data };
    },

    getUserJobsList: async (token: string) => {
        const headers = {
            Authorization: `${token}`,
            'Content-Type': 'application/json', // Especificando o tipo de conteúdo como JSON
        };
        const response = await api.get('/enrollment/list', { headers });
        return { jobs: response.data };
    },
    //working
    addJob: async (title: string, workStyle: WorkStyle, employmentType: EmploymentType, description: string, promoter: string, salary: number, city: string, stateId: number | null, stateName: string | null, token: string) => {
        // return true;
        const headers = {
            Authorization: `${token}`,
            'Content-Type': 'application/json', // Especificando o tipo de conteúdo como JSON
        };
        const response = await api.post('/job/new', { title, workStyle, employmentType, description, promoter, salary, city, stateId, stateName }, { headers })
        return response.data;
    },

    subscribeToJob: async (id: number, token: string) => {
        const headers = {
            Authorization: `${token}`,
            'Content-Type': 'application/json', // Especificando o tipo de conteúdo como JSON
        };
        const response = await api.post('/enrollment', { id }, { headers })
        return response.data;
    },
    //working, bit with post
    removeJob: async (id: number, token: string) => {
        // return true;
        const headers = {
            Authorization: `${token}`,
            'Content-Type': 'application/json', // Especificando o tipo de conteúdo como JSON
        };
        const response = await api.post('/job/delete', { id }, { headers })
        return response.data;
    },
    //need implementation
    logout: async (token: string) => {
        // return {
        //     user: { id: null, name: null, email: null },
        //     token: ''
        // }
        const headers = {
            Authorization: `${token}`,
            'Content-Type': 'application/json', // Especificando o tipo de conteúdo como JSON
        };
        const response = await api.post('/auth/logout', {}, { headers });
        return response.data;
    },
    //working
    // Métodos para a STATES API
    getStates: async () => {
        // return {
        //     state: [{ id: 1, singla: 'RO', nome: 'rondônia', regiao: { id: 1, nome: 'Norte', sigla: 'N' } },
        //     { id: 2, singla: 'RJ', nome: 'rio de janeiro', regiao: { id: 2, nome: 'centro', sigla: 'RJ' } }]
        // };

        const response = await apiStates.get('/estados');
        console.log(response.data);
        return response.data;
    }


})      //funcao para retornar objeto com funcoes para utilizar.


