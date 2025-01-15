import Cart from "@/components/cart/Cart";
import CartToggleButton from "@/components/cart/ToggleButton";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
   <>
   <CartToggleButton/>
   <Cart/>
   <ProductList/>
   </>
  );
}
