const sortObjectAttributes = (obj) => {
  const sortedObj = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sortedObj[key] = obj[key];
    });
  return sortedObj;
};

const parseJsonData = (data) => {
  const jsonData = JSON.parse(data);
  jsonData.data = jsonData.data.map(sortObjectAttributes);
  return JSON.stringify(jsonData, null, 2);
};

module.exports = {
  sortObjectAttributes,
  parseJsonData,
};
