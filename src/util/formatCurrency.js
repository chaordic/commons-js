// Default values
const DECIMAL_PLACES = 2;
const THOUSANDS_SEPARATOR = '.';
const DECIMAL_POINT = ',';
const CURRENCY_SYMBOL = 'R$';

/**
 * Formats a number to have specified number of decimal places,
 * a thousdands separator and decimal point, as well as adding a
 * currency symbol to the resulting string.
 *
 * @memberof module:@linx-impulse/commons-js/util
 * @method formatCurrency
 * @param {Number} number A number to be formatted
 * @param {Object} options Parameters to format the passed number
 * @param {Number} options.decimalPlaces The number of digits after
 * the decimal point.
 * @param {string} options.thousandsSeparator The symbol used to separate
 * thousands.
 * @param {string} options.decimalPoint The symbol used to separated
 * the integer part of the number from the decimal part.
 * @param {string} options.currencySymbol The symbol of the currency.
 * Ex: U$, R$, etc.
 * @returns {string} The resulting formatted string.
 */
export function formatCurrency(
  number,
  {
    decimalPlaces = DECIMAL_PLACES,
    thousandsSeparator = THOUSANDS_SEPARATOR,
    decimalPoint = DECIMAL_POINT,
    currencySymbol = CURRENCY_SYMBOL,
  } = {},
) {
  const parts = number.toFixed(decimalPlaces).split('.');
  const integerPart = parts[0];
  let decimalPart = Number(parts[1] || 0);
  let formattedNumber = '';

  decimalPart += 10 ** decimalPlaces;
  decimalPart = decimalPart.toFixed().substr(1);

  if (thousandsSeparator) {
    // eslint-disable-next-line no-plusplus
    for (let i = integerPart.length - 1, j = 0; i > -1; i--, j++) {
      if ((j % 3) === 0 && formattedNumber) {
        formattedNumber = `${thousandsSeparator}${formattedNumber}`;
      }

      formattedNumber = `${integerPart.charAt(i)}${formattedNumber}`;
    }

    if (formattedNumber.charAt(0) === thousandsSeparator) {
      formattedNumber = formattedNumber.substr(1);
    }
  } else {
    formattedNumber = integerPart;
  }

  formattedNumber += `${decimalPoint}${decimalPart}`;

  return `${currencySymbol} ${formattedNumber}`;
}
