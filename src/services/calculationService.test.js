const {
  calculateRevenue,
  calculateExpense,
  calculateSalesValue,
  calculateGrossProfitMargin,
  calculateNetProfitMargin,
  calculateAssets,
  calculateLiabilities,
  calculateWorkingCapitalRatio,
} = require('./calculationService');
const {
  ACCOUNT_CATEGORY,
  ACCOUNT_TYPE,
  ASSET_TYPES,
  LIABILITY_TYPES,
  VALUE_TYPE,
} = require('../../constants');

describe('calculationService', () => {
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

  describe('calculateNetProfitMargin', () => {
    it('should return 0 if revenue is 0', () => {
      const revenue = 0;
      const expenses = 500;
      const expectedOutput = 0;
      expect(calculateNetProfitMargin(revenue, expenses)).toEqual(
        expectedOutput
      );
    });

    it('should return 1 if expenses are 0 and revenue is greater than 0', () => {
      const revenue = 1000;
      const expenses = 0;
      const expectedOutput = 1;
      expect(calculateNetProfitMargin(revenue, expenses)).toEqual(
        expectedOutput
      );
    });

    it('should return a negative value if expenses exceed revenue', () => {
      const revenue = 500;
      const expenses = 600;
      const expectedOutput = -0.2; // (500 - 600) / 500
      expect(calculateNetProfitMargin(revenue, expenses)).toEqual(
        expectedOutput
      );
    });

    it('should handle large numbers correctly', () => {
      const revenue = 1e6;
      const expenses = 5e5;
      const expectedOutput = 0.5; // (1e6 - 5e5) / 1e6
      expect(calculateNetProfitMargin(revenue, expenses)).toEqual(
        expectedOutput
      );
    });

    it('should handle decimal values correctly', () => {
      const revenue = 1000.75;
      const expenses = 250.25;
      const expectedOutput = 0.75; // (1000.75 - 250.25) / 1000.75
      expect(calculateNetProfitMargin(revenue, expenses)).toEqual(
        expectedOutput
      );
    });
  });

  describe('calculateAssets', () => {
    it('should return 0 if there are no asset items', () => {
      const fileContent = {
        data: [
          { account_category: ACCOUNT_CATEGORY.EXPENSE, total_value: 1000 },
        ],
      };
      const expectedOutput = 0;
      expect(calculateAssets(fileContent)).toEqual(expectedOutput);
    });

    it('should correctly sum total_value for multiple asset items with debit value_type', () => {
      const fileContent = {
        data: [
          {
            account_category: ACCOUNT_CATEGORY.ASSETS,
            account_type: ASSET_TYPES.CURRENT,
            value_type: VALUE_TYPE.DEBIT,
            total_value: 1000,
          },
          {
            account_category: ACCOUNT_CATEGORY.ASSETS,
            account_type: ASSET_TYPES.BANK,
            value_type: VALUE_TYPE.DEBIT,
            total_value: 2000,
          },
        ],
      };
      const expectedOutput = 3000;
      expect(calculateAssets(fileContent)).toEqual(expectedOutput);
    });

    it('should correctly sum total_value for multiple asset items with credit value_type', () => {
      const fileContent = {
        data: [
          {
            account_category: ACCOUNT_CATEGORY.ASSETS,
            account_type: ASSET_TYPES.CURRENT,
            value_type: VALUE_TYPE.CREDIT,
            total_value: 500,
          },
          {
            account_category: ACCOUNT_CATEGORY.ASSETS,
            account_type: ASSET_TYPES.BANK,
            value_type: VALUE_TYPE.CREDIT,
            total_value: 1500,
          },
        ],
      };
      const expectedOutput = -2000;
      expect(calculateAssets(fileContent)).toEqual(expectedOutput);
    });

    it('should handle mixed value_types correctly', () => {
      const fileContent = {
        data: [
          {
            account_category: ACCOUNT_CATEGORY.ASSETS,
            account_type: ASSET_TYPES.BANK,
            value_type: VALUE_TYPE.DEBIT,
            total_value: 2000,
          },
          {
            account_category: ACCOUNT_CATEGORY.ASSETS,
            account_type: ASSET_TYPES.CURRENT,
            value_type: VALUE_TYPE.CREDIT,
            total_value: 500,
          },
        ],
      };
      const expectedOutput = 1500;
      expect(calculateAssets(fileContent)).toEqual(expectedOutput);
    });

    it('should ignore asset items with non-asset account_category', () => {
      const fileContent = {
        data: [
          {
            account_category: ACCOUNT_CATEGORY.EXPENSE,
            account_type: ASSET_TYPES.BANK,
            value_type: VALUE_TYPE.DEBIT,
            total_value: 1000,
          },
          {
            account_category: ACCOUNT_CATEGORY.ASSETS,
            account_type: ASSET_TYPES.CURRENT,
            value_type: VALUE_TYPE.DEBIT,
            total_value: 2000,
          },
        ],
      };
      const expectedOutput = 2000;
      expect(calculateAssets(fileContent)).toEqual(expectedOutput);
    });
  });

  describe('calculateLiabilities', () => {
    it('should return 0 if there are no liability items', () => {
      const fileContent = {
        data: [
          { account_category: ACCOUNT_CATEGORY.EXPENSE, total_value: 1000 },
        ],
      };
      const expectedOutput = 0;
      expect(calculateLiabilities(fileContent)).toEqual(expectedOutput);
    });

    it('should correctly sum total_value for multiple liability items with credit value_type', () => {
      const fileContent = {
        data: [
          {
            account_category: ACCOUNT_CATEGORY.LIABILITY,
            account_type: LIABILITY_TYPES.CURRENT,
            value_type: VALUE_TYPE.CREDIT,
            total_value: 2000,
          },
          {
            account_category: ACCOUNT_CATEGORY.LIABILITY,
            account_type: LIABILITY_TYPES.CURRENT_ACCOUNTS_PAYABLE,
            value_type: VALUE_TYPE.CREDIT,
            total_value: 1500,
          },
        ],
      };
      const expectedOutput = 3500;
      expect(calculateLiabilities(fileContent)).toEqual(expectedOutput);
    });

    it('should correctly subtract total_value for multiple liability items with debit value_type', () => {
      const fileContent = {
        data: [
          {
            account_category: ACCOUNT_CATEGORY.LIABILITY,
            account_type: LIABILITY_TYPES.CURRENT,
            value_type: VALUE_TYPE.DEBIT,
            total_value: 1000,
          },
          {
            account_category: ACCOUNT_CATEGORY.LIABILITY,
            account_type: LIABILITY_TYPES.CURRENT_ACCOUNTS_PAYABLE,
            value_type: VALUE_TYPE.DEBIT,
            total_value: 500,
          },
        ],
      };
      const expectedOutput = -1500;
      expect(calculateLiabilities(fileContent)).toEqual(expectedOutput);
    });

    it('should handle mixed value_types correctly', () => {
      const fileContent = {
        data: [
          {
            account_category: ACCOUNT_CATEGORY.LIABILITY,
            account_type: LIABILITY_TYPES.CURRENT,
            value_type: VALUE_TYPE.CREDIT,
            total_value: 3000,
          },
          {
            account_category: ACCOUNT_CATEGORY.LIABILITY,
            account_type: LIABILITY_TYPES.CURRENT_ACCOUNTS_PAYABLE,
            value_type: VALUE_TYPE.DEBIT,
            total_value: 1000,
          },
        ],
      };
      const expectedOutput = 2000;
      expect(calculateLiabilities(fileContent)).toEqual(expectedOutput);
    });

    it('should ignore liability items with non-liability account_category', () => {
      const fileContent = {
        data: [
          {
            account_category: ACCOUNT_CATEGORY.EXPENSE,
            account_type: LIABILITY_TYPES.CURRENT,
            value_type: VALUE_TYPE.CREDIT,
            total_value: 1000,
          },
          {
            account_category: ACCOUNT_CATEGORY.LIABILITY,
            account_type: LIABILITY_TYPES.CURRENT_ACCOUNTS_PAYABLE,
            value_type: VALUE_TYPE.CREDIT,
            total_value: 2000,
          },
        ],
      };
      const expectedOutput = 2000;
      expect(calculateLiabilities(fileContent)).toEqual(expectedOutput);
    });
  });

  describe('calculateWorkingCapitalRatio', () => {
    it('should return 0 if liabilities are 0 and assets are greater than 0', () => {
      const fileContent = {
        data: [
          { account_category: ACCOUNT_CATEGORY.ASSETS, total_value: 1000 },
        ],
      };
      const expectedOutput = 0;
      expect(calculateWorkingCapitalRatio(fileContent)).toEqual(expectedOutput);
    });

    it('should return a positive ratio if assets are greater than liabilities', () => {
      const fileContent = {
        data: [
          {
            account_category: ACCOUNT_CATEGORY.ASSETS,
            account_type: ASSET_TYPES.CURRENT,
            value_type: VALUE_TYPE.DEBIT,
            total_value: 3000,
          },
          {
            account_category: ACCOUNT_CATEGORY.LIABILITY,
            account_type: LIABILITY_TYPES.CURRENT,
            value_type: VALUE_TYPE.CREDIT,
            total_value: 1000,
          },
        ],
      };
      const expectedOutput = 3; // 3000 / 1000
      expect(calculateWorkingCapitalRatio(fileContent)).toEqual(expectedOutput);
    });

    it('should return a negative ratio if liabilities exceed assets', () => {
      const fileContent = {
        data: [
          {
            account_category: ACCOUNT_CATEGORY.ASSETS,
            account_type: ASSET_TYPES.CURRENT,
            value_type: VALUE_TYPE.CREDIT,
            total_value: 1000,
          },
          {
            account_category: ACCOUNT_CATEGORY.LIABILITY,
            account_type: ASSET_TYPES.CURRENT,
            value_type: VALUE_TYPE.CREDIT,
            total_value: 3000,
          },
        ],
      };
      const expectedOutput = -0.3333; // -1000 / 3000
      expect(calculateWorkingCapitalRatio(fileContent)).toBeCloseTo(
        expectedOutput,
        4
      );
    });

    it('should return 0 if both assets and liabilities are 0', () => {
      const fileContent = {
        data: [],
      };
      const expectedOutput = 0;
      expect(calculateWorkingCapitalRatio(fileContent)).toEqual(expectedOutput);
    });
  });
});
