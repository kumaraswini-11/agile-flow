import React from "react";
import {IconType} from "react-icons";
import {LucideIcon} from "lucide-react";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

interface OAuthButtonProps {
  label: string;
  provider: "google" | "github";
  icon: IconType | LucideIcon;
  redirectURL: string;
  handleOnClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  "aria-label": string;
}

export const OAuthButton = ({
  label = "Sign in",
  provider,
  icon: Icon,
  redirectURL,
  handleOnClick,
  className,
  disabled,

  ...props
}: Partial<OAuthButtonProps> & {className?: string}) => {
  const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = e => {
    if (handleOnClick) {
      handleOnClick(e);
    } else if (redirectURL) {
      window.location.href = redirectURL;
    }
  };

  const providerName = provider ? provider.charAt(0).toUpperCase() + provider.slice(1) : "";
  const ariaLabel = `${label} with ${providerName}`;

  return (
    <Button
      onClick={onClickHandler}
      className={cn("flex items-center justify-center gap-2", className)}
      variant="outline"
      size="lg"
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}>
      {Icon && <Icon className="h-6 w-6 text-gray-800" />}
      {label} with {providerName}
    </Button>
  );
};
