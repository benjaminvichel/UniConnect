import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/auth/AuthContext"
import { Link } from "react-router-dom";


export const Applications = () => {
  const auth = useContext(AuthContext)

  useEffect(() => {
    auth.getUserJobsList();
  }, [])



  return (
    <div>
      {auth.userJobs && auth.userJobs.map(job => (
        <div key={job.id} className='job' >
          <Link key={job.id} to={`/UniConnect/JobDetails/${job.id}`} className=''>
            <div className=""><h3>{job.title}</h3></div>
          </Link>
        </div>

      ))}
    </div>
  )
}
