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