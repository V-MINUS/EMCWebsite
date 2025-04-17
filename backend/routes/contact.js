const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const CONTACT_FILE = path.join(__dirname, "../data/contact_messages.json");

router.post("/", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields required" });
  }
  const newMsg = { name, email, message, date: new Date().toISOString() };
  let messages = [];
  if (fs.existsSync(CONTACT_FILE)) {
    messages = JSON.parse(fs.readFileSync(CONTACT_FILE));
  }
  messages.push(newMsg);
  fs.writeFileSync(CONTACT_FILE, JSON.stringify(messages, null, 2));
  res.json({ success: true, message: "Message received" });
});

module.exports = router;
