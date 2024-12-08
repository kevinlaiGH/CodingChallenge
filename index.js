const calculationService = require('./src/services/calculationService');
const {
  formatCurrency,
  formatPercentage,
} = require('./src/services/formatService');
const { readJsonFile } = require('./src/utils/fileReader');

const calculateAccountingMetrics = (fileContent) => {
  return {
    revenue: formatCurrency(calculationService.calculateRevenue(fileContent)),
    expenses: formatCurrency(calculationService.calculateExpense(fileContent)),
    grossProfitMargin: formatPercentage(
      calculationService.calculateGrossProfitMargin(
        fileContent,
        calculationService.calculateRevenue(fileContent)
      )
    ),
    netProfitMargin: formatPercentage(
      calculationService.calculateNetProfitMargin(
        calculationService.calculateRevenue(fileContent),
        calculationService.calculateExpense(fileContent)
      )
    ),
    workingCapitalRatio: formatPercentage(
      calculationService.calculateWorkingCapitalRatio(fileContent)
    ),
  };
};

const fileName = 'data.json';
const fileContent = readJsonFile(fileName);

const metrics = calculateAccountingMetrics(fileContent);

// Print results
console.log(`Revenue: ${metrics.revenue}`);
console.log(`Expenses: ${metrics.expenses}`);
console.log(`Gross Profit Margin: ${metrics.grossProfitMargin}`);
console.log(`Net Profit Margin: ${metrics.netProfitMargin}`);
console.log(`Working Capital Ratio: ${metrics.workingCapitalRatio}`);

module.exports = { calculateAccountingMetrics };
