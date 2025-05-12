import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "../types/Product";
import { DialogProps } from "../types/Dialog";
import useDialog from "../hooks/useDialog";

export default function ProductForm({ title, message }: DialogProps) {
  const productSchema = z.object({
    name: z.string()
      .nonempty("O nome é obrigatório")
      .max(50, "O nome deve ter no máximo 50 caracteres"),
    category: z.string()
      .nonempty("A categoria é obrigatória")
      .max(50, "A categoria deve ter no máximo 50 caracteres"),
    price: z.number()
      .positive("O preço deve ser maior que zero"),
    quantity: z.number()
      .positive("A quantidade deve ser maior que zero"),
  });

  const { register, formState: { errors } } = useForm<Product>({
    resolver: zodResolver(productSchema)
  })

  const { closeDialog } = useDialog();

  return (
    <div className="px-8 pt-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-600 mb-4">{message}</p>
      </div>
      <form className="flex flex-col gap-2" onSubmit={(e) => {e.preventDefault()}}>
        <div className="mb-4">
          <label htmlFor="name" className="block cursor-pointer text-gray-700 text-sm font-bold mb-2">
            Nome
          </label>
          <input
            {...register('name')}
            id="name"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name && <span className="text-red-500 text-xs italic">{errors.name.message}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block cursor-pointer text-gray-700 text-sm font-bold mb-2">
            Categoria
          </label>
          <input
            {...register('category')}
            id="category"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.category && <span className="text-red-500 text-xs italic">{errors.category.message}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block cursor-pointer text-gray-700 text-sm font-bold mb-2">
            Preço
          </label>
          <input
            {...register('price')}
            id="price"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.price && <span className="text-red-500 text-xs italic">{errors.price.message}</span>}
        </div>
        <div className="mb-6">
          <label htmlFor="quantity" className="block cursor-pointer text-gray-700 text-sm font-bold mb-2">
            Quantidade
          </label>
          <input
            {...register('quantity')}
            id="quantity"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.quantity && <span className="text-red-500 text-xs italic">{errors.quantity.message}</span>}
        </div>
        <div className="flex items-center justify-between">
          <button className="cursor-pointer bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={closeDialog}>Cancelar</button>
          <button className="cursor-pointer bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Salvar</button>
        </div>
      </form>
    </div>
  )
}