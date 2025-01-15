export interface ProductsTypes {
  id: number;
  name: string;
  description: string;
  img: string;
  price: number;
}

export interface CartType extends ProductsTypes {
  quantity: number;
}
