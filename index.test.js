const {
  calculateRevenue,
  calculateExpense,
  calculateSalesValue,
  calculateGrossProfitMargin,
} = require('./index');
const { ACCOUNT_CATEGORY, ACCOUNT_TYPE, VALUE_TYPE } = require('./constants');

describe('calculateAccountingMetrics', () => {
  describe('calculateRevenue', () => {
    it('should return 0 if there are no revenue items', () => {
      const fileContent = {
        data: [
          { account_category: ACCOUNT_CATEGORY.EXPENSE, total_value: 1000 },
        ],
      };
      const expectedOutput = 0;
      expect(calculateRevenue(fileContent)).toEqual(expectedOutput);
    });

    it('should correctly sum total_value for multiple revenue items', () => {
      const fileContent = {
        data: [
          { account_category: ACCOUNT_CATEGORY.REVENUE, total_value: 1000 },
          { account_category: ACCOUNT_CATEGORY.REVENUE, total_value: 2000 },
          { account_category: ACCOUNT_CATEGORY.EXPENSE, total_value: 500 },
        ],
      };
      const expectedOutput = 3000;
      expect(calculateRevenue(fileContent)).toEqual(expectedOutput);
    });

    it('should handle revenue items with zero total_value', () => {
      const fileContent = {
        data: [
          { account_category: ACCOUNT_CATEGORY.REVENUE, total_value: 0 },
          { account_category: ACCOUNT_CATEGORY.REVENUE, total_value: 1500 },
        ],
      };
      const expectedOutput = 1500;
      expect(calculateRevenue(fileContent)).toEqual(expectedOutput);
    });

    it('should handle revenue items with negative total_value', () => {
      const fileContent = {
        data: [
          { account_category: ACCOUNT_CATEGORY.REVENUE, total_value: -500 },
          { account_category: ACCOUNT_CATEGORY.REVENUE, total_value: 2000 },
        ],
      };
      const expectedOutput = 1500;
      expect(calculateRevenue(fileContent)).toEqual(expectedOutput);
    });
  });

  describe('calculateExpense', () => {
    it('should return 0 if there are no expense items', () => {
      const fileContent = {
        data: [
          { account_category: ACCOUNT_CATEGORY.REVENUE, total_value: 3000 },
        ],
      };
      const expectedOutput = 0;
      expect(calculateExpense(fileContent)).toEqual(expectedOutput);
    });

    it('should correctly sum total_value for multiple expense items', () => {
      const fileContent = {
        data: [
          { account_category: ACCOUNT_CATEGORY.REVENUE, total_value: 1000 },
          { account_category: ACCOUNT_CATEGORY.REVENUE, total_value: 2000 },
          { account_category: ACCOUNT_CATEGORY.EXPENSE, total_value: 500 },
          { account_category: ACCOUNT_CATEGORY.EXPENSE, total_value: 100 },
        ],
      };
      const expectedOutput = 600;
      expect(calculateExpense(fileContent)).toEqual(expectedOutput);
    });

    it('should handle expense items with zero total_value', () => {
      const fileContent = {
        data: [
          { account_category: ACCOUNT_CATEGORY.EXPENSE, total_value: 0 },
          { account_category: ACCOUNT_CATEGORY.EXPENSE, total_value: 1600 },
        ],
      };
      const expectedOutput = 1600;
      expect(calculateExpense(fileContent)).toEqual(expectedOutput);
    });

    it('should handle expense items with negative total_value', () => {
      const fileContent = {
        data: [
          { account_category: ACCOUNT_CATEGORY.EXPENSE, total_value: -500 },
          { account_category: ACCOUNT_CATEGORY.EXPENSE, total_value: 2000 },
        ],
      };
      const expectedOutput = 1500;
      expect(calculateExpense(fileContent)).toEqual(expectedOutput);
    });
  });

  describe('salesValue', () => {
    it('should return 0 if there are no sales items', () => {
      const fileContent = {
        data: [
          {
            account_type: ACCOUNT_TYPE.EXPENSE,
            value_type: VALUE_TYPE.CREDIT,
            total_value: 1000,
          },
        ],
      };
      const expectedOutput = 0;
      expect(calculateSalesValue(fileContent)).toEqual(expectedOutput);
    });

    it('should correctly sum total_value for multiple sales items', () => {
      const fileContent = {
        data: [
          {
            account_type: ACCOUNT_TYPE.SALES,
            value_type: VALUE_TYPE.DEBIT,
            total_value: 1500,
          },
          {
            account_type: ACCOUNT_TYPE.SALES,
            value_type: VALUE_TYPE.DEBIT,
            total_value: 2500,
          },
          {
            account_type: ACCOUNT_TYPE.EXPENSE,
            value_type: VALUE_TYPE.DEBIT,
            total_value: 300,
          },
        ],
      };
      const expectedOutput = 4000;
      expect(calculateSalesValue(fileContent)).toEqual(expectedOutput);
    });

    it('should ignore sales items with non-DEBIT value_type', () => {
      const fileContent = {
        data: [
          {
            account_type: ACCOUNT_TYPE.SALES,
            value_type: VALUE_TYPE.CREDIT,
            total_value: 2000,
          },
          {
            account_type: ACCOUNT_TYPE.SALES,
            value_type: VALUE_TYPE.DEBIT,
            total_value: 1000,
          },
        ],
      };
      const expectedOutput = 1000;
      expect(calculateSalesValue(fileContent)).toEqual(expectedOutput);
    });

    it('should handle sales items with negative total_value', () => {
      const fileContent = {
        data: [
          {
            account_type: ACCOUNT_TYPE.SALES,
            value_type: VALUE_TYPE.DEBIT,
            total_value: -500,
          },
          {
            account_type: ACCOUNT_TYPE.SALES,
            value_type: VALUE_TYPE.DEBIT,
            total_value: 2000,
          },
        ],
      };
      const expectedOutput = 1500;
      expect(calculateSalesValue(fileContent)).toEqual(expectedOutput);
    });
  });

  describe('calculateGrossProfitMargin', () => {
    it('should return 0 if revenue is 0', () => {
      const fileContent = {
        data: [
          {
            account_type: ACCOUNT_TYPE.SALES,
            value_type: VALUE_TYPE.DEBIT,
            total_value: 1000,
          },
        ],
      };
      const revenue = 0;
      const expectedOutput = 0;
      expect(calculateGrossProfitMargin(fileContent, revenue)).toEqual(
        expectedOutput
      );
    });

    it('should correctly calculate gross profit margin when sales value is greater than revenue', () => {
      const fileContent = {
        data: [
          {
            account_type: ACCOUNT_TYPE.SALES,
            value_type: VALUE_TYPE.DEBIT,
            total_value: 3000,
          },
        ],
      };
      const revenue = 2000;
      const expectedOutput = 1.5; // 3000 / 2000
      expect(calculateGrossProfitMargin(fileContent, revenue)).toEqual(
        expectedOutput
      );
    });

    it('should correctly calculate gross profit margin when sales value is less than revenue', () => {
      const fileContent = {
        data: [
          {
            account_type: ACCOUNT_TYPE.SALES,
            value_type: VALUE_TYPE.DEBIT,
            total_value: 1000,
          },
        ],
      };
      const revenue = 2000;
      const expectedOutput = 0.5; // 1000 / 2000
      expect(calculateGrossProfitMargin(fileContent, revenue)).toEqual(
        expectedOutput
      );
    });

    it('should handle sales items with negative total_value', () => {
      const fileContent = {
        data: [
          {
            account_type: ACCOUNT_TYPE.SALES,
            value_type: VALUE_TYPE.DEBIT,
            total_value: -1000,
          },
          {
            account_type: ACCOUNT_TYPE.SALES,
            value_type: VALUE_TYPE.DEBIT,
            total_value: 3000,
          },
        ],
      };
      const revenue = 2000;
      const expectedOutput = 1; // (3000 - 1000) / 2000
      expect(calculateGrossProfitMargin(fileContent, revenue)).toEqual(
        expectedOutput
      );
    });
  });
});
