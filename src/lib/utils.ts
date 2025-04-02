import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

// import {AUTH_ROUTES} from "@/routes/routes-paths";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const isAuthRoute = (pathname: string): boolean => {
//   return AUTH_ROUTES.includes(pathname);
// };
