import { useContext } from 'react';
import { DialogContext } from '../context/Dialog/DialogContext';
import { DialogContextProps } from '../types/Dialog';

const useDialog = (): DialogContextProps => {
  return useContext(DialogContext);
};

export default useDialog;