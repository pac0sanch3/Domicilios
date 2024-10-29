import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Limpiar el almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userData');

    // Redirigir al usuario a la página de inicio de sesión
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm font-medium text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
