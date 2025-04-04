import { createContext } from 'react';
import { DialogContextProps } from '../types/Dialog';

export const DialogContext = createContext<DialogContextProps>({
  isOpen: false,
  title: '',
  description: '',
  onConfirm: null,
  onCancel: null,
  confirmButtonText: 'Confirmar',
  cancelButtonText: 'Cancelar',
  openDialog: () => {},
  closeDialog: () => {},
});