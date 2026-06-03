const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const {
  createGoal,
  getGoals,
  completeGoal,
  deleteGoal,
  editGoal
} = require("../controllers/goalController");

// All goal routes require authentication
router.post("/create", authMiddleware, createGoal);
router.get("/:user_id", authMiddleware, getGoals);
router.put("/complete/:id", authMiddleware, completeGoal);
router.delete("/delete/:id", authMiddleware, deleteGoal);
router.put("/edit/:id", authMiddleware, editGoal);

module.exports = router;