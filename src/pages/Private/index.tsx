import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth/AuthContext';
import { Jobs } from '../../components/Jobs';
import { Search } from '../../components/Search';
import { Link } from 'react-router-dom';

export const Private = () => {
    const auth = useContext(AuthContext);
    const [searchFilter, setSearchFilter] = useState('');
    const [stateSelected, setStateSelected] = useState<number | null>(null);

    useEffect(() => {
        auth.getJobsList();

    }, [])

    return (
        <div>

            <div><Search setSearchFilter={setSearchFilter} setStateSelected={setStateSelected} /></div>
            <div> <Jobs searchFilter={searchFilter} stateSelected={stateSelected} /></div>
            <div>
                <Link to="/JobsForm"><button>+</button></Link>
            </div>
        </div>
    )
}
