import { DialogProps } from "../types/Dialog";

export default function AlertDialogContent({ title, message }: DialogProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1>{title}</h1>
      <p>{message}</p>
      <div className="flex justify-end gap-2">
        <button className="btn">Cancelar</button>
        <button className="btn btn-danger">Confirmar</button>
      </div>
    </div>
  )
}