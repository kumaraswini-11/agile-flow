import {Loader2} from "lucide-react";

interface LoaderProps {
  size: number;
  color: string;
  message: string;
}

export default function Loader({
  size = 24,
  color = "currentColor",
  message = "Loading...",
}: Partial<LoaderProps>) {
  return (
    <div
      className="flex h-full items-center justify-center pt-8"
      aria-live="polite">
      <Loader2
        className="mr-3 size-5 animate-spin"
        width={size}
        height={size}
        stroke={color}
      />
      <span className="text-foreground ml-2">{message}</span>
    </div>
  );
}
