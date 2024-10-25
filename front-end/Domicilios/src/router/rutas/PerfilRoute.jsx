import { Perfil, PerfilSettings } from "../../index";
import { Route, Routes } from "react-router-dom";

export const PerfilRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Perfil />} />
        <Route path="settings" element={<PerfilSettings />} />
      </Routes>
    </>
  );
};
