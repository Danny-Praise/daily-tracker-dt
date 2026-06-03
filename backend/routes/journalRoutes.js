const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const {
  createJournalEntry,
  getJournalEntries,
  archiveJournalEntry
} = require("../controllers/journalController");

router.post("/create", authMiddleware, createJournalEntry);
router.get("/:user_id", authMiddleware, getJournalEntries);
router.put("/archive/:id", authMiddleware, archiveJournalEntry);
router.post("/archives/unlock", authMiddleware, unlockArchivedEntries);

module.exports = router;
