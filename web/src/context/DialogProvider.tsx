import React, { useState, useCallback, useMemo } from 'react';
import { DialogContext } from './DialogContext';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { DialogConfig, DialogContextProps, DialogProviderProps } from '../types/Dialog';

const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void) | null>(null);
  const [onCancelCallback, setOnCancelCallback] = useState<(() => void) | null>(null);
  const [confirmButtonText, setConfirmButtonText] = useState('Confirmar');
  const [cancelButtonText, setCancelButtonText] = useState('Cancelar');

  const openDialog = useCallback((config: DialogConfig) => {
    setTitle(config.title);
    setDescription(config.description);
    setOnConfirmCallback(config.onConfirm || null);
    setOnCancelCallback(config.onCancel || null);
    setConfirmButtonText(config.confirmButtonText ?? 'Confirmar');
    setCancelButtonText(config.cancelButtonText ?? 'Cancelar');
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setTitle('');
    setDescription('');
    setOnConfirmCallback(null);
    setOnCancelCallback(null);
    setConfirmButtonText('Confirmar');
    setCancelButtonText('Cancelar');
  }, []);

  const handleConfirm = useCallback(() => {
    if (onConfirmCallback) {
      onConfirmCallback();
    }
    closeDialog();
  }, [onConfirmCallback, closeDialog]);

  const handleCancel = useCallback(() => {
    if (onCancelCallback) {
      onCancelCallback();
    }
    closeDialog();
  }, [onCancelCallback, closeDialog]);

  const contextValue: DialogContextProps = useMemo(() => ({
    isOpen,
    title,
    description,
    onConfirm: handleConfirm,
    onCancel: handleCancel,
    confirmButtonText,
    cancelButtonText,
    openDialog,
    closeDialog
  }), [isOpen, title, description, handleConfirm, handleCancel, confirmButtonText, cancelButtonText, openDialog, closeDialog]);

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      {isOpen && (
        <ConfirmationDialog
          title={title}
          description={description}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          confirmButtonText={confirmButtonText}
          cancelButtonText={cancelButtonText}
          onClose={closeDialog}
        />
      )}
    </DialogContext.Provider>
  );
};

export default DialogProvider;