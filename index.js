const fs = require('fs');
const { Logger } = require('./helper');

const fileName = 'data.json';

const ACCOUNT_CATEGORY = {
  REVENUE: 'revenue',
  EXPENSE: 'expense',
};

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

calculateRevenue(fileContent);
Logger.info('Revenue=' + calculateRevenue(fileContent));
calculateExpense(fileContent);
Logger.info('Expense=' + calculateExpense(fileContent));

module.exports = { calculateRevenue, calculateExpense };
