const express = require('express');
const router = express.Router();

// Intentional bug: user is undefined
router.get('/user', (req, res, next) => {
  try {
    const user = undefined;
    // This will throw: Cannot read property 'name' of undefined
    const name = user?.name ?? "Unknown";
    res.json({ name });
  } catch (err) {
    next(err);
  }
});

module.exports = router; 