import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/auth/AuthContext';
import { StateSelect } from './StateSelect';
import { WorkStyle, EmploymentType } from '../types/Job';
import './JobsForm.css'

export const JobsForm = () => {
    const auth = useContext(AuthContext);

    const [title, setTitle] = useState('');
    const [workStyle, setWorkStyle] = useState<WorkStyle>(WorkStyle.PRESENCIAL);
    const [employmentType, setEmploymentType] = useState<EmploymentType>(EmploymentType.TRABALHO);
    const [description, setDescription] = useState('');
    const [promoter, setPromoter] = useState('');
    const [salary, setSalary] = useState<number>(0);
    const [city, setCity] = useState('');
    const [stateSelected, setStateSelected] = useState<{ id: number | null; name: string | null }>({ id: null, name: null });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !workStyle || !employmentType || !description || !promoter || !salary || !city || !stateSelected.id || !stateSelected.name) return;
        addJob();
        resetForm();
    }

    const resetForm = () => {
        setTitle('');
        setWorkStyle(WorkStyle.PRESENCIAL);
        setEmploymentType(EmploymentType.TRABALHO);
        setDescription('');
        setPromoter('');
        setSalary(0);
        setCity('');
        setStateSelected({ id: null, name: null });
    }

    const addJob = async () => {
        const result = await auth.addJob(title, workStyle, employmentType, description, promoter, salary, city, stateSelected.id, stateSelected.name);
        if (result) {
            console.log("Adicionado ao banco de dados!");
        }
        else {
            console.log("Nao adicionado ao banco de dados!");
        }
    }

    return (
        <div className='jobsFormApp'>
            <div className='jobsForm_jobsForm'>
                <h2>Criar tarefa</h2>
                <form className='jobsForm_form' onSubmit={handleSubmit}>
                    <div className='jobsForm_formContainer_1'>
                        <div className='jobsForm_formContainer_1Title'>
                            <div className='form_titleInput'><input value={title} type="text" placeholder='Digite o title' onChange={(e) => setTitle(e.target.value)} /></div></div>
                        <div className='jobsForm_formContainer_1workStyle'>
                            <div className='form_workstyleSelect'>
                                <select value={workStyle} onChange={(e) => setWorkStyle(e.target.value as WorkStyle)}>
                                    <option value="HIBRIDO">HIBRIDO</option>
                                    <option value="PRESENCIAL">PRESENCIAL</option>
                                    <option value="REMOTO">REMOTO</option>
                                </select>
                            </div>
                            <div className='form_employmentSelect'>
                                <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}>
                                    <option value="TRABALHO">Trabalho</option>
                                    <option value="ESTAGIO">Estágio</option>
                                </select>
                                <div className='form_salaryInput'><input value={salary === 0 ? '' : salary} type="number" placeholder='Salario da vaga' onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    setSalary(isNaN(value) ? 0 : value); // If input is NaN, set salary to 0
                                }} required /></div>
                            </div></div>
                        <div className='jobsForm_formContainer_1City_state '>
                            <div className='form_cityInput'>
                                <input value={city} type="text" placeholder='Cidade da vaga' onChange={(e) => setCity(e.target.value)} required />
                            </div>
                            <div className='form_stateSelect'>
                                <StateSelect setStateSelected={setStateSelected} />
                            </div>
                        </div>

                    </div>

                    <div className='form_promoterTextarea'><textarea value={promoter} placeholder='Empresa anunciante' onChange={(e) => setPromoter(e.target.value)} required /></div>

                    {/*<div className='form_textTextarea'><textarea value={text} placeholder='Breve resumo da vaga' onChange={(e) => setText(e.target.value)} /></div> */}

                    <div className='form_descriptionTextarea'><textarea value={description} placeholder='Descrição vaga' onChange={(e) => setDescription(e.target.value)} required /></div>

                    <div className='form_buttonSubmit'><button type='submit'>Criar Job</button></div>




                </form>
            </div>



        </div>
    )
}
