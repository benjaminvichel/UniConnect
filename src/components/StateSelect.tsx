import { ChangeEvent, useContext } from "react"
import { AuthContext } from "../context/auth/AuthContext"

export const StateSelect = ({ setStateSelected }: { setStateSelected: (filter: { id: number | null, name: string | null }) => void }) => {
    const auth = useContext(AuthContext);

    const handleInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const selectedValue = selectedOption.value === "" ? null : parseInt(selectedOption.value);
        const selectedName = selectedOption.value === "" ? null : selectedOption.text;
        setStateSelected({ id: selectedValue, name: selectedName });
    };
    return (
        <div>
            <select id="state" onChange={handleInputChange}>
                <option value="">Todos estados</option>
                {auth.state?.map((state) => {
                    return (
                        <option key={state.id} value={state.id} style={{ color: 'black' }}>
                            {state.nome}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}
