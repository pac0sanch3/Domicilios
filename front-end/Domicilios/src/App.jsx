import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Home from './pages/auth/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
