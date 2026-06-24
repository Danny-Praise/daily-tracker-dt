require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const pool = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const goalRoutes = require("./routes/goalRoutes");
const journalRoutes = require("./routes/journalRoutes");
const aiRoutes = require("./routes/aiRoutes");
const app = express();

// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later."
});

const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 login/register requests per windowMs
  message: "Too many authentication requests, please try again later."
});

app.use(cors());
app.use(express.json());
app.use(generalLimiter);

// Apply strict limiter to auth routes
app.use("/api/users/login", strictLimiter);
app.use("/api/users/register", strictLimiter);

app.use("/api/users", userRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("Daily Tracker Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});