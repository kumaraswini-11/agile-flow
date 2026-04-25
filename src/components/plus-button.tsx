import {useState} from "react";
import {Plus} from "lucide-react";

import {Button} from "./ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "./ui/tooltip";

export const PlusButton = ({label}) => {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="ml-auto rounded-full"
            onClick={() => setOpen(true)}>
            <Plus className="size-4" />
            <span className="sr-only">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
