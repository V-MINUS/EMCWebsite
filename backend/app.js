const express = require("express");
const cors = require("cors");
const path = require("path");

const contactRoutes = require("./routes/contact");
const artistRoutes = require("./routes/artists");
const eventRoutes = require("./routes/events");

const app = express();
const PORT = process.env.PORT || 5000;

// Basic error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve static frontend files if present
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/contact", contactRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/events", eventRoutes);

app.listen(PORT, () => {
  console.log(`EMC backend running on port ${PORT}`);
});
