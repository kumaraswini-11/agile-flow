import {AudioWaveform} from "lucide-react";
import {Link, LinkProps} from "react-router";

interface AppLogoProps extends Omit<LinkProps, "to"> {
  url?: string;
  text?: string;
  flag?: boolean;
  iconSize?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  url = "/",
  text = "Agile Flow",
  flag = true,
  iconSize = "4",
  ...props
}) => {
  return (
    <Link
      {...props}
      to={url}
      aria-label="Home">
      <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
        <AudioWaveform className={`size-${iconSize}`} />
      </div>
      {flag && <span>{text}</span>}
    </Link>
  );
};
