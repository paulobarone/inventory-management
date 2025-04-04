import React, { useState, useMemo } from "react";
import { Product, ProductProviderProps } from "../types/Product";
import { ProductContext } from "./ProductContext";

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[] | []>([]);

  const contextValue = useMemo(() => ({ products, setProducts }), [products]);

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;