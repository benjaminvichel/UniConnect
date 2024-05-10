import { State } from "./State";
export type User = {
    id: number;
    name: string;
    email: string;
    password?: string;
    phone: string;
    address: string;
    city: string;
    state: State;
}