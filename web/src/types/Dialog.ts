export interface AlertDialogContentProps {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}