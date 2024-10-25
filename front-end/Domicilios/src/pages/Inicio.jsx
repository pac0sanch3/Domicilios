import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Input, Button, Image } from "@nextui-org/react";
import axios from 'axios';

const Inicio = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/usuario/login', formData);
      
      // Verificar el estado del usuario
      if (response.data.usuario.estado === 'inactivo') {
        setError('Tu cuenta está desactivada. Por favor, contacta al administrador.');
        return;
      }
      
      if (response.data.token) {
        // Guardar token
        localStorage.setItem('token', response.data.token);
        
        // Guardar datos del usuario
        localStorage.setItem('userId', response.data.usuario.id.toString());
        localStorage.setItem('userType', response.data.usuario.tipo_usuario);
        localStorage.setItem('userName', response.data.usuario.nombre);
        localStorage.setItem('userEmail', response.data.usuario.correo);
        
        // También guardamos todos los datos del usuario en un solo objeto
        localStorage.setItem('userData', JSON.stringify(response.data.usuario));

        console.log(localStorage.getItem('userData'));
        
        navigate('/home');
      }
    } catch (error) {
      if (error.response?.data?.mensaje) {
        setError(error.response.data.mensaje);
      } else if (error.response?.status === 401) {
        setError('Credenciales inválidas');
      } else {
        setError('Error al iniciar sesión. Por favor, intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-black via-white to-black p-4">
      <Card className="w-full max-w-sm bg-gray-900/95 backdrop-blur-md rounded-xl shadow-2xl">
        <CardHeader className="flex flex-col gap-4 items-center justify-center pt-6 pb-4">
          <div className="w-48 h-36 border-2 border-gray-700 rounded-lg overflow-hidden bg-gray-800 shadow-inner">
            <Image
              src="/logotrabajo.jpeg"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">Bienvenido</h1>
        </CardHeader>
        
        <CardBody className="px-6 py-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-gray-300 text-base font-medium">
                  Correo Electrónico
                </label>
                <Input
                  placeholder="Ingresa tu correo"
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  classNames={{
                    input: "text-gray-900 text-base placeholder:text-gray-500",
                    inputWrapper: [
                      "bg-gray-100",
                      "border-2",
                      "border-gray-200",
                      "rounded-lg",
                      "hover:border-gray-300",
                      "focus-within:border-blue-500",
                      "transition-colors",
                      "duration-200",
                      "py-1",
                      "px-3",
                      "min-h-[2.5rem]"
                    ].join(" "),
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-gray-300 text-base font-medium">
                  Contraseña
                </label>
                <Input
                  placeholder="Ingresa tu contraseña"
                  name="contrasena"
                  type="password"
                  value={formData.contrasena}
                  onChange={handleInputChange}
                  classNames={{
                    input: "text-gray-900 text-base placeholder:text-gray-500",
                    inputWrapper: [
                      "bg-gray-100",
                      "border-2",
                      "border-gray-200",
                      "rounded-lg",
                      "hover:border-gray-300",
                      "focus-within:border-blue-500",
                      "transition-colors",
                      "duration-200",
                      "py-1",
                      "px-3",
                      "min-h-[2.5rem]"
                    ].join(" "),
                  }}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-100/10 rounded-lg p-2 animate-pulse">
                {error}
              </div>
            )}

            <Button
              type="submit"
              color="primary"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-base rounded-lg shadow-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300 ease-in-out py-2 min-h-[2.5rem]"
              isLoading={isLoading}
            >
              Iniciar Sesión
            </Button>
          </form>
        </CardBody>

        <CardFooter className="flex justify-center pb-6 pt-2">
          <p className="text-gray-400 text-sm">
            ¿No tienes una cuenta?{" "}
            <Link 
              to="/registro" 
              className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200 font-medium"
            >
              Regístrate aquí
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Inicio;