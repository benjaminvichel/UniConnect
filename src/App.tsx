
import './App.css'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import { Private } from './pages/Private';
import { Home } from './pages/Home.tsx/';
import { RequireAuth } from './context/auth/RequiredAuth';
import { useContext } from 'react';
import { AuthContext } from './context/auth/AuthContext';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';


function App() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signout();
    navigate('/');
  }


  return (
    <div className="App">
      <header>
        <h1>Header do Site </h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/Private">Private</Link>
          {auth.user && <button onClick={handleLogout}>Sair</button>}
        </nav>
      </header>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Private" element={<RequireAuth><Private /></RequireAuth>} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        {/* Rota padrão para a página inicial */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
