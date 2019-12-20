import { expect, sinon } from '../globals';
import { formatCurrency } from '../../src/util/formatCurrency';

describe('util/formatCurrency', function() {
  it('should convert a number using the default parameters if none are provided', function() {
    const exampleNumber = 1234567.890;

    const result = formatCurrency(exampleNumber);

    expect(result).to.equal(`R$ 1.234.567,89`);
  });

  it('should convert a number to the format described by its parameters', function() {
    const exampleNumber = 1234567.890;
    const exampleCurrencySymbol = 'Z$$';
    const exampleThousandsSeparator = ',';
    const exampleDecimalPoint = '.';
    const exampleDecimalPlaces = 4;

    const result = formatCurrency(exampleNumber, {
      currencySymbol: exampleCurrencySymbol,
      thousandsSeparator: exampleThousandsSeparator,
      decimalPoint: exampleDecimalPoint,
      decimalPlaces: exampleDecimalPlaces,
    });

    expect(result).to.equal(`${exampleCurrencySymbol} 1,234,567.8900`);
  });
});
