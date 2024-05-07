export function formatFinancialNumber(value) {
  // Check if the value is a valid number
  if (typeof value !== 'number') {
    return 'Invalid value';
  }

  // Convert the number to a string
  let formattedNumber = value.toFixed(2).toString();

  // Split the string into parts before and after the decimal point
  let parts = formattedNumber.split('.');

  // Add thousands separator
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Concatenate parts with euro symbol
  formattedNumber = parts.join(',') + ' €';

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
  const formattedMonth = ('0' + (month + 1)).slice(-2);

  // Construct the new date string in the desired format
  const newDateString = `${year}-${formattedMonth}-${day}`;

  return newDateString;
}