import React, { useMemo, useState } from 'react';
import { Product, ProductProviderProps } from '../types/Product';
import { ProductContext } from './ProductContext';
import { products as productsData } from '../data/products';

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[] | []>(productsData);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const contextValue = useMemo(() => ({ products, setProducts, selectedProducts, setSelectedProducts, selectAll, setSelectAll }), [products, selectedProducts, selectAll]);

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;