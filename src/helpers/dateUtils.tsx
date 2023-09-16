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
