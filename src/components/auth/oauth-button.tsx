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
  ariaLabel: string;
}

export const OAuthButton = ({
  label = "Sign in",
  provider,
  icon: Icon,
  redirectURL,
  handleOnClick,
  className,
  disabled,
  ariaLabel,

  ...props
}: Partial<OAuthButtonProps> & {className?: string}) => {
  const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = e => {
    if (handleOnClick) {
      handleOnClick(e);
    } else if (redirectURL) {
      window.location.href = redirectURL;
    }
  };

  return (
    <Button
      onClick={onClickHandler}
      className={cn("flex items-center justify-center gap-3", className)}
      variant="outline"
      size="lg"
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}>
      {Icon && <Icon className="size-5 text-gray-900" />}
      <span className="capitalize">{label ?? provider}</span>
    </Button>
  );
};
