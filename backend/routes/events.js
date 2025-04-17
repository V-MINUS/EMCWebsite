/**
 * Routes for event-related endpoints
 */
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Get all events
router.get('/', eventController.getAllEvents);

// Add a new event
router.post('/', eventController.addEvent);

module.exports = router;
