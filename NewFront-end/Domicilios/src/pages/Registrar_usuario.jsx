import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Input, Button, Image } from "@nextui-org/react";
import axios from 'axios';

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    tipo_usuario: 'particular',
    correo: '',
    telefono: '',
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
      const response = await axios.post('http://localhost:3000/usuario/registrar', formData);
      if (response.status === 201) {
        navigate('/');
      }
    } catch (error) {
      setError(error.response?.data?.mensaje || 'Error al registrar usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-200 to-blue-600 p-4">
  <Card className="w-full max-w-sm bg-white/90 backdrop-blur-md rounded-xl shadow-2xl">
    <CardHeader className="flex flex-col gap-4 items-center justify-center pt-6 pb-4">
      <div className="w-48 h-36 border-2 border-blue-300 rounded-lg overflow-hidden bg-blue-100 shadow-inner">
        <Image
          src="/logotrabajo.jpeg"
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-2xl font-bold text-gray-800">Registro de Usuario</h1>
    </CardHeader>
    
    <CardBody className="px-6 py-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-600 text-base font-medium">
              Nombre Completo
            </label>
            <Input
              placeholder="Ingresa tu nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              classNames={{
                input: "text-gray-900 text-base placeholder:text-gray-400",
                inputWrapper: [
                  "bg-white",
                  "border-2",
                  "border-blue-200",
                  "rounded-lg",
                  "hover:border-blue-300",
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
            <label className="block text-gray-600 text-base font-medium">
              Correo Electrónico
            </label>
            <Input
              placeholder="Ingresa tu correo"
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              classNames={{
                input: "text-gray-900 text-base placeholder:text-gray-400",
                inputWrapper: [
                  "bg-white",
                  "border-2",
                  "border-blue-200",
                  "rounded-lg",
                  "hover:border-blue-300",
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
            <label className="block text-gray-600 text-base font-medium">
              Teléfono
            </label>
            <Input
              placeholder="Ingresa tu teléfono"
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              classNames={{
                input: "text-gray-900 text-base placeholder:text-gray-400",
                inputWrapper: [
                  "bg-white",
                  "border-2",
                  "border-blue-200",
                  "rounded-lg",
                  "hover:border-blue-300",
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
            <label className="block text-gray-600 text-base font-medium">
              Contraseña
            </label>
            <Input
              placeholder="Ingresa tu contraseña"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleInputChange}
              type="password"
              classNames={{
                input: "text-gray-900 text-base placeholder:text-gray-400",
                inputWrapper: [
                  "bg-white",
                  "border-2",
                  "border-blue-200",
                  "rounded-lg",
                  "hover:border-blue-300",
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
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium text-base rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 ease-in-out py-2 min-h-[2.5rem]"
          isLoading={isLoading}
        >
          Registrarse
        </Button>
      </form>
    </CardBody>

    <CardFooter className="flex justify-center pb-6 pt-2">
      <p className="text-gray-500 text-sm">
        ¿Ya tienes una cuenta?{" "}
        <a 
          href="/" 
          className="text-blue-500 hover:text-blue-400 hover:underline transition-colors duration-200 font-medium"
        >
          Inicia sesión aquí
        </a>
      </p>
    </CardFooter>
  </Card>
</div>

  );
};

export default Registro;
