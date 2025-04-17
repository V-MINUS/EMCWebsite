const express = require("express");
const cors = require("cors");
const path = require("path");

const contactRoutes = require("./routes/contact");
const artistRoutes = require("./routes/artists");
const eventRoutes = require("./routes/events");

const app = express();
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' [https://fonts.googleapis.com](https://fonts.googleapis.com); font-src 'self' [https://fonts.gstatic.com](https://fonts.gstatic.com); img-src 'self' data:; script-src 'self';");
  next();
});
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' [https://fonts.googleapis.com](https://fonts.googleapis.com); font-src 'self' [https://fonts.gstatic.com](https://fonts.gstatic.com); img-src 'self' data:; script-src 'self';");
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
