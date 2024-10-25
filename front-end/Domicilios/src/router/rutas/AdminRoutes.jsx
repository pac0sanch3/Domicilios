import {
  SettingsPanelPage,
  PaneldeControlUsuarios,
  UpdateUserAdmin,
  useAuth,
} from "../../index";
import { Route, Routes, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

export const AdminRoute = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRouteAdmin>
            <PaneldeControlUsuarios />
          </ProtectedRouteAdmin>
        }
      />
      <Route
        path="user/"
        element={
          <ProtectedRouteAdmin>
            <UpdateUserAdmin />
          </ProtectedRouteAdmin>
        }
      />
      <Route path="settings/" element={<SettingsPanelPage />} />
    </Routes>
  );
};

import { Navigate } from "react-router-dom";
/*  eslint-disable-next-line react/prop-types  */
const ProtectedRouteAdmin = ({ children }) => {
  const { rol } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Verifica si el rol está disponible y si es el rol correcto
    if (rol) {
      setIsAuthorized(rol.trim().toLowerCase().startsWith("administrador"));
    }
  }, [rol]);

  // Si la autorización está en proceso, muestra un spinner o mensaje de carga
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  // Redirige si el usuario no está autorizado
  if (!isAuthorized) {
      toast.warning(t("sin_permisos_accion"))
    return <Navigate to="/home" />;
  }

  return children;
};

export const ProtegerRutasAdminInstru = () => {
  const { rol } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(null);
  const  { t } = useTranslation();

  useEffect(() => {
    // Verifica si el rol está disponible y si es el rol correcto
    if (rol) {
      setIsAuthorized(
        rol.trim().toLowerCase().startsWith("administrador") ||
          rol.trim().toLowerCase().startsWith("instructor")
      );
    }
  }, [rol]);

  // Si la autorización está en proceso, muestra un spinner o mensaje de carga
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  // Redirige si el usuario no está autorizado
  if (!isAuthorized) {
    toast.warning(t("sin_permisos_accion"))
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};
