import {useState} from "react";
import {parseAsBoolean, useQueryState} from "nuqs";

export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useQueryState("confirm-dialog", parseAsBoolean.withDefault(false));
  const [dialogContext, setDialogContext] = useState<unknown>(null);

  const openDialog = (contextData?: unknown) => {
    setDialogContext(contextData ?? null);
    void setIsOpen(true);
  };

  const closeDialog = () => {
    setDialogContext(null);
    void setIsOpen(false);
  };

  return {
    isOpen,
    dialogContext,
    openDialog,
    closeDialog,
  };
};
