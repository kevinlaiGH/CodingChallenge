const fs = require('fs');

const readJsonFile = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
  } catch (error) {
    throw new Error(`Error reading file: ${error.message}`);
  }
};

module.exports = { readJsonFile };
