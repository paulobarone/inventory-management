import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import { visuallyHidden } from '@mui/utils';
import Button from './Button';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useMemo, useState } from 'react';
import useDialog from '../hooks/useDialog';
import useProductTableActions from '../hooks/useProductTableActions';
import { Product } from '../types/Product';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends Exclude<keyof Product, 'option'>>(
  order: Order,
  orderBy: Key,
): (a: Product, b: Product) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Product;
  label?: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Produto',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Categoria',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Preço',
  },
  {
    id: 'quantity',
    numeric: true,
    disablePadding: false,
    label: 'Quantidade',
  }
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Product) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Product) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id === 'name' ? 'left' : 'right'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>
          
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  readonly selected: number[];
}

const EnhancedTableToolbar = ({numSelected, selected}: EnhancedTableToolbarProps) => {
  const { addProduct, deleteProducts, updateProducts } = useProductTableActions();
  const { openDialog, closeDialog } = useDialog();

  const addProductDialog = (product: Product) => {
    openDialog({
      title: 'Confirmar Adição',
      description: 'Deseja adicionar este item?',
      confirmButtonText: 'Adicionar',
      cancelButtonText: 'Cancelar',
      onConfirm: () => {
        addProduct(product);
        closeDialog();
        console.log('Item adicionado');
      },
      onCancel: () => {
        closeDialog();
        console.log('Adição cancelada');
      },
    });
  };

  const removeProductDialog = (productsIds: number[]) => {
    const isPlural = productsIds.length > 1;

    openDialog({
      title: 'Confirmar Exclusão',
      description: isPlural ? 'Tem certeza que deseja apagar este item?' : `Tem certeza que deseja apagar todos os ${productsIds.length}?`,
      confirmButtonText: 'Apagar',
      cancelButtonText: 'Cancelar',
      onConfirm: () => {
        deleteProducts(productsIds);
        closeDialog();
        console.log('Item(s) excluído(s)');
      },
      onCancel: () => {
        closeDialog();
        console.log('Exclusão cancelada');
      },
    });
  };

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected > 1 ? `${numSelected} produtos selecionados` : `${numSelected} produto selecionado`}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Produtos
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Deletar" onClick={() => removeProductDialog(selected)}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div className='flex gap-2'>
          <Tooltip title="Atualizar" onClick={updateProducts}>
            <IconButton>
              <CachedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Adicionar Produto">
            <IconButton>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </Toolbar>
  );
}
export default function EnhancedTable() {
  const { products } = useProductTableActions();
  const [rows, setRows] = useState<Product[]>([]);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Product>('name');
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if(products.length > 0) {
      setRows(
        products.map((product) => ({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          quantity: product.quantity,
          option: (
            <div className='flex gap-2 justify-end'>
              <Button className="bg-rose-400"><DeleteOutlineIcon /></Button>
              <Button className="bg-gray-200"><EditIcon /></Button>
            </div>
          ),
        }))
      );
    } else {
      console.log('Nenhum produto encontrado');
    }
  }, [products])

  useEffect(() => {
    console.log(rows);
  }, [rows])

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Product,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '90%', maxWidth: '1500px' }}>
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length} selected={selected} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.length >= 1 && visibleRows.map((row) => {
                const isItemSelected = selected.includes(row.id);

                return (
                  <TableRow
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row.id)}
                        checked={isItemSelected}
                      />
                    </TableCell>
                    <TableCell
                      sx={{ padding: '0px' }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align='right'>
                      {row.category}
                    </TableCell>
                    <TableCell align="right">
                      {row.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">
                      <div className='flex gap-2 justify-end'>
                        <Button className="bg-rose-400"><DeleteOutlineIcon /></Button>
                        <Button className="bg-gray-200"><EditIcon /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}