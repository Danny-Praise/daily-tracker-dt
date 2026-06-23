const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const {
  createHabit,
  getHabits,
  editHabit,
  deleteHabit,
  checkInHabit,
  getHeatmap
} = require("../controllers/habitController");

// All habit routes require authentication
router.post("/create", authMiddleware, createHabit);
router.get("/heatmap/:user_id", authMiddleware, getHeatmap);
router.get("/:user_id", authMiddleware, getHabits);
router.put("/edit/:id", authMiddleware, editHabit);
router.delete("/delete/:id", authMiddleware, deleteHabit);
router.post("/checkin/:id", authMiddleware, checkInHabit);

module.exports = router;
