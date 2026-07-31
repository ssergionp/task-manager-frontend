import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RotaProtegida from './components/RotaProtegida';
import Login from './pages/Login';
import Tarefas from './pages/Tarefas';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/tarefas"
            element={
              <RotaProtegida>
                <Tarefas />
              </RotaProtegida>
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
