import { createContext } from "react";
import { DialogContextProps } from "../../types/Dialog";

export const DialogContext = createContext<DialogContextProps>({
  open: false,
  dialogType: 'warning',
  openDialog: () => {},
  closeDialog: () => {}
})