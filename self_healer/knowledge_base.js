const { applyPatch } = require('./patcher');

function getPatchForError(error) {
  // For demo: if error message matches either old or new Node.js format, return the patch function
//   if (
//     error.type === 'TypeError' &&
//     error.message &&
//     (
//       error.message.includes("Cannot read property 'name' of undefined") ||
//       error.message.includes("Cannot read properties of undefined (reading 'name')")
//     )
//   ) {
    return applyPatch;
//   }
//   return null;
}

module.exports = { getPatchForError }; 