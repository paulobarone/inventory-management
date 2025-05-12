import { IconButton, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import useProduct from "../hooks/useProduct";
import useDialog from "../hooks/useDialog";
import { DialogConfig } from "../types/Dialog";

export default function TopHeader() {
  const { selectedProducts, updateProducts, deleteProducts } = useProduct();
  const { openDialog } = useDialog();

  const addProductConfig: DialogConfig = {
    type: 'form',
    title: 'Adicionar Produto',
    message: 'Preencha os campos abaixo para adicionar um novo produto.',
  }

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
          <IconButton onClick={() => openDialog(addProductConfig)}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Deletar Produtos">
          <IconButton onClick={() => deleteProducts(selectedProducts)} disabled={selectedProducts.length < 2}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}