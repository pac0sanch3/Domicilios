import React, { useEffect, useState } from 'react';
import { domiciliariosService } from '../../services/domiciliarioServer';

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
              onClick={() => onEdit(novedad)}
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
