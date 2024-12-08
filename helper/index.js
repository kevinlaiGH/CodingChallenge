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

module.exports = {
  sortObjectAttributes,
  sanitizedPath,
  Logger,
};
