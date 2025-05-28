export interface Product {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface ProductContextProps {
  products: Product[] | [];
  setProducts: (products: Product[] | []) => void;
  selectedProducts: number[];
  setSelectedProducts: (selectedProducts: number[]) => void;
  selectAll: boolean;
  setSelectAll: (selectAll: boolean) => void;
  updateProducts: () => void;
  addProduct: (newProduct: Product) => void;
  editProduct: (productId: number, editProduct: Product) => void;
  deleteProducts: (productsId: number[]) => void;
}

export interface ProductTableActions {
  products: Product[] | [];
  setProducts: (products: Product[] | []) => void;
  deleteProducts: (productsIds: number[]) => void;
  addProduct: (newProduct: Product) => void;
  editProduct: (productId: number) => void;
  updateProducts: () => void;
}