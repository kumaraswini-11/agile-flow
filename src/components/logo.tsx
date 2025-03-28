import {AudioWaveform} from "lucide-react";
import {Link, LinkProps} from "react-router";

interface LogoProps extends LinkProps {
  url?: string;
}

export const Logo: React.FC<LogoProps> = ({url = "/", ...props}) => {
  return (
    <div className="flex items-center justify-center sm:justify-start">
      <Link
        {...props}
        to={url}
        aria-label="Home">
        <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
          <AudioWaveform className="size-4" />
        </div>
      </Link>
    </div>
  );
};
