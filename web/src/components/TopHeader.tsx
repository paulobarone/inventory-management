export default function TopHeader() {
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
  )
}