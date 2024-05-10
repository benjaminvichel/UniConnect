import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/auth/AuthContext';
import { StateSelect } from './StateSelect';
import { WorkStyle, EmploymentType } from '../types/Job';

export const JobsForm = () => {
    const auth = useContext(AuthContext);

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [workStyle, setWorkStyle] = useState<WorkStyle>(WorkStyle.PRESENCIAL);
    const [employmentType, setEmploymentType] = useState<EmploymentType>(EmploymentType.TRABALHO);
    const [description, setDescription] = useState('');
    const [promoter, setPromoter] = useState('');
    const [salary, setSalary] = useState<number>(0);
    const [city, setCity] = useState('');
    const [stateSelected, setStateSelected] = useState<number | null>(null);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !text || !workStyle || !employmentType || !description || !promoter || !salary || !city || !stateSelected) return;

        addJob();
        resetForm();
    }

    const resetForm = () => {
        setTitle('');
        setText('');
        setWorkStyle(WorkStyle.PRESENCIAL);
        setEmploymentType(EmploymentType.TRABALHO);
        setDescription('');
        setPromoter('');
        setSalary(0);
        setCity('');

    }

    const addJob = async () => {
        const result = await auth.addJob(title, text, workStyle, employmentType, description, promoter, salary, city, stateSelected);
        if (result) {
            console.log("Adicionado ao banco de dados!");
        }
        else {
            console.log("Nao adicionado ao banco de dados!");
        }
    }

    return (
        <div className='JobsForm'>
            <h2>Criar tarefa</h2>
            <form onSubmit={handleSubmit}>
                <div><input value={title} type="text" placeholder='digite o title' onChange={(e) => setTitle(e.target.value)} /></div>
                <div><input value={text} type="text" placeholder='breve resumo da vaga' onChange={(e) => setText(e.target.value)} /></div>
                <div>
                    <select value={workStyle} onChange={(e) => setWorkStyle(e.target.value as WorkStyle)}>
                        <option value="HIBRIDO">HIBRIDO</option>
                        <option value="PRESENCIAL">PRESENCIAL</option>
                        <option value="REMOTO">REMOTO</option>
                    </select>
                </div>
                <div>
                    <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}>
                        <option value="TRABALHO">Trabalho</option>
                        <option value="ESTAGIO">Estágio</option>
                    </select>
                </div>
                <div><input value={description} type="text" placeholder='descrição vaga' onChange={(e) => setDescription(e.target.value)} required /></div>
                <div><input value={promoter} type="text" placeholder='Empresa anunciante' onChange={(e) => setPromoter(e.target.value)} required /></div>
                <div><input value={salary} type="number" placeholder='Salario da vaga' onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setSalary(isNaN(value) ? 0 : value); // If input is NaN, set salary to 0
                }} required /></div>
                <div><input value={city} type="text" placeholder='Cidade da vaga' onChange={(e) => setCity(e.target.value)} required /></div>
                <div><StateSelect setStateSelected={setStateSelected} /></div>
                <div><button type='submit'>Criar Job</button></div>

            </form>


        </div>
    )
}
