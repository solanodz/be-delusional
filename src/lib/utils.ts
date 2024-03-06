import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

  // Función para formatear la fecha
  export const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date
    );
    const day = new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(
      date
    );
    const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
      date
    );
    const hour = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      hour12: false,
    }).format(date);
    const minute = new Intl.DateTimeFormat("en-US", {
      minute: "2-digit",
    }).format(date);

    return `${month} ${day} ${year}, ${hour}:${minute}`;
  };