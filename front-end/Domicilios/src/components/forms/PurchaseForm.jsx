import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Cart from '../ui/Cart';

const PurchaseForm = () => {
  const [cart, setCart] = useState([]);
  const [products] = useState([
    { id: 1, name: 'Producto 1', price: 100 },
    { id: 2, name: 'Producto 2', price: 200 },
    { id: 3, name: 'Producto 3', price: 300 },
  ]);

  return (
    <div className="bg-white/80 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Solicitar Compra</h2>
      <div className="flex space-x-6">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-4">
            <Search className="text-gray-400" />
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg"
              placeholder="Buscar productos..."
            />
          </div>
          
          <div className="space-y-2">
            {products.map(product => (
              <div key={product.id} className="flex items-center justify-between p-2 border rounded-lg">
                <span>{product.name}</span>
                <span>${product.price}</span>
                <button
                  onClick={() => setCart([...cart, product])}
                  className="bg-black text-white px-4 py-1 rounded-lg hover:bg-black/80"
                >
                  Agregar
                </button>
              </div>
            ))}
          </div>
        </div>

        <Cart cart={cart} setCart={setCart} />
      </div>
    </div>
  );
};

export default PurchaseForm;