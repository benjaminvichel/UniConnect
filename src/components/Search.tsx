import { ChangeEvent } from "react";
import { StateSelect } from "./StateSelect";
import './Search.css';

export const Search = ({ setSearchFilter, setStateSelected }: { setSearchFilter: (filter: string) => void, setStateSelected: (selected: number | null) => void }) => {

    //:
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchFilter(e.target.value);
    };

    return (
        <div className="search_app">
            <h2>Search</h2>
            <div className="search_input"><StateSelect setStateSelected={setStateSelected} /></div>
            <div className="search_input"><input type="text" placeholder="Pesquisar..." onChange={handleInputChange} /></div>
            <div className="search_input"></div>
            <div className="search_input"></div>
        </div>

    )
}
