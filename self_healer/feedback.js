const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../logs/error.log');

function logPatchResult(success, info) {
  const entry = `[${new Date().toISOString()}] PATCH ${success ? 'SUCCESS' : 'FAIL'}: ${info}\n`;
  fs.appendFileSync(LOG_FILE, entry);
}

module.exports = { logPatchResult }; 