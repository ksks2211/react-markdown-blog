import { parseISO, format, formatDistanceToNow } from "date-fns";

export function formatDate(date: string) {
  const parsedDate = parseISO(date);
  return format(parsedDate, "LLL d, yyyy");
}

export function formatDateFromNow(date: string) {
  const parsedDate = parseISO(date);
  const formattedDate = formatDistanceToNow(parsedDate);
  return `${formattedDate} ago`;
}

export function getCurrentDateInfo() {
  const now = new Date();

  return {
    year: now.getFullYear(),
    // Adding 1 to make the month more human-readable (1-12 instead of 0-11)
    month: now.getMonth() + 1,
    dateOfMonth: now.getDate(),
  };
}
