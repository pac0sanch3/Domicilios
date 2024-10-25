import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Input, Button, Image } from "@nextui-org/react";
import { IconoOjoAbierto } from './IconoOjoAbierto';
import { IconoOjoCerrado } from './IconoOjoCerrado';
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md">
        <CardHeader className="flex flex-col gap-2 items-center justify-center pt-8">
          <Image
            src="/logo.png"
            alt="Logo"
            className="w-24 h-24 rounded-full bg-white/20 p-2"
          />
          <h1 className="text-2xl font-bold text-white">Bienvenido</h1>
        </CardHeader>
        
        <CardBody className="px-8 py-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Correo Electrónico"
              placeholder="Ingresa tu correo"
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              className="max-w-full"
              classNames={{
                label: "text-white/90",
                input: "text-white",
                inputWrapper: "bg-white/10",
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
                    <IconoOjoCerrado className="text-white/90" />
                  ) : (
                    <IconoOjoAbierto className="text-white/90" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-full"
              classNames={{
                label: "text-white/90",
                input: "text-white",
                inputWrapper: "bg-white/10",
              }}
            />

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              color="primary"
              className="w-full bg-white text-black hover:bg-gray-200 transition-colors"
              isLoading={isLoading}
            >
              Iniciar Sesión
            </Button>
          </form>
        </CardBody>

        <CardFooter className="flex justify-center pb-8">
          <p className="text-white/60 text-sm">
            ¿No tienes una cuenta?{" "}
            <a href="/registro" className="text-white hover:underline">
              Regístrate aquí
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Inicio;