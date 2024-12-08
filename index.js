const fs = require('fs');
const { Logger } = require('./helper');
const { ACCOUNT_CATEGORY, ACCOUNT_TYPE, VALUE_TYPE } = require('./constants');

const fileName = 'data.json';

const fileContent = JSON.parse(
  fs.readFileSync(fileName, { encoding: 'utf-8' })
);

const calculateRevenue = (fileContent) => {
  const revenueItems = fileContent.data.filter(
    (item) => item.account_category === ACCOUNT_CATEGORY.REVENUE
  );
  return revenueItems.reduce((total, item) => total + item.total_value, 0);
};

const calculateExpense = (fileContent) => {
  const expenseItems = fileContent.data.filter(
    (item) => item.account_category === ACCOUNT_CATEGORY.EXPENSE
  );
  return expenseItems.reduce((total, item) => total + item.total_value, 0);
};

const calculateSalesValue = (fileContent) =>
  fileContent.data
    .filter(
      (item) =>
        item.account_type === ACCOUNT_TYPE.SALES &&
        item.value_type === VALUE_TYPE.DEBIT
    )
    .reduce((total, item) => total + item.total_value, 0);

const calculateGrossProfitMargin = (fileContent, revenue) =>
  revenue === 0 ? 0 : calculateSalesValue(fileContent) / revenue;

const calculateNetProfitMargin = (revenue, expenses) =>
  revenue === 0 ? 0 : Number(((revenue - expenses) / revenue).toFixed(2));

calculateRevenue(fileContent);
Logger.info('Revenue=' + calculateRevenue(fileContent));

calculateExpense(fileContent);
Logger.info('Expense=' + calculateExpense(fileContent));

calculateGrossProfitMargin(fileContent, calculateRevenue(fileContent));
Logger.info(
  'GrossProfitMargin=' +
    calculateRevenue(fileContent, calculateRevenue(fileContent))
);

calculateNetProfitMargin(
  calculateRevenue(fileContent),
  calculateExpense(fileContent)
);
Logger.info(
  'NetProfitMargin=' +
    calculateNetProfitMargin(
      calculateRevenue(fileContent),
      calculateExpense(fileContent)
    )
);

module.exports = {
  calculateRevenue,
  calculateExpense,
  calculateSalesValue,
  calculateGrossProfitMargin,
  calculateNetProfitMargin,
};
