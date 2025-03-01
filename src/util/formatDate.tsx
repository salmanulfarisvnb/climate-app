import { format, fromUnixTime } from "date-fns";
export function formatTime(
  unixTimestamp: number,
  outputFormat: string = "hh:mm a"
) {
  const date = fromUnixTime(unixTimestamp);

  return format(date, outputFormat);
}
