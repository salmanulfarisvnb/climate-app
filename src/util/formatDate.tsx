import { format, fromUnixTime } from "date-fns";
export function formatTime(unixTimestamp: number) {
  const date = fromUnixTime(unixTimestamp);

  return format(date, "hh:mm a");
}
