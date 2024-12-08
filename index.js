const fs = require('fs');
const { Logger } = require('./helper');

const fileName = 'newData.json';

const ACCOUNT_CATEGORY = {
  REVENUE: 'revenue',
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

calculateRevenue(fileContent);

Logger.info(calculateRevenue(fileContent));

module.exports = { calculateRevenue };
