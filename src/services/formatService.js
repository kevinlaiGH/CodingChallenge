const formatCurrency = (value) => {
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);
  const formattedValue = Math.round(absoluteValue)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return isNegative ? `-$${formattedValue}` : `$${formattedValue}`;
};

const formatPercentage = (value) => {
  const percentage = value * 100;
  if (Math.abs(percentage) < 0.05) {
    return '0.0%';
  }
  return `${percentage.toFixed(1)}%`;
};

module.exports = {
  formatCurrency,
  formatPercentage,
};
