const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  generateGoalSuggestions,
  generateGoalPlan,
  getJournalInsights
} = require("../controllers/aiController");

const router = express.Router();

router.post("/suggestions", authMiddleware, generateGoalSuggestions);
router.post("/plan", authMiddleware, generateGoalPlan);
router.get("/journal-insights", authMiddleware, getJournalInsights);

module.exports = router;
