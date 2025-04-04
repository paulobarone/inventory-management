import { Product, ProductTableActions } from "../types/Product";
import { products as productsData } from "../data/products";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export default function useProductTableActions(): ProductTableActions {
  const { products, setProducts } = useContext(ProductContext);

  const deleteProducts = (ids: number[]) => {
    if(ids.length === 1) {
      // Remover um único produto
      console.log('Produto deletado');
    } else {
      // Remover múltiplos produtos
      console.log('Produtos deletados');
    }
  };

  const addProduct = (newProduct: Product) => {
    // Adicionar um produto
    console.log(`Produto adicionado: ${newProduct.name}`);
  };

  const editProduct = (productId: number) => {
    // Editar um produto
    console.log(`Produto editado: ${productId}`);
  };

  const updateProducts = () => {
    // Atualizar os produtos da lista
    setProducts(productsData);

    console.log(products);
    console.log('Produtos atualizados');
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