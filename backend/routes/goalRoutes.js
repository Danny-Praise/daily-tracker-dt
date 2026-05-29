const express = require("express");

const router = express.Router();

const {
  createGoal,
  getGoals,
  completeGoal,
  deleteGoal,
  editGoal
} = require("../controllers/goalController");
router.post("/create", createGoal);

router.get("/:user_id", getGoals);

router.put("/complete/:id", completeGoal);
router.delete(
  "/delete/:id",
  deleteGoal
);
router.put(
  "/edit/:id",
  editGoal
);

module.exports = router;