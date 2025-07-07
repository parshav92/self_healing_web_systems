# Self-Healing Web System Demo

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node server/app.js
   ```
3. Test the buggy endpoint:
   ```bash
   curl http://localhost:3000/user
   ```
   You should see a 500 error with a message like:
   ```json
   { "error": "Cannot read property 'name' of undefined" }
   ```

## Self-Healing in Action
- The system logs errors to `logs/error.log`.
- When a known error is detected, the self-healer will:
  1. Analyze the error.
  2. Suggest and apply a patch (adds a null check).
  3. Test the patch in a sandboxed process.
  4. If the patch works, it is kept. If not, the code is rolled back.
  5. Patch results are logged in `logs/error.log`.
- After the patch, retry:
   ```bash
   curl http://localhost:3000/user
   ```
   You should now see:
   ```json
   { "name": "Unknown" }
   ```

---

The next steps will add the self-healing system to detect and patch this error automatically. 