const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../logs/error.log');

function getLastError() {
  if (!fs.existsSync(LOG_FILE)) return null;
  const lines = fs.readFileSync(LOG_FILE, 'utf-8').trim().split('\n');
  if (lines.length === 0) return null;
  // Scan backwards for the first line that matches the error pattern
  let match = null;
  let errorLine = null;
  for (let i = lines.length - 1; i >= 0; i--) {
    errorLine = lines[i];
    match = errorLine.match(/\] (\w+): (.*)/);
    if (match) break;
  }
  console.log('[Analyzer] Last error log line:', errorLine); // DEBUG
  if (!match) {
    console.log('[Analyzer] No match for error line'); // DEBUG
    return null;
  }
  const result = {
    type: match[1],
    message: match[2],
    raw: errorLine
  };
  console.log('[Analyzer] Parsed error:', result); // DEBUG
  return result;
}

module.exports = { getLastError }; 