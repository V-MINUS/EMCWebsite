const express = require("express");
const cors = require("cors");
const path = require("path");

const contactRoutes = require("./routes/contact");
const artistRoutes = require("./routes/artists");
const eventRoutes = require("./routes/events");

const app = express();
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

app.listen(PORT, () => {
  console.log(`EMC backend running on port ${PORT}`);
});
