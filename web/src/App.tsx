import SimpleTable from "./components/SimpleTable";
import TopHeader from "./components/TopHeader";
import ProductProvider from "./context/Product/ProductProvider";

export default function App() {
  return (
    <ProductProvider>
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 rounded-lg w-full max-w-[1600px] h-screen p-2 flex gap-4 flex-col justify-center">
          <TopHeader />
          <SimpleTable />
        </div>
      </div>
    </ProductProvider>
  );
}