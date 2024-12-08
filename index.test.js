const { sortObjectAttributes } = require('./index');

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
