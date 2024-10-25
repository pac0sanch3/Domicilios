import React from 'react';
import { Truck, ShoppingBag } from 'lucide-react';

const WelcomeScreen = () => {
  return (
    <div className="bg-white/80 p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-bold mb-4">Bienvenido al Sistema</h2>
      <p className="text-gray-600 mb-8">
        Seleccione una opción del menú para comenzar
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <Truck className="mx-auto mb-2" />
          <h3 className="font-bold">Solicitar Domicilio</h3>
          <p className="text-sm text-gray-600">Gestione sus envíos</p>
        </div>
        <div className="p-4 border rounded-lg">
          <ShoppingBag className="mx-auto mb-2" />
          <h3 className="font-bold">Realizar Compra</h3>
          <p className="text-sm text-gray-600">Explore nuestros productos</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;