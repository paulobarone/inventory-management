export interface DialogContextProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: (() => void) | null;
  onCancel: (() => void) | null;
  confirmButtonText: string;
  cancelButtonText: string;
  openDialog: (config: DialogConfig) => void;
  closeDialog: () => void;
}

export interface DialogConfig {
  title: string;
  description: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export interface ConfirmationDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonText: string;
  cancelButtonText: string;
  onClose: () => void;
}