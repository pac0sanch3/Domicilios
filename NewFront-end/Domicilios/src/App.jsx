import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import  Registro from "./pages/Registrar_usuario";
import  Home from "./pages/Home";
import PanelDeControl from './pages/PaneldeControl';
import './index.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio/>} />
      <Route path="/registro" element={<Registro/>} />
      <Route path="/Home" element={<Home/>} />
      <Route path="/PanelDeControl" element={<PanelDeControl/>} />
    </Routes>
  );
}

export default App;
