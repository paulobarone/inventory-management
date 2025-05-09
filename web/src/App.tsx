import SimpleTable from "./components/SimpleTable";
import DialogProvider from "./context/DialogProvider";
import ProductProvider from "./context/ProductProvider";
import { products } from "./data/products";

export default function App() {
  return (
    <DialogProvider>
      <div className="h-screen p-2">
        <div className="bg-gray-100 rounded-lg w-full h-full p-4 flex justify-center">
          <ProductProvider>
            <SimpleTable products={products} />
          </ProductProvider>
        </div>
      </div>
    </DialogProvider>
  );
}
