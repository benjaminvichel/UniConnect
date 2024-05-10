import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import { JobsRemove } from "./JobsRemove";
import './Jobs.css';

export const Jobs = ({ searchFilter, stateSelected }: { searchFilter: string, stateSelected: number | null }) => {
    const auth = useContext(AuthContext);

    const filteredJobs = (auth.jobs ?? [])
        .filter(job => job.text.toLowerCase().includes(searchFilter.toLowerCase()))
        .filter(job => stateSelected === null || stateSelected === 0 || (job.state && job.state.id === stateSelected));

    return (


        <div>
            <h2>Lista Jobs</h2>
            <div className='jobs-list'>
                {auth.jobs && filteredJobs.map(job => (
                    <div key={job.id} className='job'>
                        <h3>{job.title}</h3>
                        <p>descrição: {job.text}</p>
                        <p>Modalidade do trabalho: {job.workStyle}</p>
                        <p>promoter: {job.promoter}</p>
                        <p>salario:{job.salary}</p>
                        <p>cidade: {job.city}</p>
                        <p>estado: {job.state.id}</p>
                        <p>{job.state.nome}</p>
                        <JobsRemove jobId={job.id} />
                    </div>
                ))}
            </div>
        </div>
    )
}