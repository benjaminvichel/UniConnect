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
                    <div key={job.id} className='job' >
                        <div className="job_title"><h3>{job.title}</h3></div>
                        <div className="job_promoter"><p>Empresa: {job.promoter}</p></div>
                        <div className="job_salary"><p>Salário: {job.salary}</p></div>
                        <div className="job_state"><p>Estado: {job.state.nome}</p></div>
                        <div className="job_jobRemove"><JobsRemove jobId={job.id} /></div>
                    </div>
                ))}
            </div>
        </div>
    )
}