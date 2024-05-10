import React, { useContext, useState } from "react"
import { AuthContext } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { StateSelect } from "../../components/StateSelect";

export const Register = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [stateSelected, setStateSelected] = useState<number | null>(null);
    // const role = 'USER';//admin para administrador

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name && email && password && phone && address && city && stateSelected) {
            const isRegister = await auth.register(name, email, password, phone, address, city, stateSelected);
            if (isRegister) {
                navigate(' /');
            } else {
                alert("Não cadastrou!")
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleRegister}>
                <h2>Register</h2>
                <div><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome completo" /></div>
                <div><input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" /></div>
                <div><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" /></div>
                <div><input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefone" /></div>
                <div><input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Endereço" /></div>
                <div><input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Cidade" /></div>
                <div><StateSelect setStateSelected={setStateSelected} /></div>
                <button type="submit">Register</button>
            </form>

        </div>
    )
}
