import { useShopContext } from "@/context/EcomerceContext";
import { CartType, ProductsTypes } from "@/types/ProductType";
import { useState } from "react";

export const useCart = () => {
  const [cart, setCart] = useState<CartType[]>([]);

  const addToCart = (prod: CartType) => {
    setCart((prev) => {
      const productInCart = prev.find((item) => item.id === prod.id);

      if (productInCart) {
        return prev.map((item) =>
          item.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, prod];
      }
    });
  };

  const removeToCart = (id: number) => {
    setCart((prevProds) => {
      const removeItem = prevProds.filter((item) => item.id !== id);
      return removeItem;
    });
  };

  const clearCart = () => {
    setCart([])
  }

  return {clearCart,removeToCart,addToCart,cart,setCart}
};
