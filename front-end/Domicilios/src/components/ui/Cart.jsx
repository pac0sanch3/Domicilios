import React from 'react';
import { X } from 'lucide-react';

const Cart = ({ cart, setCart }) => {
  return (
    <div className="w-72">
      <div className="bg-black/5 p-4 rounded-lg">
        <h3 className="font-bold mb-4">Carrito de Compras</h3>
        {cart.map((item, index) => (
          <div key={index} className="flex items-center justify-between mb-2">
            <span>{item.name}</span>
            <span>${item.price}</span>
            <button
              onClick={() => setCart(cart.filter((_, i) => i !== index))}
              className="text-red-500"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${cart.reduce((sum, item) => sum + item.price, 0)}</span>
          </div>
        </div>
        <button className="w-full bg-black text-white py-2 rounded-lg mt-4 hover:bg-black/80">
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
};

export default Cart;