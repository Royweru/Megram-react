import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


import { formatDistanceToNow } from 'date-fns';

export const formatDateDistance = (dateString:string):string => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

