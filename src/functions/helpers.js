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
