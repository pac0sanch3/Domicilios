import React, { useState } from 'react';

export const SolicitudForm = ({ role, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id_cliente: role?.id_cliente || '',
    id_domiciliario: role?.id_domiciliario || '',
    direccion_recogida: role?.direccion_recogida || '',
    direccion_entrega: role?.direccion_entrega || '',
    estado: role?.estado || 'activo',
    fecha_hora: role?.fecha_hora || ''
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
          {role ? 'Editar Rol' : 'Crear Rol'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">ID Cliente</label>
              <input
                type="text"
                name="id_cliente"
                value={formData.id_cliente}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ID Domiciliario</label>
              <input
                type="text"
                name="id_domiciliario"
                value={formData.id_domiciliario}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Dirección Recogida</label>
              <input
                type="text"
                name="direccion_recogida"
                value={formData.direccion_recogida}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Dirección Entrega</label>
              <input
                type="text"
                name="direccion_entrega"
                value={formData.direccion_entrega}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fecha y Hora</label>
              <input
                type="datetime-local"
                name="fecha_hora"
                value={formData.fecha_hora}
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
              {role ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
