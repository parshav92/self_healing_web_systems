const express = require('express');
const app = express();
const routes = require('./routes');
const { logError, watchErrors } = require('../self_healer/monitor');

app.use(express.json());

// Use routes
app.use('/', routes);

// Error handling middleware (logs error and sends response)
app.use((err, req, res, next) => {
  logError(err.stack || err.message);
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (PORT == 3002) watchErrors(); // Only main server runs the watcher
}); 