"use client"
import React from "react";
import { useShopContext } from "@/context/EcomerceContext";

const CartToggleButton = () => {
  const { toggleCart } = useShopContext();

  return (
    <button
      onClick={toggleCart}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    >
      Toggle Cart
    </button>
  );
};

export default CartToggleButton;
