const { formatCurrency, formatPercentage } = require('./index');

describe('formatCurrency', () => {
  it('should format a positive integer correctly', () => {
    const value = 1000;
    const expectedOutput = '$1,000';
    expect(formatCurrency(value)).toEqual(expectedOutput);
  });

  it('should format a negative integer correctly', () => {
    const value = -1000;
    const expectedOutput = '-$1,000';
    expect(formatCurrency(value)).toEqual(expectedOutput);
  });

  it('should format a decimal number correctly', () => {
    const value = 1234.56;
    const expectedOutput = '$1,235'; // rounded
    expect(formatCurrency(value)).toEqual(expectedOutput);
  });

  it('should format zero correctly', () => {
    const value = 0;
    const expectedOutput = '$0';
    expect(formatCurrency(value)).toEqual(expectedOutput);
  });

  it('should handle large numbers correctly', () => {
    const value = 1234567890;
    const expectedOutput = '$1,234,567,890';
    expect(formatCurrency(value)).toEqual(expectedOutput);
  });

  it('should handle decimal numbers with trailing zeros', () => {
    const value = 1000.0;
    const expectedOutput = '$1,000'; // rounded
    expect(formatCurrency(value)).toEqual(expectedOutput);
  });

  it('should handle negative decimal numbers correctly', () => {
    const value = -1234.56;
    const expectedOutput = '-$1,235'; // rounded
    expect(formatCurrency(value)).toEqual(expectedOutput);
  });
});
describe('formatPercentage', () => {
  it('should format a positive decimal correctly', () => {
    const value = 0.1234;
    const expectedOutput = '12.3%';
    expect(formatPercentage(value)).toEqual(expectedOutput);
  });

  it('should format a negative decimal correctly', () => {
    const value = -0.5678;
    const expectedOutput = '-56.8%';
    expect(formatPercentage(value)).toEqual(expectedOutput);
  });

  it('should format a value of one correctly', () => {
    const value = 1;
    const expectedOutput = '100.0%';
    expect(formatPercentage(value)).toEqual(expectedOutput);
  });

  it('should format a value of negative one correctly', () => {
    const value = -1;
    const expectedOutput = '-100.0%';
    expect(formatPercentage(value)).toEqual(expectedOutput);
  });

  it('should format a very small positive number correctly', () => {
    const value = 0.0001;
    const expectedOutput = '0.0%';
    expect(formatPercentage(value)).toEqual(expectedOutput);
  });

  it('should format a very small negative number correctly', () => {
    const value = -0.0001;
    const expectedOutput = '0.0%';
    expect(formatPercentage(value)).toEqual(expectedOutput);
  });

  it('should format a large positive number correctly', () => {
    const value = 1000;
    const expectedOutput = '100000.0%';
    expect(formatPercentage(value)).toEqual(expectedOutput);
  });

  it('should format a large negative number correctly', () => {
    const value = -1000;
    const expectedOutput = '-100000.0%';
    expect(formatPercentage(value)).toEqual(expectedOutput);
  });
});
