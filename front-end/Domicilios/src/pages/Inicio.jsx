import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Input, Button, Image } from "@nextui-org/react";
import { IconoOjoAbierto } from './usuario/IconoOjoAbierto';
import { IconoOjoCerrado } from './usuario/IconoOjoCerrado';
import axios from 'axios';

const Inicio = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

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
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      }
    } catch (error) {
      setError(error.response?.data?.mensaje || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-black via-white to-black">
      <Card className="w-full max-w-md bg-gray-900 backdrop-blur-md rounded-xl shadow-lg">
        <CardHeader className="flex flex-col gap-4 items-center justify-center pt-8">
          {/* Imagen en un rectángulo que ocupa todo el contenedor */}
          <div className="w h-46 border-4 border-gray-700 rounded-lg overflow-hidden bg-gray-800">
            <Image
              src="/logotrabajo.jpeg"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-white">Bienvenido</h1>
        </CardHeader>
        
        <CardBody className="px-8 py-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
            <Input
              label="Correo Electrónico"
              placeholder="Ingresa tu correo"
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              classNames={{
                label: "text-gray-300 text-lg bg-gray text-black",
                input: "text-gray-900 text-lg placeholder:text-gray-500 text-black",
                inputWrapper: "bg-gray-100 border border-gray-200 rounded-md text-black",
              }}
            />
            
            <Input
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleInputChange}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <IconoOjoCerrado className="text-gray-300" />
                  ) : (
                    <IconoOjoAbierto className="text-gray-300" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-full rounded-md"
              classNames={{
                label: "text-gray-300 text-lg text-black",
                input: "text-gray-900 text-lg placeholder:text-gray-500 text-black",
                inputWrapper: "bg-gray-100 border border-gray-200 rounded-md text-black",
              }}
            />

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              color="primary"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300 ease-in-out py-2"
              isLoading={isLoading}
            >
              Iniciar Sesión
            </Button>
          </form>
        </CardBody>

        <CardFooter className="flex justify-center pb-8">
          <p className="text-gray-500 text-sm">
            ¿No tienes una cuenta?{" "}
            <Link to="/registro" className="text-gray-300 hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Inicio;
