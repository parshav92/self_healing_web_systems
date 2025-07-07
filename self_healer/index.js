const { getLastError } = require('./analyzer');
const { getPatchForError } = require('./knowledge_base');
const { backupOriginal, restoreOriginal } = require('./patcher');
const { testPatchedRoute } = require('./sandbox');
const { logPatchResult } = require('./feedback');

function selfHeal() {
  const error = getLastError();
  console.log('[SelfHeal] Error from analyzer:', error);
  if (!error) return;
  const patchFn = getPatchForError(error);
  console.log('[SelfHeal] Patch function:', patchFn ? 'FOUND' : 'NOT FOUND');
  if (!patchFn) return;
  backupOriginal();
  patchFn();
  testPatchedRoute((success, info) => {
    console.log('[SelfHeal] Sandbox test result:', success, info);
    if (success) {
      logPatchResult(true, 'Patched and passed sandbox test.');
    } else {
      restoreOriginal();
      logPatchResult(false, 'Patch failed in sandbox. Rolled back.');
    }
  });
}

module.exports = { selfHeal }; 