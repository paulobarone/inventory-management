import { IconButton, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useContext } from "react";
import { ProductContext } from "../context/Product/ProductContext";

export default function TopHeader() {
  const { selectedProducts, updateProducts } = useContext(ProductContext);

  return (
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
          <IconButton disabled={selectedProducts.length < 2}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}