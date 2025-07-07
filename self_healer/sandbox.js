const { fork } = require('child_process');
const path = require('path');
const http = require('http');

function testPatchedRoute(callback) {
  // Fork a child process to run the server
  const child = fork(path.join(__dirname, '../server/app.js'), [], {
    env: { ...process.env, PORT: 4000 },
    stdio: 'ignore'
  });

  // Wait a bit for the server to start
  setTimeout(() => {
    // Make a request to /user
    http.get('http://localhost:4000/user', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        child.kill();
        if (res.statusCode === 200) {
          callback(true, data);
        } else {
          callback(false, data);
        }
      });
    }).on('error', (err) => {
      child.kill();
      callback(false, err.message);
    });
  }, 1000);
}

module.exports = { testPatchedRoute }; 