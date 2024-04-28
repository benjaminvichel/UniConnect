import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleRegister = async () => {
        if (name && email && password) {
            const isRegister = await auth.register(name, email, password);
            if (isRegister) {
                navigate('/');
            } else {
                alert("Não cadastrou!")
            }
        }
    }

    return (
        <div>
            <h2>Register</h2>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Digite seu nome" />
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="digite seu email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="digite sua senha" />
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}
