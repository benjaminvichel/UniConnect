import { State } from "./State";

export enum role {
    ADMIN = "ADMIN",
    USER = "USER"
}

export type User = {
    id: number;
    name: string;
    email: string;
    password?: string;
    phone: string;
    address: string;
    city: string;
    state: State;
    profilePicture: Uint8Array | null;
    role: role;
}