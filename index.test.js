const { sortObjectAttributes, parseJsonData } = require('./index');

describe('sortObjectAttributes', () => {
  it('should sort the attributes of an object alphabetically', () => {
    const input = {
      account_name: 'PAYG Withholdings Payable',
      account_status: 'ACTIVE',
      account_type_bank: '',
      system_account: '',
      value_type: 'credit',
      total_value: 6028.0,
      account_category: 'liability',
      account_code: '825',
      account_currency: 'AUD',
      account_identifier: '4d111d55-1c71-46b4-8cbc-d8b54d8d54c5',
      account_type: 'payroll',
    };

    const expectedOutput = {
      account_category: 'liability',
      account_code: '825',
      account_currency: 'AUD',
      account_identifier: '4d111d55-1c71-46b4-8cbc-d8b54d8d54c5',
      account_name: 'PAYG Withholdings Payable',
      account_status: 'ACTIVE',
      account_type: 'payroll',
      account_type_bank: '',
      system_account: '',
      total_value: 6028,
      value_type: 'credit',
    };
    expect(sortObjectAttributes(input)).toEqual(expectedOutput);
  });

  it('should handle an empty object', () => {
    const input = {};
    const expectedOutput = {};
    expect(sortObjectAttributes(input)).toEqual(expectedOutput);
  });

  it('should handle an object with one attribute', () => {
    const input = { account_category: 'liability' };
    const expectedOutput = { account_category: 'liability' };
    expect(sortObjectAttributes(input)).toEqual(expectedOutput);
  });
});
describe('parseJsonData', () => {
  it('should parse JSON data with sorted object attributes', () => {
    const input = JSON.stringify({
      data: [
        { account_name: 'B', account_status: 'ACTIVE' },
        { account_name: 'A', account_status: 'INACTIVE' },
      ],
    });
    const expectedOutput = JSON.stringify(
      {
        data: [
          { account_name: 'B', account_status: 'ACTIVE' },
          { account_name: 'A', account_status: 'INACTIVE' },
        ],
      },
      null,
      2
    );
    expect(parseJsonData(input)).toEqual(expectedOutput);
  });

  it('should handle JSON data with an empty data array', () => {
    const input = JSON.stringify({ data: [] });
    const expectedOutput = JSON.stringify({ data: [] }, null, 2);
    expect(parseJsonData(input)).toEqual(expectedOutput);
  });

  it('should throw an error for invalid JSON input', () => {
    const input = 'invalid json';
    expect(() => parseJsonData(input)).toThrow(SyntaxError);
  });

  it('should handle JSON data with nested objects', () => {
    const input = JSON.stringify({
      data: [
        { account_name: 'C', details: { status: 'ACTIVE' } },
        { account_name: 'A', details: { status: 'INACTIVE' } },
      ],
    });
    const expectedOutput = JSON.stringify(
      {
        data: [
          { account_name: 'C', details: { status: 'ACTIVE' } },
          { account_name: 'A', details: { status: 'INACTIVE' } },
        ],
      },
      null,
      2
    );
    expect(parseJsonData(input)).toEqual(expectedOutput);
  });
});
