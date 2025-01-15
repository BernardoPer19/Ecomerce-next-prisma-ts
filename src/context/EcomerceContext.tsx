"use client";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { CartType, ProductsTypes } from "@/types/ProductType";
import { useCart } from "@/hooks/useCart";

interface ContextType {
  products: ProductsTypes[];
  setProducts: React.Dispatch<React.SetStateAction<ProductsTypes[]>>;
  loadData: () => Promise<void>;
  loading: boolean;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>; // Corregido
  toggleCart: () => void;
  clearCart: () => void;
  removeToCart: (id: number) => void;
  addToCart: (prod: CartType) => void;
  cart: CartType[];
}

interface ChildrenType {
  children: React.ReactNode;
}

export const ShopContext = createContext<ContextType | undefined>(undefined);

function EcomerceContextProvider({ children }: ChildrenType) {
  const [products, setProducts] = useState<ProductsTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  //hooks data
  const { clearCart, removeToCart, addToCart, cart, setCart } = useCart();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      if (!res.ok) {
        throw new Error("Error en el fetch de datos");
      }
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const value = {
    products,
    setProducts,
    loadData,
    loading,
    toggleCart,
    isCartOpen,
    clearCart,
    removeToCart,
    addToCart,
    cart,
    setCart,setIsCartOpen
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export const useShopContext = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error(
      "useShopContext debe ser usado dentro de un EcomerceContextProvider"
    );
  }

  return context;
};

export default EcomerceContextProvider;
