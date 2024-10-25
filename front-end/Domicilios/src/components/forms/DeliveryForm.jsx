import React from 'react';
import { MapPin } from 'lucide-react';

const DeliveryForm = () => {
  return (
    <div className="bg-white/80 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Solicitar Domicilio</h2>
      <form className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Dirección de Recogida</label>
          <div className="flex items-center space-x-2">
            <MapPin className="text-gray-400" />
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg"
              placeholder="Ingrese dirección de recogida"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Dirección de Entrega</label>
          <div className="flex items-center space-x-2">
            <MapPin className="text-gray-400" />
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg"
              placeholder="Ingrese dirección de entrega"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Número de Contacto</label>
          <input
            type="tel"
            className="w-full p-2 border rounded-lg"
            placeholder="Ingrese número de teléfono"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Instrucciones Adicionales</label>
          <textarea
            className="w-full p-2 border rounded-lg"
            rows="3"
            placeholder="Ingrese instrucciones adicionales"
          />
        </div>

        <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-black/80">
          Confirmar Pedido
        </button>
      </form>
    </div>
  );
};

export default DeliveryForm;