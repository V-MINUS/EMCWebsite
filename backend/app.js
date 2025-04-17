const express = require("express");\r\nconst errorHandler = require('./middlewares/errorHandler');
const cors = require("cors");
const path = require("path");

const contactRoutes = require("./routes/contact");
const artistRoutes = require("./routes/artists");
const eventRoutes = require("./routes/events");

const app = express();
// Add startup logging
const logger = require('./logger');
logger.info(`Server starting in ${process.env.NODE_ENV || 'development'} mode`);

app.use((req, res, next) => {
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' data:; script-src 'self';");
  next();
});
  next();
});
app.use((req, res, next) => {
  next();
});
app.use((req, res, next) => {
  next();
});
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/contact", contactRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/events", eventRoutes);


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  // Log but don't exit
});

// Handle 404 errors - must be after all other routes
app.use(errorHandler.notFound);

// Global error handler - must be the last middleware
app.use(errorHandler.globalErrorHandler);

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`[${new Date().toISOString()}] UNCAUGHT EXCEPTION:`, err);
  // Log but don't exit in production
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error(`[${new Date().toISOString()}] UNHANDLED REJECTION:`, reason);
});


// Monitor memory usage
setInterval(() => {
  const memoryUsage = process.memoryUsage();
  logger.info(`Memory usage: ${Math.round(memoryUsage.rss / 1024 / 1024)}MB`);
  
  // If memory usage exceeds threshold (e.g., 500MB), log warning
  if (memoryUsage.rss > 500 * 1024 * 1024) {
    logger.warn('High memory usage detected');
  }
}, 60000); // Log every minute
\napp.listen(PORT, () => {
  console.log(`EMC backend running on port ${PORT}`);
});


