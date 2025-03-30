import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

import {AUTH_ROUTES} from "@/routes/routes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAuthRoute = (pathname: string): boolean => {
  return Object.values(AUTH_ROUTES).includes(pathname);
};
