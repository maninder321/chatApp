import { fromZonedTime, toZonedTime } from "date-fns-tz";

// Function to convert GMT date-time string to local time zone
export function convertGMTToLocal(gmtDateTimeString: string): string {
  var gmtDate = new Date(gmtDateTimeString);
  var localTimeZoneOffset = new Date().getTimezoneOffset();

  gmtDate.setMinutes(gmtDate.getMinutes() - localTimeZoneOffset);

  // Example: Display the adjusted date in a specific format
  //   var localDateString = gmtDate.toLocaleString();

  var day = ("0" + gmtDate.getDate()).slice(-2);
  var month = ("0" + (gmtDate.getMonth() + 1)).slice(-2);
  var year = gmtDate.getFullYear().toString().slice(-2);
  var hours = ("0" + gmtDate.getHours()).slice(-2);
  var minutes = ("0" + gmtDate.getMinutes()).slice(-2);

  var localDateString = `${day}/${month}/${year} ${hours}:${minutes}`;

  return localDateString;
}
