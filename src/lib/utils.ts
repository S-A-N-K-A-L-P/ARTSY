import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { headers } from "next/headers";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isMobile = () =>
  typeof window !== "undefined" &&
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const getIsMobileServer = async () => {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  return /iPhone|iPad|iPod|Android/i.test(userAgent);
};
