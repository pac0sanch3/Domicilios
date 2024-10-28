import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import  Registro from "./pages/Registrar_usuario";
import './index.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio/>} />
      <Route path="/registro" element={<Registro/>} />
    </Routes>
  );
}

export default App;
