
import './App.css'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import { Private } from './pages/Private';
import { Home } from './pages/Home.tsx/';
import { RequireAuth } from './context/auth/RequiredAuth';
import { useContext } from 'react';
import { AuthContext } from './context/auth/AuthContext';


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
      </Routes>
    </div>
  )
}

export default App
