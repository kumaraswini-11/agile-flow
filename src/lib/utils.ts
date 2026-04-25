import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUserInitials = (name?: string): string => {
  if (!name) return "";
  const nameParts = name.split(" ");
  return `${nameParts[0]?.[0] || ""}${nameParts[1]?.[0] || ""}`.toUpperCase();
};

// export const isAuthRoute = (pathname: string): boolean => {
//   return AUTH_ROUTES.includes(pathname);
// };
