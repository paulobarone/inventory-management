import { ReactNode, useMemo, useState } from "react";
import { DialogContext } from "./DialogContext";
import { DialogConfig, DialogType } from "../../types/Dialog";
import { Dialog } from "@mui/material";
import AlertDialogContent from "../../components/AlertDialogContent";
import FormDialogContent from "../../components/FormDialogContent";

export default function DialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>('warning');
  const [title, setTitle] = useState<string>('Atenção');
  const [message, setMessage] = useState<string>('Você tem certeza que deseja continuar?');

  const openDialog = (config: DialogConfig) => {
    setDialogType(config.type);
    setTitle(config.title);
    setMessage(config.message);

    setTimeout(() => {
      setOpen(true);
    }, 250);
  };

  const closeDialog = () => {
    setOpen(false);

    setTimeout(() => {
      setDialogType('warning');
      setTitle('Atenção');
      setMessage('Você tem certeza que deseja continuar?');
    }, 250);
  }

  const contextValue = useMemo(() => ({
    open,
    title,
    setTitle,
    message,
    setMessage,
    dialogType,
    openDialog,
    closeDialog
  }), [open, dialogType, title, message]);

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      <Dialog
        open={open}
        onClose={closeDialog}
      >
        {dialogType === 'warning' && <AlertDialogContent title={title} message={message} />}
        {dialogType === 'form' && <FormDialogContent title={title} message={message} />}
      </Dialog>
    </DialogContext.Provider>
  );
}