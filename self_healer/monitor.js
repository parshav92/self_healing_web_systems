const fs = require('fs');
const path = require('path');
const { selfHeal } = require('./index');
const { getLastError } = require('./analyzer');

const LOG_FILE = path.join(__dirname, '../logs/error.log');
const LAST_ERROR_FILE = path.join(__dirname, 'last_error.json');

function logError(error) {
  const entry = `[${new Date().toISOString()}] ${error}\n`;
  fs.appendFileSync(LOG_FILE, entry);
}

function getLastHealedError() {
  if (!fs.existsSync(LAST_ERROR_FILE)) return null;
  try {
    const data = fs.readFileSync(LAST_ERROR_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function setLastHealedError(errorObj) {
  fs.writeFileSync(LAST_ERROR_FILE, JSON.stringify(errorObj));
}

function watchErrors() {
  let lastSize = 0;
  const logPath = LOG_FILE;
  setInterval(() => {
    if (!fs.existsSync(logPath)) return;
    const stats = fs.statSync(logPath);
    if (stats.size > lastSize) {
      console.log('[Monitor] New error detected, checking if it is new for self-heal'); // DEBUG
      lastSize = stats.size;
      // Get the most recent error
      const error = getLastError();
      if (!error) return;
      const lastHealed = getLastHealedError();
      if (lastHealed && lastHealed.raw === error.raw) {
        console.log('[Monitor] Error already healed, skipping self-heal'); // DEBUG
        return;
      }
      // New error, trigger self-heal
      selfHeal();
      setLastHealedError(error);
    }
  }, 2000); // Check every 2 seconds
}

module.exports = { logError, watchErrors }; 