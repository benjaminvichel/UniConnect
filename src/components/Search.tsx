import { ChangeEvent } from "react";
import { StateSelect } from "./StateSelect";
import './Search.css';

export const Search = ({ setSearchFilter, setStateSelected }: { setSearchFilter: (filter: string) => void, setStateSelected: (selected: { id: number | null, name: string | null }) => void }) => {

    //:
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchFilter(e.target.value);
    };

    return (
        <div className="search_app">
            <div className="search_appContainer">
                {/*<div className="search_appContainer_search"><h2>Search</h2></div> */}
                <div className="search_appContainer_inputs">
                    <div className="search_selectState"><StateSelect setStateSelected={setStateSelected} /></div>
                    <div className="vertical-line"></div>
                    <div className="search_inputText"><input type="text" placeholder="Pesquisar..." onChange={handleInputChange} /></div>
                </div>

            </div>

        </div>

    )
}
