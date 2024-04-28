//Aqui chamo os dados do backEnd
import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API
});

export const useApi = () => ({

    validateToken: async (token: string) => {
        return {
            user: { id: 3, name: 'José', email: 'jose@gmail.com' }
        }
        const response = await api.post('/validate', { token });
        return response.data;
    },
    signin: async (email: string, password: string) => {
        return {
            user: { id: 3, name: 'José', email: 'jose@gmail.com' },
            token: '123456'
        }
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    register: async (name: string, email: string, password: string) => {
        return {
            user: { id: 3, name: 'José', email: 'jose@gmail.com' },
            token: '123456'
        }
        const response = await api.post('/register', { name, email, password });
        return response.data;
    },

    logout: async () => {
        // return {
        //     user: { id: null, name: null, email: null },
        //     token: ''
        // }

        const response = await api.post('/logout');
        return response.data;
    }
})      //funcao para retornar objeto com funcoes para utilizar.


