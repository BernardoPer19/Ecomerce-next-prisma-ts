import { useShopContext } from "@/context/EcomerceContext";
import { useCart } from "@/hooks/useCart";
import { CartType, ProductsTypes } from "@/types/ProductType";
import Link from "next/link";

interface ProductCardProps {
  product: ProductsTypes;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useShopContext();

  const handleCart = () => {
    const cartItem: CartType = {
      ...product,
      quantity: 1
    }
    addToCart(cartItem)
    console.log("se añadio" + cartItem);
    
  };

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-56 object-cover transition-transform transform hover:scale-105 duration-300"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h2>
        <p className="text-lg font-bold text-blue-600 mt-3">${product.price}</p>
        <div className="flex justify-center gap-3 mt-3 items-center">
          <button
          onClick={handleCart}
            className="w-[60%] bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
