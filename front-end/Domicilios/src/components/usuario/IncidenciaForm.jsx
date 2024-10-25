
import React, { useState } from 'react';

export const IncidenciaForm = ({ incidencia, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    tipo_incidencia: incidencia?.tipo_incidencia || '',
    descripcion: incidencia?.descripcion || '',
    estado: incidencia?.estado || 'activo',
    fecha_reporte: incidencia?.fecha_reporte || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {incidencia ? 'Editar Incidencia' : 'Crear Incidencia'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Incidencia</label>
              <input
                type="text"
                name="tipo_incidencia"
                value={formData.tipo_incidencia}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fecha de Reporte</label>
              <input
                type="date"
                name="fecha_reporte"
                value={formData.fecha_reporte}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {incidencia ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
