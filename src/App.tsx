
import './App.css'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import { Private } from './pages/Private';
import { Home } from './pages/Home.tsx/';
import { RequireAuth } from './context/auth/RequiredAuth';
import { useContext } from 'react';
import { AuthContext } from './context/auth/AuthContext';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { Curriculum } from './pages/Curriculum';
import { JobsForm } from './components/JobsForm';


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
        <nav className="navigation">
          <div className="container-x1">
            <Link className="container-x1-logo" to="/">Home</Link>
            <div className="container-x2">
              <ul>
                <Link to="/UniConnect/Private">Private</Link>
                <Link to={"/UniConnect/Curriculum"}>Curriculo</Link>
              </ul>
              <div className="container-x3">
                {auth.user && <button onClick={handleLogout}>Sair</button>}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UniConnect/Private" element={<RequireAuth><Private /></RequireAuth>} />
        <Route path="/UniConnect/Register" element={<Register />} />
        <Route path="/UniConnect/ForgotPassword" element={<ForgotPassword />} />
        <Route path='/UniConnect/Curriculum' element={<RequireAuth><Curriculum /></RequireAuth>} />
        <Route path='/UniConnect/JobsForm' element={<JobsForm />}></Route>
        {/* Rota padrão para a página inicial */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
