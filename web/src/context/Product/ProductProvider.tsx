import { useMemo, useState, ReactNode } from 'react';
import { Product } from '../../types/Product';
import { products as productsData } from '../../data/products';
import { ProductContext } from "./ProductContext";

export default function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[] | []>(productsData);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const addProduct = (newProduct: Product) => {
    console.log('Adicionando produto:', newProduct);
  };

  const editProduct = (productId: number) => {
    console.log('Editando produto com ID:', productId);
  }

  const deleteProducts = (productsId: number[]) => {
    console.log('Deletando produtos com ID:', productsId);
  };

  const updateProducts = () => {
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
    editProduct,
    deleteProducts,
    updateProducts
  }), [products, selectedProducts, selectAll]);

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};