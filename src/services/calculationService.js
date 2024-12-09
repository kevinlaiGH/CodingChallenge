const {
  ACCOUNT_CATEGORY,
  ACCOUNT_TYPE,
  ASSET_TYPES,
  VALUE_TYPE,
  LIABILITY_TYPES,
} = require('../../constants');

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

const calculateAssets = (fileContent) => {
  return fileContent.data
    .filter(
      (item) =>
        item.account_category === ACCOUNT_CATEGORY.ASSETS &&
        Object.values(ASSET_TYPES).includes(item.account_type)
    )
    .reduce((sum, item) => {
      if (item.value_type === VALUE_TYPE.DEBIT) return sum + item.total_value;
      if (item.value_type === VALUE_TYPE.CREDIT) return sum - item.total_value;
      return sum;
    }, 0);
};

const calculateLiabilities = (fileContent) => {
  return fileContent.data
    .filter(
      (item) =>
        item.account_category === ACCOUNT_CATEGORY.LIABILITY &&
        Object.values(LIABILITY_TYPES).includes(item.account_type)
    )
    .reduce((sum, item) => {
      if (item.value_type === VALUE_TYPE.CREDIT) return sum + item.total_value;
      if (item.value_type === VALUE_TYPE.DEBIT) return sum - item.total_value;
      return sum;
    }, 0);
};

const calculateWorkingCapitalRatio = (fileContent) =>
  calculateLiabilities(fileContent) === 0
    ? 0
    : calculateAssets(fileContent) / calculateLiabilities(fileContent);

module.exports = {
  calculateRevenue,
  calculateExpense,
  calculateSalesValue,
  calculateGrossProfitMargin,
  calculateNetProfitMargin,
  calculateAssets,
  calculateLiabilities,
  calculateWorkingCapitalRatio,
};
