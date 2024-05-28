import { useContext, useState } from "react"
import { AuthContext } from "../context/auth/AuthContext"

export const JobsRemove = ({ jobId }: { jobId: number }) => {
    const auth = useContext(AuthContext);
    const [attComponent, setAttComponent] = useState('');

    const removeJob = () => {
        auth.removeJob(jobId);
        setAttComponent(attComponent);
    }

    return (
        <div>
            <button onClick={removeJob}>Deletar Job</button>
        </div>
    )
}
