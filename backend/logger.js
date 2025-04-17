/**
 * Simple logging utility
 */
const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const logFilePath = path.join(logsDir, `server-${new Date().toISOString().split('T')[0]}.log`);

function formatMessage(level, message, extra = {}) {
  const timestamp = new Date().toISOString();
  let formattedMessage = `[${timestamp}] [${level}] ${message}`;
  
  if (extra instanceof Error) {
    formattedMessage += `\n  Error: ${extra.message}\n  Stack: ${extra.stack}`;
  } else if (Object.keys(extra).length > 0) {
    formattedMessage += `\n  ${JSON.stringify(extra, null, 2)}`;
  }
  
  return formattedMessage;
}

function log(level, message, extra = {}) {
  const formattedMessage = formatMessage(level, message, extra);
  
  // Log to console
  console.log(formattedMessage);
  
  // Log to file
  fs.appendFileSync(logFilePath, formattedMessage + '\n');
}

module.exports = {
  info: (message, extra = {}) => log('INFO', message, extra),
  warn: (message, extra = {}) => log('WARN', message, extra),
  error: (message, extra = {}) => log('ERROR', message, extra),
  debug: (message, extra = {}) => log('DEBUG', message, extra)
};
