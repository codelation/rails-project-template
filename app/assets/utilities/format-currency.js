import numeral from 'numeral';

// Formats a number to US currency
export default function(value, digits) {
  if (digits === null || digits === undefined) {
    digits = 2;
  }

  value = (value + '').replace(/[^0123456789.-]/g, '');

  var format = '$0,0';
  if (digits > 0) {
    format += '.';
    for (var i = 0; i < digits; i++) {
      format += '0';
    }
  }

  return numeral(value).format(format);
}
