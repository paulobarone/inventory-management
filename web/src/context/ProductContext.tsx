import { createContext } from "react";
import { ProductContextProps } from "../types/Product";

export const ProductContext = createContext<ProductContextProps>({
  products: [],
  setProducts: () => {},
  selectedProducts: [],
  setSelectedProducts: () => {},
  selectAll: false,
  setSelectAll: () => {},
});
