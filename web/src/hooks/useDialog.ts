import { DialogContextProps } from "../types/Dialog";
import { useContext } from "react";
import { DialogContext } from "../context/Dialog/DialogContext";

const useDialog = (): DialogContextProps => {
  return useContext(DialogContext);
};

export default useDialog;