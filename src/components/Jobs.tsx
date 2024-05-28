import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import './Jobs.css';
import { Link } from "react-router-dom";

export const Jobs = ({ searchFilter, stateSelected }: { searchFilter: string, stateSelected: { id: number | null, name: string | null } }) => {
    const auth = useContext(AuthContext);
    const filteredJobs = (auth.jobs ?? [])
        .filter(job => job.title.toLowerCase().includes(searchFilter.toLowerCase()))
        .filter(job => stateSelected.id === null || stateSelected.id === 0 || (job.state && job.state.id === stateSelected.id));

    return (
        <div>
            <h2 id="listajobs">Lista Jobs</h2>
            <div className='jobs-list'>
                {auth.jobs && filteredJobs.map(job => (
                    <div key={job.id} className='job' >
                        <Link key={job.id} to={`/UniConnect/JobDetails/${job.id}`} className='jobLink'>
                            <div className="job_title"><h3>{job.title}</h3></div>
                            <div className="job_promoter"><p>Empresa: {job.promoter}</p></div>
                            <div className="job_salary"><p>Salário: {job.salary}</p></div>
                            <div className="job_state"><p>Estado: {job.state.nome}</p></div>
                        </Link>
                    </div>

                ))}
            </div>
        </div >
    )
}