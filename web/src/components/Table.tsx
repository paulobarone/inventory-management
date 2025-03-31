import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Button from './Button';

export default function Table() {
  return (
    <div className="bg-white rounded-lg w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-gray-800">Produtos</h1>
        <div className="flex items-center gap-2">
          <Button className='bg-rose-400'><AddIcon /> Adicionar</Button>
          <Button disabled><DeleteOutlineIcon /> Deletar</Button>
          <Button><FilterAltOutlinedIcon /> Filtros</Button>
        </div>
      </div>
    </div>
  )
}