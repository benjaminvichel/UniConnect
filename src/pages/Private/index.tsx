import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth/AuthContext';
import { Jobs } from '../../components/Jobs';
import { Search } from '../../components/Search';
import { Link } from 'react-router-dom';
import './index.css';

export const Private = () => {
    const auth = useContext(AuthContext);
    const [searchFilter, setSearchFilter] = useState('');
    const [stateSelected, setStateSelected] = useState<number | null>(null);

    useEffect(() => {
        auth.getJobsList();

    }, [])

    return (
        <div className='appPrivate'>
            <div className='privateJobsForm'><Link to="/UniConnect/JobsForm"><button>+</button></Link></div>
            <div className='privateSearch'><Search setSearchFilter={setSearchFilter} setStateSelected={setStateSelected} /></div>
            <div className='privateJobs'> <Jobs searchFilter={searchFilter} stateSelected={stateSelected} /></div>
        </div>
    )
}
