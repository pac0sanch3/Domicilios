import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { CheckCircle2, XCircle } from "lucide-react";

const FormSolicitud = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [notification, setNotification] = useState({
    show: false,
    type: '',
    message: ''
  });

  const showNotification = (type, message) => {
    setNotification({
      show: true,
      type,
      message
    });

    setTimeout(() => {
      setNotification({
        show: false,
        type: '',
        message: ''
      });
    }, 5000);
  };

  const onSubmit = async (data) => {
    try {
      data["fk_cliente"] = localStorage.getItem('userId');
      await axios.post(`${import.meta.env.VITE_API_URL}solicitudes/registrar`, data);

      showNotification('success', 'Se registró correctamente');
      reset();
      onClose();

    } catch (error) {
      console.error(error);
      showNotification('error', 'Lo sentimos, no se encuentran domiciliarios disponibles, intentar más tarde');
      onClose();
    }
  };

  return (
    <div className="bg-white/80 p-6 rounded-lg shadow-lg space-y-4">
      {notification.show && (
        <Alert
          variant={notification.type === 'success' ? 'default' : 'destructive'}
          className={`transition-all duration-300 ease-in-out ${
            notification.show ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {notification.type === 'success' ? 'Éxito' : 'Error'}
          </AlertTitle>
          <AlertDescription>
            {notification.message}
          </AlertDescription>
        </Alert>
      )}

      <h2 className="text-2xl font-bold mb-6">Solicitar Domicilio</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Dirección de Recogida</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              {...register('direccionRecogida', { required: 'Este campo es obligatorio' })}
              className="flex-1 p-2 border rounded-lg"
              placeholder="Ingrese dirección de recogida"
            />
          </div>
          {errors.direccionRecogida && <p className="text-red-500 text-sm">{errors.direccionRecogida.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Dirección de Entrega</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              {...register('direccionEntrega', { required: 'Este campo es obligatorio' })}
              className="flex-1 p-2 border rounded-lg"
              placeholder="Ingrese dirección de entrega"
            />
          </div>
          {errors.direccionEntrega && <p className="text-red-500 text-sm">{errors.direccionEntrega.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Instrucciones Adicionales</label>
          <textarea
            {...register('instruccionesAdcc')}
            className="w-full p-2 border rounded-lg"
            rows="3"
            placeholder="Ingrese instrucciones adicionales"
          />
        </div>

        <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-black/80">
          Confirmar Pedido
        </button>
      </form>
    </div>
  );
};

export default FormSolicitud;