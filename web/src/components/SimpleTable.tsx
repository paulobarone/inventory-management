import { useState } from 'react';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Button from './Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import useProduct from '../hooks/useProduct';

const SimpleTable = () => {
  const { products, selectedProducts, setSelectedProducts, selectAll, setSelectAll } = useProduct();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 10;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleCheckboxChange = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id: number) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedProducts(products.map((_, index) => index));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between overflow-x-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  className="form-checkbox cursor-pointer h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
              <th scope="col" className="px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th scope="col" className="px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoria
              </th>
              <th scope="col" className="px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço
              </th>
              <th scope="col" className="px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th scope="col" className="relative px-6 py-2 md:py-3">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProducts.map((product, index) => (
              <tr key={index} className={selectedProducts.includes(index) ? 'bg-rose-50' : ''}>
                <td className="px-6 py-2 md:py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="form-checkbox cursor-pointer h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    checked={selectedProducts.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td className="px-6 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                <td className="px-6 py-2 md:py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                <td className="px-6 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td className="px-6 py-2 md:py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                <td className="px-6 py-2 md:py-4 flex gap-2 whitespace-nowrap text-right text-sm font-medium">
                  <Button className="bg-rose-400"><DeleteOutlineIcon /></Button>
                  <Button className="bg-gray-200"><EditIcon /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Próxima
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{(currentPage - 1) * productsPerPage + 1}</span> até <span className="font-medium">{Math.min(currentPage * productsPerPage, products.length)}</span> de <span className="font-medium">{products.length}</span> resultados
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="relative disabled:opacity-50 cursor-pointer disabled:cursor-auto inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Anterior</span>
                <KeyboardArrowLeftIcon />
              </button>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                {currentPage}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="relative disabled:opacity-50 cursor-pointer disabled:cursor-auto inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Próxima</span>
                <KeyboardArrowRightIcon />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleTable;