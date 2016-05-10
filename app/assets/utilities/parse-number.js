// Parses a number from a string.
export default function(value) {
  value = (value + '').replace(/[^0123456789.-]/g, '');
  return parseFloat(value, 10);
}
