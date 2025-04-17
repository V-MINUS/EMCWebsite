/**
 * Error handling middleware for EMC Website backend
 */
const logger = require('../logger');

// Handle 404 Not Found errors
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

// Handle all other errors
const globalErrorHandler = (err, req, res, next) => {
  // Log error details
  logger.error(`Error processing ${req.method} ${req.originalUrl}`, err);
  
  // Set status code
  const statusCode = err.status || 500;
  
  // Send error response
  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? statusCode === 404 ? 'Resource not found' : 'Internal server error' 
      : err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = {
  notFound,
  globalErrorHandler
};
