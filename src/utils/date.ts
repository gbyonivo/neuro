import { format } from "date-fns";

const dateCache: Record<string, string> = {};

export const getDate = (dateString: string) => {
  try {
    if (dateCache[dateString]) {
      return dateCache[dateString];
    }
    const date = format(dateString, "yyyy-MM-dd HH:mm:ss");
    dateCache[dateString] = date;
    return date;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: unknown) {
    return "Invalid date";
  }
};
