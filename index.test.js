const { calculateRevenue, calculateExpense } = require('./index');

describe('calculateAccountingMetrics', () => {
  describe('calculateRevenue', () => {
    it('should return 0 if there are no revenue items', () => {
      const fileContent = {
        data: [{ account_category: 'expense', total_value: 1000 }],
      };
      const expectedOutput = 0;
      expect(calculateRevenue(fileContent)).toEqual(expectedOutput);
    });

    it('should correctly sum total_value for multiple revenue items', () => {
      const fileContent = {
        data: [
          { account_category: 'revenue', total_value: 1000 },
          { account_category: 'revenue', total_value: 2000 },
          { account_category: 'expense', total_value: 500 },
        ],
      };
      const expectedOutput = 3000;
      expect(calculateRevenue(fileContent)).toEqual(expectedOutput);
    });

    it('should handle revenue items with zero total_value', () => {
      const fileContent = {
        data: [
          { account_category: 'revenue', total_value: 0 },
          { account_category: 'revenue', total_value: 1500 },
        ],
      };
      const expectedOutput = 1500;
      expect(calculateRevenue(fileContent)).toEqual(expectedOutput);
    });

    it('should handle revenue items with negative total_value', () => {
      const fileContent = {
        data: [
          { account_category: 'revenue', total_value: -500 },
          { account_category: 'revenue', total_value: 2000 },
        ],
      };
      const expectedOutput = 1500;
      expect(calculateRevenue(fileContent)).toEqual(expectedOutput);
    });
  });

  describe('calculateExpense', () => {
    it('should return 0 if there are no expense items', () => {
      const fileContent = {
        data: [{ account_category: 'revenue', total_value: 3000 }],
      };
      const expectedOutput = 0;
      expect(calculateExpense(fileContent)).toEqual(expectedOutput);
    });

    it('should correctly sum total_value for multiple expense items', () => {
      const fileContent = {
        data: [
          { account_category: 'revenue', total_value: 1000 },
          { account_category: 'revenue', total_value: 2000 },
          { account_category: 'expense', total_value: 500 },
          { account_category: 'expense', total_value: 100 },
        ],
      };
      const expectedOutput = 600;
      expect(calculateExpense(fileContent)).toEqual(expectedOutput);
    });

    it('should handle expense items with zero total_value', () => {
      const fileContent = {
        data: [
          { account_category: 'expense', total_value: 0 },
          { account_category: 'expense', total_value: 1600 },
        ],
      };
      const expectedOutput = 1600;
      expect(calculateExpense(fileContent)).toEqual(expectedOutput);
    });

    it('should handle expense items with negative total_value', () => {
      const fileContent = {
        data: [
          { account_category: 'expense', total_value: -500 },
          { account_category: 'expense', total_value: 2000 },
        ],
      };
      const expectedOutput = 1500;
      expect(calculateExpense(fileContent)).toEqual(expectedOutput);
    });
  });
});
