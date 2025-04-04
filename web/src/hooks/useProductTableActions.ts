import { Product } from "../types/Product";
import { products as productsData } from "../data/products";
import { useState } from "react";

interface ProductTableActions {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  deleteProducts: (productsIds: number[]) => void;
  addProduct: (newProduct: Product) => void;
  editProduct: (productId: number) => void;
  updateProducts: () => void;
}

export default function useProductTableActions(): ProductTableActions {
  const [products, setProducts] = useState<Product[]>([]);

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