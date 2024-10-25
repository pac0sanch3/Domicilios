import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Home from './pages/auth/Home';
import  Registro from "./pages/Registrar_usuario";
import MainLayout from './components/layout/MainLayout';
import './index.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/home" element={<MainLayout />} />
      <Route path="/registro" element={<Registro/>} />
    </Routes>
  );
}

export default App;
