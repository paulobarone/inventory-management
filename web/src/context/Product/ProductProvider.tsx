import React, { useMemo, useState } from 'react';
import { Product, ProductProviderProps } from '../../types/Product';
import { products as productsData } from '../../data/products';
import { ProductContext } from "./ProductContext";

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[] | []>(productsData);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const addProduct = (newProduct: Product) => {
    console.log('Adicionando produto:', newProduct);
  };

  const deleteProducts = (productsId: number[]) => {
    console.log('Deletando produtos com ID:', productsId);
  };

  const updateProducts = () => {
    console.log('Atualizando produtos');
    setProducts(productsData);
  };

  const contextValue = useMemo(() => ({
    products,
    setProducts,
    selectedProducts,
    setSelectedProducts,
    selectAll,
    setSelectAll,
    addProduct,
    deleteProducts,
    updateProducts
  }), [products, selectedProducts, selectAll]);

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;