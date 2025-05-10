import { ProductContextProps } from "../types/Product";
import { useContext } from "react";
import { ProductContext } from "../context/Product/ProductContext";

const useProduct = (): ProductContextProps => {
  return useContext(ProductContext);
};

export default useProduct;