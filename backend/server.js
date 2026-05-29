require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const app = express();
const goalRoutes = require("./routes/goalRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/goals", goalRoutes);

app.get("/", (req, res) => {
  res.send("Daily Tracker Backend Running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});