// logger.js
const winston = require('winston');

// Create the logger "instance"
const logger = winston.createLogger({
  // Level: 'info' means we log everything that is 'info' or more serious (warn, error)
  level: 'info',

  // Format: We want the logs to be in JSON format with a timestamp
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),

  // Transports: WHERE do we send the logs?
  transports: [
    // 1. Write to a file named 'app.log' (captures everything)
    new winston.transports.File({ filename: 'app.log' }),

    // 2. Write only errors to a separate file
    new winston.transports.File({ filename: 'errors.log', level: 'error' }),

    // 3. Also print to the console (so we can see it while developing)
    new winston.transports.Console()
  ],
});

module.exports = logger;
