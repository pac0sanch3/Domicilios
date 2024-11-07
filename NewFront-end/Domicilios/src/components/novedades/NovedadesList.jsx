/* import React, { useEffect, useState } from 'react';
import { domiciliariosService } from '../../services/domiciliarioServer';
import axios from 'axios';
import { data } from 'autoprefixer';

export const NovedadesList = ({ novedades, onEdit }) => {
  const [domiciliarios, setDomiciliarios] = useState({});

  useEffect(() => {
    const loadDomiciliarios = async () => {
      try {
        const response = await domiciliariosService.getDomiciliarios();
        const domiciliariosMap = {};
        response.data.forEach(domiciliario => {
          domiciliariosMap[domiciliario.id_domiciliario] = domiciliario.licencia_vehiculo;
        });
        setDomiciliarios(domiciliariosMap);
      } catch (error) {
        console.error('Error al cargar domiciliarios:', error);
      }
    };
    loadDomiciliarios();
  }, []);


  const actualizarNovedad =async()=>{
    
    try{

      let estado = 'pendiente'
      const response = await axios.put(`http://localhost:3000/novedad/actEstado/3`)

      console.log(response)
    }catch(error){
      console.error(error)
    }

  }



  return (
    <div className="space-y-4 mt-4">
      {novedades.map(novedad => (
        <div key={novedad.id_novedad} className="flex justify-between items-center p-4 border rounded-lg bg-white">
          <div className="flex flex-col">
            
            <span className="font-medium">
              Domiciliario: {domiciliarios[novedad.id_domiciliario] || novedad.id_domiciliario}
            </span>
            <span className="text-sm text-gray-500">Ubicacion actual: {novedad.ubicacionActual}</span>
            <span className="text-sm text-gray-500">Solicitud: {novedad.id_solicitud}</span>
            <span className="text-sm text-gray-500">Descripción: {novedad.descripcion}</span>
            <span className="text-sm text-gray-500">Estado: {novedad.estado}</span>
            <span className="text-sm text-gray-500">Fecha Reporte: {new Date(novedad.fecha_reporte).toLocaleString()}</span>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => actualizarNovedad}
              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              Actualizar Estado
            </button>

            <button>
              Reasignar pedido.
            </button>
          </div>
        </div>
      ))}
      
      {novedades.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron novedades registradas
        </div>
      )}
    </div>
  );
};
 */

import React, { useEffect, useState } from 'react';
import { domiciliariosService } from '../../services/domiciliarioServer';
import axios from 'axios';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { CheckCircle2, XCircle } from "lucide-react";

export const NovedadesList = ({ novedades, onEdit }) => {
  const [domiciliarios, setDomiciliarios] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNovedad, setSelectedNovedad] = useState(null);
  const [estadoNovedad, setEstadoNovedad] = useState('pendiente');
  const [notification, setNotification] = useState({
    show: false,
    type: '',
    message: ''
  });

  useEffect(() => {
    const loadDomiciliarios = async () => {
      try {
        const response = await domiciliariosService.getDomiciliarios();
        const domiciliariosMap = {};
        response.data.forEach(domiciliario => {
          domiciliariosMap[domiciliario.id_domiciliario] = domiciliario.licencia_vehiculo;
        });
        setDomiciliarios(domiciliariosMap);
      } catch (error) {
        console.error('Error al cargar domiciliarios:', error);
      }
    };
    loadDomiciliarios();
  }, []);

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

  const abrirModalActualizacion = (novedad) => {
    setSelectedNovedad(novedad);
    setModalOpen(true);
  };

  const actualizarNovedad = async () => {
    try {
      if (!selectedNovedad) return;

      const response = await axios.put(`${import.meta.env.VITE_API_URL}novedad/actEstado/${selectedNovedad.id_novedad}`, {
        estado: estadoNovedad
      });
      
      console.log(response);
      showNotification('success', 'Estado de la novedad actualizado con éxito');
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      showNotification('error', 'Error al actualizar el estado de la novedad');
    }
  };

  const reasignarPedido = async(idSolicitud, idNovedad) => {
    try {
      let data = { idSolicitud, idNovedad };

      const respuesta = await axios.put(`${import.meta.env.VITE_API_URL}solicitudes/reasignarSoli`, data);
      console.log(respuesta);
      showNotification('success', 'Pedido reasignado correctamente');
    } catch (error) {
      console.error(error);
      showNotification('error', 'No se encontraron domiciliarios disponibles, por favor intente más tarde');
    }
  };

  return (
    <div className="space-y-4 mt-4">
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

      {novedades.map(novedad => (
        <div key={novedad.id_novedad} className="flex justify-between items-center p-4 border rounded-lg bg-white">
          <div className="flex flex-col">
            <span className="font-medium">
              Domiciliario: {domiciliarios[novedad.id_domiciliario] || novedad.id_domiciliario}
            </span>
            <span className="text-sm text-gray-500">Ubicación actual: {novedad.ubicacionActual}</span>
            <span className="text-sm text-gray-500">Solicitud: {novedad.id_solicitud}</span>
            <span className="text-sm text-gray-500">Descripción: {novedad.descripcion}</span>
            <span className="text-sm text-gray-500">Estado: {novedad.estado}</span>
            <span className="text-sm text-gray-500">
              Fecha Reporte: {new Date(novedad.fecha_reporte).toLocaleString()}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => abrirModalActualizacion(novedad)}
              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              Actualizar Estado
            </button>
            <button
              onClick={() => reasignarPedido(novedad.id_solicitud, novedad.id_novedad)}
              className="px-3 py-1 text-green-600 hover:bg-green-50 rounded-lg"
            >
              Reasignar Pedido
            </button>
          </div>
        </div>
      ))}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Actualizar Estado de Novedad</h2>
            <div className="mb-4">
              <label className="block mb-2">Seleccione un estado:</label>
              <select
                value={estadoNovedad}
                onChange={(e) => setEstadoNovedad(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="pendiente">Pendiente</option>
                <option value="resuelta">Resuelta</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={actualizarNovedad}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {novedades.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron novedades registradas
        </div>
      )}
    </div>
  );
};