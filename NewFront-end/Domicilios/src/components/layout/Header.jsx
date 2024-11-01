import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import LogoutButton from '../navegacion/LogoutButton';
import { FaBell } from "react-icons/fa";
import NotificacionesBell from '../notificaciones/NotificacionesBell';
import { useSolicitudes } from '../../services/SolicitudesProvider';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const userType = localStorage.getItem('userType');
  const { listarSolicitudes, solicitudes } = useSolicitudes();
  const [notificacionesPendientes, setNotificacionesPendientes] = useState(0);

  useEffect(() => {
    listarSolicitudes();
    const interval = setInterval(() => {
      listarSolicitudes();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pendientes = solicitudes.filter(solicitud => solicitud.estado === 'en_curso');
    setNotificacionesPendientes(pendientes.length);
  }, [solicitudes]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="inset-x-0 top-0 h-16 bg-white md:px-8 sm:px-8 max-sm:px-8 z-50">
      <nav className="flex items-center justify-between lg:px-8 h-full" aria-label="Global">
        <div className="flex lg:flex-1 items-center">
          <figure className="h-full w-24 "></figure>
          <div className="flex justify-center items-center ml-3 font-bold text-2xl text-green-600 tracking-wide">
            Domicilios
          </div>
        </div>

        <div className="flex gap-6 items-center">
          {/* Menú de navegación */}
          <ul className="flex space-x-4">
            <Link to="/Home" className="text-gray-800 hover:text-green-600">Home</Link>
            <Link to="/solicitud" className="text-gray-800 hover:text-green-600">Domicilio</Link>
            {userType === 'domiciliario' && (
              <Link to="/novedades" className="text-gray-800 hover:text-green-600">Registrar novedad</Link>
            )}
            {userType === 'domiciliario' && (
              <Link to="/NotificacionesDom" className="text-gray-800 hover:text-green-600">Domicilios</Link>
            )}
            {userType === 'administrador' && (
              <Link to="/PanelDeControl" className="text-gray-800 hover:text-green-600">Panel De Control</Link>
            )}
          </ul>

          {/* Icono de notificaciones */}
          {userType === 'domiciliario' && (
            <>
              <button className="relative" onClick={toggleNotifications}>
                <FaBell className="text-3xl cursor-pointer" />
                {notificacionesPendientes > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {notificacionesPendientes}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute top-12 right-0 w-80 bg-white shadow-lg rounded-lg">
                  <NotificacionesBell />
                </div>
              )}
            </>
          )}

          {/* Botón de logout */}
          <LogoutButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;
