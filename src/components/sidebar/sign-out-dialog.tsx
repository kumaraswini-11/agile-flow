import {Loader} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useSignOutMutation} from "@/hooks/use-auth";

interface SignOutDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignOutDialog: React.FC<SignOutDialogProps> = ({isOpen, setIsOpen}) => {
  const {mutate: signOut, isPending} = useSignOutMutation();

  const handleSignOut = () => {
    if (isPending) return;
    signOut();

    // TODO: will it work or not? onSuccess is alredy writen
    setIsOpen(false); // Close the dialog after the sign-out request
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign out</DialogTitle>
          <DialogDescription>
            Signing out will end your current session. You'll need to sign in again to access your
            account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row gap-2 sm:justify-end">
          <Button
            variant="outline"
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 sm:flex-initial">
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            type="button"
            onClick={handleSignOut}
            className="flex-1 sm:flex-initial">
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader className="size-4 animate-spin" />
                <span>Signing out...</span>
              </div>
            ) : (
              "Sign out"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
