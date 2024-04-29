import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/auth/AuthContext';

export const Private = () => {
    const auth = useContext(AuthContext);



    useEffect(() => {
        auth.getJobsList();
    }, [])

    return (
        <div>
            <h2>Lista Jobs</h2>
            <div className='jobs-list'>
                {auth.jobs && auth.jobs.map(job => (
                    <div key={job.id} className='job'>
                        <h3>{job.text}</h3>
                        <p>Modalidade do trabalho: {job.workStyle}</p>
                    </div>
                ))}
            </div>



            {/* <h2>Lista Jobs</h2>
            <div className="jobs-list">

                {jobs.map((jobs) => (<div className="jobs">
                    <div className="content">
                        <p>{jobs.text}</p>
                    </div>
                </div>))}
            </div> */}
        </div>
    )
}
