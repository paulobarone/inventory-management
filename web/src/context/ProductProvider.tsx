import React, { useState, useMemo, useEffect } from "react";
import { Product, ProductProviderProps } from "../types/Product";
import { ProductContext } from "./ProductContext";
import { products as productsList } from "../data/products";

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[] | []>(productsList);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  useEffect(() => {
    console.log("Products: ", products);
    console.log("Selected Products: ", selectedProducts);
    console.log("Select All: ", selectAll);
  }, [products, selectedProducts, selectAll]);

  const contextValue = useMemo(() => ({ products, setProducts, selectedProducts, setSelectedProducts, selectAll, setSelectAll }), [products, selectedProducts, selectAll]);

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;