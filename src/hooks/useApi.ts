//Aqui chamo os dados do backEnd
import axios from "axios";
import { EmploymentType, WorkStyle } from "../types/Job";


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
        //     user: { id: 3, name: 'José', email: 'jose@gmail.com' }
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
        //             id: 3, title: 'trbvalho de pedreiro', text: 'venha se especializar como pedreiro',
        //             employmentType: 'PRESENCIAL', description: 'como pedreiro voce...',
        //             promoter: 'construtora pedreira',
        //             salary: 2000,
        //             city: 'gramado',
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
        console.log(response.data);
        return { jobs: response.data };
    },
    //working
    addJob: async (title: string, text: string, workStyle: WorkStyle, employmentType: EmploymentType, description: string, promoter: string, salary: number, city: string, state: number | null, token: string) => {
        // return true;

        const headers = {
            Authorization: `${token}`,
            'Content-Type': 'application/json', // Especificando o tipo de conteúdo como JSON
        };

        const response = await api.post('/job', { title, text, workStyle, employmentType, description, promoter, salary, city, state }, { headers })
        console.log('Request payload:', { title, text, workStyle, employmentType, description, promoter, salary, city, state });
        console.log(response.data);
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
    logout: async () => {
        // return {
        //     user: { id: null, name: null, email: null },
        //     token: ''
        // }

        const response = await api.post('/logout');
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
        // console.log(response.data);
        return response.data;
    }


})      //funcao para retornar objeto com funcoes para utilizar.


