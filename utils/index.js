const path = require('path');

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

module.exports = {
  sortObjectAttributes,
  sanitizedPath,
};
