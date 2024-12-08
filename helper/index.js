const path = require('path');
const winston = require('winston');

const sortObjectAttributes = (obj) => {
  const sortedObj = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sortedObj[key] = obj[key];
    });
  return sortedObj;
};

const sanitizedPath = (filePath) => path.normalize(filePath);

const { combine, colorize, timestamp, simple } = winston.format;

const Logger = winston.createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'app.log', level: 'info' }),
  ],
});

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
  sortObjectAttributes,
  sanitizedPath,
  Logger,
};
