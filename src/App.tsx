
import './App.css'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import { Private } from './pages/Private';
import { Home } from './pages/Home.tsx/';
import { RequireAuth } from './context/auth/RequiredAuth';
import { useContext, useState } from 'react';
import { AuthContext } from './context/auth/AuthContext';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { Curriculum } from './pages/Curriculum';
import { JobsForm } from './components/JobsForm';
import { Login } from './pages/Login';
import { JobDetails } from './components/JobDetails';
import { Applications } from './pages/Applications';
import { FaBars } from "react-icons/fa";

function App() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleLogout = async () => {
    auth.signout();
    navigate('/');
  }

  const showSidebar = () => {
    setSidebarVisible(true);
  }
  const hideSidebar = () => {
    setSidebarVisible(false);
  }
  return (
    <div className="App">
      <header>
        <nav className="navigation">
          <div className="container-x1">
            <Link className="container-x1-logo" to="/">Home</Link>
            <div className="container-x2">
              {/*nav horizontal*/}
              <ul className='horizontalBar'>
                <li className='hideOnMobile'><Link to="/UniConnect/Private">Private</Link></li>
                <li className='hideOnMobile'><Link to={"/UniConnect/Curriculum"}>Curriculo</Link></li>
                <li className='hideOnMobile'><Link to={"/UniConnect/Applications"}>Candidaturas</Link></li>
              </ul>



              <div className="container-x3">
                <li className='menu-button' onClick={showSidebar}><a href="#"><FaBars /></a></li>
                {/*nav vertical*/}
                {sidebarVisible && (
                  <div className="sidebar">
                    <ul>
                      <li onClick={hideSidebar}><a href="#">Fechar</a></li>
                      <li onClick={hideSidebar}><Link to="/UniConnect/Private">Private</Link></li>
                      <li onClick={hideSidebar}><Link to="/UniConnect/Curriculum">Curriculo</Link></li>
                      <li onClick={hideSidebar}><Link to="/UniConnect/Applications">Candidaturas</Link></li>
                      <li className='logoutButtonVerticalBar'>{auth.user && <button onClick={handleLogout}>Sair</button>}</li>
                    </ul>
                  </div>
                )}
                <li className='logoutButtonHorizontalBar'>{auth.user && <button onClick={handleLogout}>Sair</button>}</li>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UniConnect/Private" element={<RequireAuth><Private /></RequireAuth>} />
        <Route path="/UniConnect/Login" element={<Login />} />
        <Route path="/UniConnect/Register" element={<Register />} />
        <Route path="/UniConnect/ForgotPassword" element={<ForgotPassword />} />
        <Route path='/UniConnect/Curriculum' element={<RequireAuth><Curriculum /></RequireAuth>} />
        <Route path='/UniConnect/JobsForm' element={<JobsForm />}></Route>
        <Route path="/UniConnect/JobDetails/:jobId" element={<JobDetails />} />
        <Route path="/UniConnect/Applications" element={<RequireAuth><Applications /></RequireAuth>} />
        {/* Rota padrão para a página inicial */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
