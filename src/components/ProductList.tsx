"use client";
import React from "react";
import { useShopContext } from "@/context/EcomerceContext";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { products, loading } = useShopContext();

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div className="bg-gray-50 py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
