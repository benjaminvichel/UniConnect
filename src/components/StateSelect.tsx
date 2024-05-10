import { ChangeEvent, useContext } from "react"
import { AuthContext } from "../context/auth/AuthContext"

export const StateSelect = ({ setStateSelected }: { setStateSelected: (filter: number | null) => void }) => {
    const auth = useContext(AuthContext);

    const handleInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value === "" ? null : parseInt(e.target.value);
        setStateSelected(selectedValue);
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
