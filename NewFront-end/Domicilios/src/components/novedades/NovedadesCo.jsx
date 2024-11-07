import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { CheckCircle2, XCircle } from "lucide-react";

const NovedadesCo = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [soli, setSoli] = useState([]);
  const [idDomici, setDomic] = useState();
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
      data['id_domiciliario'] = idDomici;
      const response = await axios.post(`${import.meta.env.VITE_API_URL}novedad/`, data);
      showNotification('success', 'Novedad registrada con éxito');
      reset();
    } catch (error) {
      console.error(error);
      showNotification('error', 'No se encuentran domiciliarios disponibles para la reasignación del pedido');
    }
  };

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const idUser = localStorage.getItem('userId');
        const respuesta = await axios.get(`${import.meta.env.VITE_API_URL}solicitudes/buscarDomic/${idUser}`);
        let idDomiciliario = respuesta.data.response[0].id_domiciliario;
        setDomic(idDomiciliario);
        const soli = await axios.get(`${import.meta.env.VITE_API_URL}solicitudes/listSolicitudesDom/${idDomiciliario}`);
        setSoli(soli.data.response);
      } catch (error) {
        console.error("Error al obtener las solicitudes:", error);
      }
    };
    fetchSolicitudes();
  }, []);

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

      <h2 className="text-2xl font-bold mb-6">Registrar una novedad</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Descripción de la novedad:</label>
          <textarea
            {...register('descripcion')}
            className="w-full p-2 border rounded-lg"
            rows="3"
            placeholder="Ingrese la descripción de la novedad"
          />
          {errors.descripcion && (
            <span className="text-sm text-red-500">{errors.descripcion.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Ubicación actual:</label>
          <input
            {...register('ubicacionActual')}
            className="w-full p-2 border rounded-lg"
            placeholder="Ingrese su ubicación"
          />
          {errors.ubicacionActual && (
            <span className="text-sm text-red-500">{errors.ubicacionActual.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Seleccione una solicitud</label>
          <select 
            {...register('id_solicitud')} 
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Seleccione una opción</option>
            {soli.map((item) => (
              <option 
                key={item.id_solicitud} 
                value={item.id_solicitud}
              >
                Recogida: {item.direccion_recogida} - Entrega: {item.direccion_entrega}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
          Registrar novedad
        </button>
      </form>
    </div>
  );
};

export default NovedadesCo;