import { Product, ProductTableActions } from "../types/Product";
import { products as productsData } from "../data/products";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export default function useProductTableActions(): ProductTableActions {
  const { products, setProducts } = useContext(ProductContext);

  const deleteProducts = (ids: number[]) => {
    if(ids.length === 1) {
      console.log('Produto deletado');
    } else {
      console.log('Produtos deletados');
    }
  };

  const addProduct = (newProduct: Product) => {
    console.log(`Produto adicionado: ${newProduct.name}`);
  };

  const editProduct = (productId: number) => {
    console.log(`Produto editado: ${productId}`);
  };

  const updateProducts = () => {
    setProducts(productsData);
  }

  return {
    products, 
    setProducts,
    deleteProducts,
    addProduct,
    editProduct,
    updateProducts
  };
};