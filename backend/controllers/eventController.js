/**
 * Controller for event-related operations
 */
const fs = require('fs');
const path = require('path');

const EVENTS_FILE = path.join(__dirname, '../data/events.json');

/**
 * Get all events
 */
const getAllEvents = (req, res, next) => {
  try {
    let events = [];
    if (fs.existsSync(EVENTS_FILE)) {
      events = JSON.parse(fs.readFileSync(EVENTS_FILE));
    }
    res.json(events);
  } catch (error) {
    next(error);
  }
};

/**
 * Add a new event
 */
const addEvent = (req, res, next) => {
  try {
    const { title, date, location, description } = req.body;
    
    if (!title || !date || !location || !description) {
      return res.status(400).json({ error: "All fields required" });
    }
    
    let events = [];
    if (fs.existsSync(EVENTS_FILE)) {
      events = JSON.parse(fs.readFileSync(EVENTS_FILE));
    }
    
    const newEvent = { title, date, location, description };
    events.push(newEvent);
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2));
    res.json({ success: true, event: newEvent });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEvents,
  addEvent
};
