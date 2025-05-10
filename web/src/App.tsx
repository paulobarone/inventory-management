import { useMemo, useState } from "react";
import SimpleTable from "./components/SimpleTable";
import DialogProvider from "./context/DialogProvider";
import { ProductContext } from "./context/ProductContext";
import { Product } from "./types/Product";
import { products as productsData } from "./data/products";
import TopHeader from "./components/TopHeader";

export default function App() {
  const [products, setProducts] = useState<Product[] | []>(productsData);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const contextValue = useMemo(() => ({ products, setProducts, selectedProducts, setSelectedProducts, selectAll, setSelectAll }), [products, selectedProducts, selectAll]);

  return (
    <ProductContext.Provider value={contextValue}>
      <DialogProvider>
        <div className="flex items-center justify-center">
          <div className="bg-gray-100 rounded-lg w-full max-w-[1600px] h-screen p-2 flex gap-4 flex-col justify-center">
            <TopHeader />
            <SimpleTable />
          </div>
        </div>
      </DialogProvider>
    </ProductContext.Provider>
  );
}