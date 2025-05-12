import { AlertDialogContentProps } from "../types/Dialog";

export default function AlertDialogContent({ title, message, onCancel, onConfirm }: AlertDialogContentProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1>{title}</h1>
      <p>{message}</p>
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="btn">Cancelar</button>
        <button onClick={onConfirm} className="btn btn-danger">Confirmar</button>
      </div>
    </div>
  )
}