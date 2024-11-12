import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import LogoutButton from '../navegacion/LogoutButton';
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import NotificacionesBell from '../notificaciones/NotificacionesBell';
import { useSolicitudes } from '../../services/SolicitudesProvider';
import axios from 'axios';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userType = localStorage.getItem('userType');
  const { listarSolicitudes, solicitudes = [] } = useSolicitudes() || {};
  const [notificacionesPendientes, setNotificacionesPendientes] = useState(0);
  const [disponibilidadActual, setDisponibilidadActual] = useState('disponible');
  const [disponibilidad, setDisponibilidad] = useState('disponible');

  useEffect(() => {
    if (listarSolicitudes) {
      listarSolicitudes();
    }
    if (userType === 'domiciliario') {
      getDisponibilidad();
    }
    const interval = setInterval(() => {
      if (listarSolicitudes) {
        listarSolicitudes();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [listarSolicitudes]);

  useEffect(() => {
    const pendientes = solicitudes.filter(solicitud => solicitud.estado === 'en_curso');
    setNotificacionesPendientes(pendientes.length);
  }, [solicitudes]);

  const getDisponibilidad = async () => {
    const id_usuario = localStorage.getItem('userId');
    const respuesta = await axios.get(`${import.meta.env.VITE_API_URL}domiciliario/consultar/${id_usuario}`);
    setDisponibilidad(respuesta.data[0].disponibilidad);
    setDisponibilidadActual(respuesta.data[0].disponibilidad);
  };

  const handleDisponibilidadChange = async () => {
    try {
      const id_usuario = localStorage.getItem('userId');
      const response = await fetch(`${import.meta.env.VITE_API_URL}domiciliario/disponibilidad/${id_usuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Nueva disponibilidad:', data.nuevaDisponibilidad);
        setDisponibilidadActual(data.nuevaDisponibilidad);
        if (listarSolicitudes) {
          await listarSolicitudes();
        }
      }
    } catch (error) {
      console.error('Error al actualizar disponibilidad:', error);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="inset-x-0 top-0 h-16 bg-white md:px-8 sm:px-8 max-sm:px-8 z-50">
      <nav className="flex items-center justify-between lg:px-8 h-full" aria-label="Global">
        <div className="flex lg:flex-1 items-center">
          <div className="flex justify-center items-center ml-3 font-bold text-2xl text-blue-600 tracking-wide">
            Domicilios
          </div>
        </div>

        <div className="flex gap-6 items-center">
          <ul className="hidden sm:flex space-x-4">
            <Link to="/Home" className="text-gray-800 hover:text-green-600">Home</Link>
            {userType === 'domiciliario' && (
              <>
                <Link to="/novedades" className="text-gray-800 hover:text-green-600">Registrar novedad</Link>
                <Link to="/NotificacionesDom" className="text-gray-800 hover:text-green-600">Domicilios</Link>
              </>
            )}
            {userType === 'administrador' && (
              <Link to="/PanelDeControl" className="text-gray-800 hover:text-green-600">Panel De Control</Link>
            )}
          </ul>
          
          {(userType === 'domiciliario' || userType === 'administrador') && (
            <div className="sm:hidden">
              <button onClick={toggleMenu} className="text-3xl">
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
              {isMenuOpen && (
                <div className="absolute top-16 right-0 bg-white shadow-lg rounded-lg p-4">
                  <Link to="/Home" className="block text-gray-800 hover:text-green-600 mb-2">Home</Link>
                  <Link to="/novedades" className="block text-gray-800 hover:text-green-600 mb-2">Registrar novedad</Link>
                  <Link to="/NotificacionesDom" className="block text-gray-800 hover:text-green-600 mb-2">Domicilios</Link>
                  {userType === 'administrador' && (
                    <Link to="/PanelDeControl" className="text-gray-800 hover:text-green-600">Panel De Control</Link>
                  )}
                </div>
              )}
            </div>
          )}

          {userType === 'domiciliario' && (
            <>
              <button
                onClick={handleDisponibilidadChange}
                className={`px-4 py-2 rounded-full transition-colors duration-50 
                  ${disponibilidadActual === 'disponible'
                    ? 'bg-blue-300 text-blue-900 hover:bg-blue-400'
                    : disponibilidadActual === 'no_disponible'
                      ? 'bg-red-300 text-red-900 hover:bg-red-400'
                      : 'bg-gray-300 text-gray-900 hover:bg-gray-400'
                } border border-black`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    disponibilidadActual === 'disponible' ? 'bg-blue-600'
                    : disponibilidadActual === 'no_disponible' ? 'bg-red-600'
                    : 'bg-gray-600'
                  }`}></div>
                  <span>{disponibilidadActual}</span>
                </div>
              </button>

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

          <LogoutButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;