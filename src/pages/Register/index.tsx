import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { StateSelect } from "../../components/StateSelect";
import './index.css';

export const Register = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [stateSelected, setStateSelected] = useState<{ id: number | null, name: string | null }>({ id: null, name: null });

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name && email && password && phone && address && city && stateSelected.id) {
            const isRegister = await auth.register(name, email, password, phone, address, city, stateSelected.id);
            if (isRegister) {
                navigate('/');
            } else {
                alert("Não cadastrou!");
            }
        }
    };

    return (
        <div className="registerContainer">
            <div className="appRegister">
                <form onSubmit={handleRegister}>
                    <h1>Register</h1>
                    <div className="registerInput">
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome completo" />
                    </div>
                    <div className="registerInput">
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                    </div>
                    <div className="registerInput">
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
                    </div>
                    <div className="registerInput">
                        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefone" />
                    </div>
                    <div className="registerInput">
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Endereço" />
                    </div>
                    <div className="registerInput">
                        <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Cidade" />
                    </div>
                    <div className="register_stateSelect">
                        <StateSelect setStateSelected={setStateSelected} />
                    </div>
                    <div className="register_button">
                        <button type="submit">Register</button>
                    </div>
                    <div className="register_login">
                        <p>Já tem conta?</p>
                        <Link to="/UniConnect/Login" className="register_loginLink">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
