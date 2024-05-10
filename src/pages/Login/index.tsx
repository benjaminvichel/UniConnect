import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('Login');

    const handleLogin = async () => {
        if (email && password) {
            setLoading('working...')
            const isLogged = await auth.signin(email, password);
            setLoading('login')
            if (isLogged) {
                navigate('/');
            } else {
                // console.log(auth.user?.name);
                alert("Nao fez login!");
            }
        }
    }

    return (
        <div><h2>Página fechada</h2>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="digite seu email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="digite sua senha" />
            <button onClick={handleLogin}>{loading}</button>
            <p>Não tem conta?<Link to="/UniConnect/Register">Register</Link></p>
            <Link to="/UniConnect/ForgotPassword">Esqueceu email ou senha?</Link>
        </div>
    )
}
