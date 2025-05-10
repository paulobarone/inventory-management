import { IconButton, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";
import SimpleTable from "./components/SimpleTable";
import DialogProvider from "./context/DialogProvider";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ProductContext } from "./context/ProductContext";
import { Product } from "./types/Product";
import { products as productsData } from "./data/products";
import useProductTableActions from "./hooks/useProductTableActions";

export default function App() {
  const [products, setProducts] = useState<Product[] | []>(productsData);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const {updateProducts} = useProductTableActions();

  const contextValue = useMemo(() => ({ products, setProducts, selectedProducts, setSelectedProducts, selectAll, setSelectAll }), [products, selectedProducts, selectAll]);

  return (
    <ProductContext.Provider value={contextValue}>
      <DialogProvider>
        <div className="flex items-center justify-center">
          <div className="bg-gray-100 rounded-lg w-full max-w-[1600px] h-screen p-2 flex gap-4 flex-col justify-center">
            <div className="flex justify-between items-center p-4">
              <h1 className="text-2xl">Lista de Produtos</h1>
              <div className="flex items-center gap-4">
                <Tooltip title="Atualizar Produtos">
                  <IconButton onClick={updateProducts}>
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Adicionar Produto">
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Deletar Produtos">
                  <IconButton disabled={selectedProducts.length === 0}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <SimpleTable />
          </div>
        </div>
      </DialogProvider>
    </ProductContext.Provider>
  );
}