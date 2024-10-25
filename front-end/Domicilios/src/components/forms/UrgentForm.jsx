import React from 'react';

const UrgentForm = () => {
  return (
    <div className="bg-white/80 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Reportar Novedad Urgente</h2>
      <form className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Tipo de Novedad</label>
          <select className="w-full p-2 border rounded-lg">
            <option>Seleccione tipo de novedad</option>
            <option>Daño de producto</option>
            <option>Problema con domiciliario</option>
            <option>Error en facturación</option>
            <option>Otro</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Descripción del Problema</label>
          <textarea
            className="w-full p-2 border rounded-lg"
            rows="4"
            placeholder="Describa el problema en detalle"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Adjuntar Fotos (opcional)</label>
          <input
            type="file"
            className="w-full p-2 border rounded-lg"
            accept="image/*"
            multiple
          />
        </div>

        <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
          Enviar Reporte Urgente
        </button>
      </form>
    </div>
  );
};

export default UrgentForm;