import React from 'react';

export const IncidenciaList = ({ incidencias , onEdit, onDelete, onToggleActive }) => {
  const listaIncidencias = incidencias.reportes || [];
  return (
    <div className="space-y-4">
      {listaIncidencias.map(incidencia => (
        <div key={incidencia.id_reporte} className="flex justify-between items-center p-4 border rounded-lg bg-white">
          <div className="flex flex-col">
            <span className="font-medium">{incidencia.tipo_incidencia}</span>
            <span className="text-sm text-gray-500">Descripción: {incidencia.descripcion}</span>
            <span className="text-sm text-gray-500">Estado: {incidencia.estado}</span>
            <span className="text-sm text-gray-500">Fecha reporte: {incidencia.fecha_reporte}</span>
            <span className="text-sm text-gray-500">Fecha creación: {incidencia.fecha_creacion}</span>
            <span className="text-sm text-gray-500">Última actualización: {incidencia.fecha_actualizacion}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(incidencia)}
              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              Editar
            </button>
            
            <button
              onClick={() => onDelete(incidencia.id_reporte)}
              className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      
      {incidencias.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron incidencias
        </div>
      )}
    </div>
  );
};
