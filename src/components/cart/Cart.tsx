"use client";
import React from "react";
import { useShopContext } from "@/context/EcomerceContext";
import Image from "next/image";

const Cart = () => {
  const { isCartOpen, cart,setIsCartOpen } = useShopContext();

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div
      className={`fixed top-0 right-0 w-96 h-full bg-white shadow-2xl transition-transform z-50 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Carrito de Compras</h2>
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="text-red-500 hover:text-red-700 font-semibold"
        >
          Cerrar ✕
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          <p>Tu carrito está vacío.</p>
        </div>
      ) : (
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-130px)]">
          {cart.map((prod) => (
            <div
              key={prod.id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                {prod.img ? (
                  <img
                    src={prod.img}
                    alt={prod.name}
                    
                    className="rounded-md size-24"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-md">
                    <span className="text-sm text-gray-500">No image</span>
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-gray-800">{prod.name}</h3>
                  <p className="text-sm text-gray-600">Cantidad: {prod.quantity}</p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-800">${prod.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium text-gray-800">Total:</p>
            <p className="text-lg font-semibold text-blue-500">${calculateTotal()}</p>
          </div>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
