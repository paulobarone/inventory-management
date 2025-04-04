export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface ProductProviderProps {
  children: React.ReactNode;
}

export interface ProductContextProps {
  products: Product[] | [];
  setProducts: (products: Product[] | []) => void;
}

export interface ProductTableActions {
  products: Product[] | [];
  setProducts: (products: Product[] | []) => void;
  deleteProducts: (productsIds: number[]) => void;
  addProduct: (newProduct: Product) => void;
  editProduct: (productId: number) => void;
  updateProducts: () => void;
}