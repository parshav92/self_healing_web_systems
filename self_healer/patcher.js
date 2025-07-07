const fs = require('fs');
const path = require('path');

const ROUTES_FILE = path.join(__dirname, '../server/routes.js');
const BACKUP_FILE = path.join(__dirname, '../server/patches/routes.js.bak');

function backupOriginal() {
  if (!fs.existsSync(BACKUP_FILE)) {
    fs.copyFileSync(ROUTES_FILE, BACKUP_FILE);
  }
}

function restoreOriginal() {
  if (fs.existsSync(BACKUP_FILE)) {
    fs.copyFileSync(BACKUP_FILE, ROUTES_FILE);
    fs.unlinkSync(BACKUP_FILE);
  }
}

function applyPatch() {
  // Replace 'const name = user.name;' with 'const name = user?.name ?? "Unknown";'
  let code = fs.readFileSync(ROUTES_FILE, 'utf-8');
  code = code.replace(
    /const name = user\.name;/,
    'const name = user?.name ?? "Unknown";'
  );
  fs.writeFileSync(ROUTES_FILE, code);
}

module.exports = { backupOriginal, restoreOriginal, applyPatch }; 