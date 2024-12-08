const sortObjectAttributes = (obj) => {
  const sortedObj = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sortedObj[key] = obj[key];
    });
  return sortedObj;
};

module.exports = {
  sortObjectAttributes,
};
