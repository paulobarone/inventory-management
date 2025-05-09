import { Tooltip } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Button from "./components/Button";
import SimpleTable from "./components/SimpleTable";
import DialogProvider from "./context/DialogProvider";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProductContext } from "./context/ProductContext";
import { Product } from "./types/Product";
import { products as productsList } from "./data/products";

export default function App() {
  const [products, setProducts] = useState<Product[] | []>(productsList);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const contextValue = useMemo(() => ({ products, setProducts, selectedProducts, setSelectedProducts, selectAll, setSelectAll }), [products, selectedProducts, selectAll]);

  useEffect(() => {
    console.log("Products: ", products.length);
    console.log("Selected Products: ", selectedProducts.length);
    console.log("Select All: ", selectAll);
  }, [products, selectedProducts, selectAll]);

  return (
    <ProductContext.Provider value={contextValue}>
      <DialogProvider>
        <div className="bg-gray-100 rounded-lg w-full h-screen p-2 flex gap-4 flex-col justify-center">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl">Lista de Produtos</h1>
            <div className="flex items-center gap-4">
              <Tooltip title="Adicionar Produto">
                <Button className="bg-green-400">
                  <AddIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Deletar Produtos">
                <Button className="bg-rose-400" disabled={selectedProducts.length === 0}>
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </div>
          </div>
          <SimpleTable />
        </div>
      </DialogProvider>
    </ProductContext.Provider>
  );
}