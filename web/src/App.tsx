import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import Button from "./components/Button";
import { Product } from "./types/Product";

export default function App() {
  const [products] = useState<Product[]>([
    { id: 1, name: "Produto 1", price: 10, quantity: 5 },
    { id: 2, name: "Produto 2", price: 20, quantity: 3 },
    { id: 3, name: "Produto 3", price: 15, quantity: 8 },
  ]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const handleSelectedAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedProducts(products.map((item) => item.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelected = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (event.target.checked) {
      setSelectedProducts((prev) => [...prev, id]);
    } else {
      setSelectedProducts((prev) => prev.filter((item) => item !== id));
    }
  };

  return (
    <div className="h-screen p-2">
      <div className="bg-white rounded-lg w-full h-full p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl text-gray-800">Produtos</h1>
          <div className="flex items-center gap-2">
            <Button className="bg-rose-400"> <AddIcon /> Adicionar </Button>
            <Button disabled={selectedProducts.length == 0}> <DeleteOutlineIcon /> Deletar </Button>
            <Button> <FilterAltOutlinedIcon /> Filtros </Button>
          </div>
        </div>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                    onChange={(event) => handleSelectedAll(event)}
                    checked={selectedProducts.length === products.length && selectedProducts.length > 0}
                  />
                </TableCell>
                <TableCell align="left">Nome</TableCell>
                <TableCell align="left">Preço</TableCell>
                <TableCell align="left">Quantidade</TableCell>
                <TableCell align="right">Opções</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  className="hover:bg-gray-100 transition-colors duration-200"
                >
                  <TableCell align="left">
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
                      onChange={(event) => handleSelected(event, product.id)}
                      checked={selectedProducts.includes(product.id)}
                    />
                  </TableCell>
                  <TableCell align="left">{product.name}</TableCell>
                  <TableCell align="left">{`R$ ${product.price.toFixed(2)}`}</TableCell>
                  <TableCell align="left">{product.quantity}</TableCell>
                  <TableCell
                    sx={{ display: "flex", flex: "row", gap: "8px" }}
                    align="right"
                  >
                    <Button className="bg-rose-400"><DeleteOutlineIcon /></Button>
                    <Button className="bg-gray-200"><EditIcon /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
