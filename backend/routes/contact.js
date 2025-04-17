/**
 * Routes for contact-related endpoints
 */
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Submit contact message
router.post('/', contactController.submitMessage);

module.exports = router;
