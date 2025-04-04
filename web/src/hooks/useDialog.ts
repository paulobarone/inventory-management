import { useContext } from 'react';
import { DialogContext } from '../context/dialogContext';
import { DialogContextProps } from '../types/Dialog';

const useDialog = (): DialogContextProps => {
  return useContext(DialogContext);
};

export default useDialog;