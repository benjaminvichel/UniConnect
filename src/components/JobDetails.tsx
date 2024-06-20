import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import { useParams } from "react-router-dom";
import { JobsRemove } from "./JobsRemove";
import './JobDetails.css'

export const JobDetails = () => {
    const [isTextExpanded, setIsTextExpanded] = useState(true); // Inicializado como true para estar expandido ao entrar na página
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // Inicializado como false para estar recolhido ao entrar na página

    const { jobId } = useParams<{ jobId: string }>();
    const auth = useContext(AuthContext);
    const jobIdString = jobId ?? "";

    const job = auth.jobs?.find(job => job.id === parseInt(jobIdString));

    useEffect(() => {
        // Ao montar o componente, garantir que apenas o "Resumo da Vaga" esteja expandido e o "Descrição da Vaga" recolhido
        setIsTextExpanded(false);
        setIsDescriptionExpanded(true);
    }, []);

    const handleSubscribe = () => {
        if (job) {
            auth.subscribeToJob(job?.id);
        }
    }

    // const handleTextClick = () => {
    //     setIsTextExpanded(true);
    //     setIsDescriptionExpanded(false);

    //     const textElement = document.querySelector('.jobDetailsText');
    //     const descriptionElement = document.querySelector('.jobDetailsDescription');
    //     textElement?.classList.add('clicked');
    //     descriptionElement?.classList.remove('clicked');
    // }

    const handleDescriptionClick = () => {
        setIsDescriptionExpanded(true);
        setIsTextExpanded(false);

        const textElement = document.querySelector('.jobDetailsText');
        const descriptionElement = document.querySelector('.jobDetailsDescription');
        descriptionElement?.classList.add('clicked');
        textElement?.classList.remove('clicked');

    }
    return (
        <div className="jobDetailsContainer">
            {job && (
                <div className="jobApp">
                    <div className="job_jobRemove"><JobsRemove jobId={job.id} /></div>
                    <div className="job-container">
                        <div className="job-info">
                            <div className="job-info_title_date">
                                <div className="jobDetailsTitle"> <p>{job.title}</p></div>
                                <div className="jobDetailsDate"><p>{new Date(job.date).toLocaleDateString()}</p></div>
                            </div>
                            <div className="jobDetailsPromoter"><p> {job.promoter}</p></div>
                            <div className="jobDetailsSalary"><p><strong>R$: </strong>{job.salary}</p></div>
                            <div className="jobDetailsWorkstyle"><p>{job.workStyle}</p></div>
                            {/* <div className="jobDetailsEmploymentType"> <p>{job.employmentType}</p></div>*/}
                            <div className="job-info_city_state">
                                <div className="jobDetailsCity"> <p>{job.city}</p></div>
                                <div>-</div>
                                <div className="jobDetailsState"> <p>{job.state.nome}</p></div>
                            </div>

                            <div className="jobDetailsSubscribe"><button onClick={handleSubscribe}>Subscribe</button></div>
                            <div className="jobDetails_separatorLine"></div>
                            <div className="jobDetails_text_and_description-container">
                                <div className="jobDetails_text_and_description">
                                    {/* <div className="jobDetailsText">
                                        <a href="#" onClick={handleTextClick}>
                                            Resumo da Vaga
                                        </a>
                                    </div> */}
                                    <div className="jobDetailsDescription">
                                        <a href="#" onClick={handleDescriptionClick}>
                                            Descrição da Vaga
                                        </a>
                                    </div>
                                </div>
                                {isTextExpanded && <div className="jobDetails_displayText"><p>{job.text}</p>
                                </div>}
                                {isDescriptionExpanded && <div className="jobDetails_displayDescription"><p>{job.description}</p>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!job && (
                <div>
                    <h2>Job não encontrado</h2>
                    <p>O job com ID {jobId} não foi encontrado.</p>
                </div>
            )}
        </div>
    );
};