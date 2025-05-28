import { DialogProps } from "../types/Dialog";
import Select from "react-select";
import { categories } from "../data/categories";
import { CurrencyInput } from "react-currency-mask";
import useDialog from "../hooks/useDialog";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useProduct from "../hooks/useProduct";

const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  price: z.number().min(0.01, "Preço é obrigatório"),
  quantity: z.coerce
    .number()
    .int("Quantidade deve ser um número inteiro")
    .min(1, "Quantidade deve ser maior que 0"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductForm({ title, message }: DialogProps) {
  const { closeDialog } = useDialog();
  const { addProduct } = useProduct();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      quantity: 1,
    },
  });

  const onSubmit = (data: ProductFormData) => {
    addProduct(data);
    closeDialog();
  };

  return (
    <div className="px-8 pt-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-600 mb-4">{message}</p>
      </div>
      <form
        className="flex flex-col gap-2"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="name"
            className="inline-block cursor-pointer text-gray-700 text-sm font-bold mb-2"
          >
            Nome
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Digite o nome do produto"
                id="name"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="category"
            className="inline-block cursor-pointer text-gray-700 text-sm font-bold mb-2"
          >
            Categoria
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                inputId="category"
                placeholder="Selecione uma categoria"
                noOptionsMessage={() => "Categoria não encontrada"}
                options={categories}
                classNamePrefix="react-select"
                isClearable
                styles={{
                  control: (base) => ({
                    ...base,
                    boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1)",
                    borderColor: "#364153",
                    borderRadius: 6,
                    minHeight: 40,
                    paddingLeft: 0,
                    backgroundColor: "#fff",
                    fontSize: "1rem",
                    fontWeight: 400,
                    color: "#364153",
                    ":hover": {
                      borderColor: "#364153",
                    },
                    cursor: "text",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 50,
                  }),
                  menuList: (base) => ({
                    ...base,
                    maxHeight: 150,
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#9ca3af",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "#364153",
                  }),
                  input: (base) => ({
                    ...base,
                    color: "#364153",
                  }),
                  option: (base) => ({
                    ...base,
                    backgroundColor: "transparent",
                    color: "#364153",
                    cursor: "pointer",
                    ":hover": {
                      backgroundColor: "#f3f4f6",
                      color: "#364153",
                    },
                    ":active": {
                      backgroundColor: "#e5e7eb",
                      color: "#364153",
                    },
                  }),
                  clearIndicator: (base) => ({
                    ...base,
                    color: "#9ca3af",
                    ":hover": { color: "#ef4444" },
                    cursor: "pointer",
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    color: "#9ca3af",
                    cursor: "pointer",
                  }),
                }}
                onChange={(option) => field.onChange(option?.value ?? "")}
                value={categories.find((c) => c.value === field.value) || null}
              />
            )}
          />
          {errors.category && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="price"
            className="inline-block cursor-pointer text-gray-700 text-sm font-bold mb-2"
          >
            Preço
          </label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                value={field.value}
                onChangeValue={(_, originalValue) =>
                  field.onChange(Number(originalValue) || 0)
                }
                defaultValue={"R$ 0,00"}
                InputElement={
                  <input
                    placeholder="Digite o preço"
                    id="price"
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                }
              />
            )}
          />
          {errors.price && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.price.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="inline-block cursor-pointer text-gray-700 text-sm font-bold mb-2"
          >
            Quantidade
          </label>
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Digite a quantidade"
                id="quantity"
                min={1}
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          />
          {errors.quantity && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="cursor-pointer bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={closeDialog}
          >
            Cancelar
          </button>
          <button
            className="cursor-pointer bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
