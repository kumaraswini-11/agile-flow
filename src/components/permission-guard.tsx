import React from "react";

import {PermissionType} from "@/constants";
import useAuthStore from "@/store/user";

interface PermissionsGuardProps {
  requiredPermission: PermissionType;
  children: React.ReactNode;
  showMessage?: boolean;
}

export const PermissionsGuard: React.FC<PermissionsGuardProps> = ({
  requiredPermission,
  showMessage = false,
  children,
}) => {
  const {hasPermission} = useAuthStore();

  if (!hasPermission(requiredPermission)) {
    return (
      showMessage && (
        <div
          role="alert"
          className="text-muted-foreground w-full pt-3 text-center text-sm italic">
          You do not have the permission to view this.
        </div>
      )
    );
  }

  return <>{children}</>;
};
