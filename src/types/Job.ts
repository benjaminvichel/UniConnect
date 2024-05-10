import { State } from "./State";

export enum WorkStyle {
    HIBRIDO = "HIBRIDO",
    PRESENCIAL = "PRESENCIAL",
    REMOTO = "REMOTO"
}

export enum EmploymentType {
    TRABALHO = "TRABALHO",
    ESTAGIO = "ESTAGIO"
}

export type Job = {
    id: number;
    title: string;
    text: string;
    workStyle: WorkStyle;
    employmentType: EmploymentType;
    description: string;
    promoter: string;
    salary: string;
    city: string;
    state: State;
    date: Date;
}
