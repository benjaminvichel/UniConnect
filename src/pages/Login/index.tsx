import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import './index.css'

export const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email && password) {
            const isLogged = await auth.signin(email, password);
            if (isLogged) {
                navigate('/');
            } else {
                // console.log(auth.user?.name);
                alert("Nao fez login!");
            }
        }
    }

    return (
        <div className="loginContainer">
            <div className="appLogin">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="login_input"><input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu email" /></div>
                    <div className="login_input"><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha" /></div>
                    <div className="login_forgotPassword"><Link to="/UniConnect/ForgotPassword" className="login_forgotPasswordLink">Esqueceu email ou senha?</Link></div>
                    <div className="login_button"><button type="submit">Entrar</button></div>
                    <div className="login_register"><p>Não tem conta?</p><Link to="/UniConnect/Register" className="login_registerLink">Registrar</Link></div>
                </form>

            </div>
        </div>
    )
}
