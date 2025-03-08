import { format, fromUnixTime } from "date-fns";
export function formatTime(
  unixTimestamp: number,
  outputFormat: string = "hh:mm a"
) {
  const date = fromUnixTime(unixTimestamp);

  return format(date, outputFormat);
}

export function formatDate(date: Date, dateFormat: string = "hh:mm a") {
  const formattedDate = format(date, dateFormat);
  return formattedDate;
}
