import { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import { Alert } from '../alert/Alert';
import { useNavigate } from 'react-router-dom';
import Layout from "../template/Layout";

const UserProfileContent = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    tipo_usuario: '',
    user_img: null,
    imagen_banner: null,
    nombre_negocio: '',
    direccion: '',
  });
  const [passwordData, setPasswordData] = useState({
    contrasenaActual: '',
    nuevaContrasena: '',
  });
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewBanner, setPreviewBanner] = useState(null);
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await userService.getUser(userId);
      setUserData(response.data);
      if (response.data.user_img) {
        setPreviewImage(`${import.meta.env.VITE_API_URL}${response.data.user_img}`);
      }
      if (response.data.imagen_banner) {
        setPreviewBanner(`${import.meta.env.VITE_API_URL}${response.data.imagen_banner}`);
      }
      setLoading(false);
    } catch (error) {
      showAlert('Error al cargar datos del usuario', 'error');
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showAlert('Por favor seleccione una imagen válida', 'error');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showAlert('La imagen no debe superar los 5MB', 'error');
        return;
      }

      setUserData(prev => ({ ...prev, user_img: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      
      const formData = new FormData();
      Object.keys(userData).forEach(key => {
        if (key === 'user_img' && userData[key] instanceof File) {
          formData.append('user_img', userData[key]);
        } else if (key !== 'user_img') {
          formData.append(key, userData[key]);
        }
      });

      await userService.updateUser(userId, formData);
      showAlert('Perfil actualizado exitosamente', 'success');

      localStorage.setItem('userName', userData.nombre);
      localStorage.setItem('userEmail', userData.correo);

      navigate('/Home');
    } catch (error) {
      showAlert(error.response?.data?.mensaje || 'Error al actualizar perfil', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      await userService.cambiarContrasena(userId, passwordData);
      showAlert('Contraseña actualizada exitosamente', 'success');
      setPasswordData({ contrasenaActual: '', nuevaContrasena: '' });
    } catch (error) {
      showAlert(error.response?.data?.mensaje || 'Error al cambiar contraseña', 'error');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Mi Perfil</h2>
      
      {alert.show && <Alert {...alert} />}
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-md p-6">
        {/* Sección de imagen de perfil */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Imagen de Perfil</label>
          
          <div className="flex flex-col items-center space-y-4">
            {previewImage ? (
              <div className="relative w-32 h-32">
                <img
                  src={previewImage}
                  alt="Vista previa"
                  className="w-full h-full object-cover rounded-full border-4 border-gray-200 shadow-md"
                />
              </div>
            ) : (
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center shadow-inner">
                <span className="text-gray-400">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
              </div>
            )}
            
            <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {previewImage ? 'Cambiar imagen' : 'Subir imagen'}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* Campos de información personal */}
        <div className="grid grid-cols-1 gap-6">
          {['nombre', 'correo', 'telefono'].map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
              <input
                type={field === 'correo' ? 'email' : 'text'}
                name={field}
                value={userData[field]}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Usuario</label>
            <input
              type="text"
              value={userData.tipo_usuario}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 cursor-not-allowed sm:text-sm"
              disabled
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Actualizar Perfil
        </button>
      </form>

      {/* Nueva sección de información del negocio */}
      {userType === 'negocio' && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 flex justify-center items-center">Información del Negocio</h3>
          
          <div className="w-full h-48 relative flex items-center justify-center">
            {previewBanner ? (
              <img
                src={previewBanner}
                alt="Banner del negocio"
                className="h-full rounded-lg shadow-md"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-500 text-lg font-medium">No se encontró imagen</p>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre del Negocio</label>
              <input
                type="text"
                value={userData.nombre_negocio}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 cursor-not-allowed sm:text-sm"
                disabled
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Dirección</label>
              <input
                type="text"
                value={userData.direccion}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 cursor-not-allowed sm:text-sm"
                disabled
              />
            </div>
          </div>
        </div>
      )}

      {/* Formulario de cambio de contraseña */}
      <form onSubmit={handlePasswordSubmit} className="space-y-6 mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800">Cambiar Contraseña</h3>

        {['contrasenaActual', 'nuevaContrasena'].map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="password"
              name={field}
              value={passwordData[field]}
              onChange={handlePasswordChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
};

const UserProfile = () => {
  return (
    <Layout>
      <UserProfileContent />
    </Layout>
  );
};

export default UserProfile;