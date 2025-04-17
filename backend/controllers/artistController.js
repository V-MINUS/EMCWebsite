/**
 * Controller for artist-related operations
 */
const fs = require('fs');
const path = require('path');

const ARTISTS_FILE = path.join(__dirname, '../data/artists.json');

/**
 * Get all artists
 */
const getAllArtists = (req, res, next) => {
  try {
    let artists = [];
    if (fs.existsSync(ARTISTS_FILE)) {
      artists = JSON.parse(fs.readFileSync(ARTISTS_FILE));
    }
    res.json(artists);
  } catch (error) {
    next(error);
  }
};

/**
 * Add a new artist
 */
const addArtist = (req, res, next) => {
  try {
    const { name, bio, mixcloud, soundcloud, twitter, instagram, facebook, linkedin } = req.body;
    
    if (!name || !bio) {
      return res.status(400).json({ error: "Name and bio required" });
    }
    
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
    
    let artists = [];
    if (fs.existsSync(ARTISTS_FILE)) {
      artists = JSON.parse(fs.readFileSync(ARTISTS_FILE));
    }
    
    const newArtist = {
      name,
      bio,
      image: imageUrl,
      mixcloud,
      soundcloud,
      twitter,
      instagram,
      facebook,
      linkedin
    };
    
    artists.push(newArtist);
    fs.writeFileSync(ARTISTS_FILE, JSON.stringify(artists, null, 2));
    res.json({ success: true, artist: newArtist });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllArtists,
  addArtist
};
