export const formatDate = (dateTime) => {
  const daysOfWeek = [
    "Zondag",
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
    "Zaterdag",
  ];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const date = new Date(dateTime);
  const dayOfWeekIndex = date.getDay();
  const day = date.getDate();
  const monthIndex = date.getMonth();

  return `${daysOfWeek[dayOfWeekIndex]} ${day} ${months[monthIndex]}`;
};

export const formatTime = (dateTime) => {
  const date = new Date(dateTime);

  // Get the current hour and adjust for timezone difference by subtracting 2 hours
  let hours = date.getHours() - 2;

  // Handle wrapping around to the previous day
  if (hours < 0) {
    hours += 24;
  }

  // Pad the hours and minutes with leading zeros
  const paddedHours = String(hours).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${paddedHours}:${minutes}`;
};

export function formatFinancialNumber(value) {
  // Check if the value is a valid number
  if (typeof value !== "number") {
    return "Invalid value";
  }

  // Convert the number to a string
  let formattedNumber = value.toFixed(2).toString();

  // Split the string into parts before and after the decimal point
  let parts = formattedNumber.split(".");

  // Add thousands separator
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Concatenate parts with euro symbol
  formattedNumber = parts.join(",") + " €";

  return formattedNumber;
}

export function convertDate(dateString) {
  // Create a new Date object from the provided date string
  const date = new Date(dateString);

  // Extract year, month, and day from the date object
  const year = date.getFullYear();
  // Months in JavaScript are 0-indexed, so we subtract 1 from the month
  const month = date.getMonth();
  const day = date.getDate();

  // Format the month to two digits, adding 1 because months are 0-indexed
  const formattedMonth = ("0" + (month + 1)).slice(-2);

  // Construct the new date string in the desired format
  const newDateString = `${day}/${formattedMonth}/${year}`;

  return newDateString;
}

export const formatPhoneNumber = (number) => {
  // Ensure the number is a string
  let numStr = number.toString();

  // Add leading zero if not present
  if (numStr.length === 9) {
    numStr = "0" + numStr;
  }

  // Format the number
  const formattedNumber = numStr.replace(
    /(\d{4})(\d{2})(\d{2})(\d{2})/,
    "$1 $2 $3 $4"
  );

  return formattedNumber;
};

export const openGoogleMaps = (val) => {
  const address = encodeURIComponent(val);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
  window.open(mapsUrl, "_blank");
};
