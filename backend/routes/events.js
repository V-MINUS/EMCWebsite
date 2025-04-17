const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const EVENTS_FILE = path.join(__dirname, "../data/events.json");

router.get("/", (req, res) => {
  let events = [];
  if (fs.existsSync(EVENTS_FILE)) {
    events = JSON.parse(fs.readFileSync(EVENTS_FILE));
  }
  res.json(events);
});

router.post("/", (req, res) => {
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
});

module.exports = router;
