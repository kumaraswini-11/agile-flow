import {parseAsBoolean, useQueryState} from "nuqs";

export const useCreateProjectDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useQueryState(
    "new-project",
    parseAsBoolean.withDefault(false)
  );

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return {
    isDialogOpen,
    openDialog,
    closeDialog,
  };
};
