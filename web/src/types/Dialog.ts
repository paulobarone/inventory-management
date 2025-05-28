export type DialogType = "warning" | "form";

export interface DialogProps {
  title: string;
  message: string;
}

export interface DialogConfig {
  type: DialogType;
  title: string;
  message: string;
}

export interface DialogContextProps {
  open: boolean;
  dialogType: DialogType;
  openDialog: (config: DialogConfig) => void;
  closeDialog: () => void;
}

export interface DialogFormFields {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface DialogFormErrors {
  name: string | null;
  category: string | null;
  price: string | null;
  quantity: string | null;
}