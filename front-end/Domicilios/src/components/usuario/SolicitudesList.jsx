import React from 'react';

export const SolicitudesList = ({ roles, onEdit, onDelete, onToggleActive }) => {
  return (
    <div className="space-y-4">
      {roles.map(role => (
        <div key={role.id_reporte} className="flex justify-between items-center p-4 border rounded-lg bg-white">
          <div className="flex flex-col">
            <span className="font-medium">ID Cliente: {role.id_cliente}</span>
            <span className="text-sm text-gray-500">ID Domiciliario: {role.id_domiciliario}</span>
            <span className="text-sm text-gray-500">Dirección Recogida: {role.direccion_recogida}</span>
            <span className="text-sm text-gray-500">Dirección Entrega: {role.direccion_entrega}</span>
            <span className="text-sm text-gray-500">Estado: {role.estado}</span>
            <span className="text-sm text-gray-500">Fecha y Hora: {new Date(role.fecha_hora).toLocaleString()}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(role)}
              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              Editar
            </button>
            
            
            <button
              onClick={() => onDelete(role.id_reporte)}
              className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      
      {roles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron roles
        </div>
      )}
    </div>
  );
};
