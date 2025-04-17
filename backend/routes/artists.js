/**
 * Routes for artist-related endpoints
 */
const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const upload = require('../middlewares/upload');

// Get all artists
router.get('/', artistController.getAllArtists);

// Add a new artist
router.post('/', upload.single('image'), artistController.addArtist);

module.exports = router;
