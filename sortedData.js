const fs = require('fs');
const { sortObjectAttributes, sanitizedPath, Logger } = require('./helper');

const parseJsonData = (data) => {
  const jsonData = JSON.parse(data);
  jsonData.data = jsonData.data.map(sortObjectAttributes);
  return JSON.stringify(jsonData, null, 2);
};

const sortAndSaveData = async (inputFile, outputFile) => {
  try {
    const data = await fs.promises.readFile(sanitizedPath(inputFile), 'utf8');
    const sortedData = parseJsonData(data);
    await fs.promises.writeFile(sanitizedPath(outputFile), sortedData);
    Logger.info(`Data attributes sorted and saved to ${outputFile}`);
  } catch (err) {
    Logger.error('Error processing file:', err);
    throw err;
  }
};

sortAndSaveData('data.json', 'newData.json');

module.exports = {
  sortObjectAttributes,
  parseJsonData,
  sortAndSaveData,
};
