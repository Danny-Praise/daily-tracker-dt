const pool = require("../config/db");
const bcrypt = require("bcrypt");
const { validateJournalInput } = require("../utils/validation");

const createJournalEntry = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.userId;

    const validation = validateJournalInput(content);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const result = await pool.query(
      `INSERT INTO journal_entries
       (user_id, content, archived)
       VALUES ($1, $2, FALSE)
       RETURNING id, user_id, content, archived, created_at, updated_at`,
      [userId, content.trim()]
    );

    res.status(201).json({ message: "Journal entry created", entry: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getJournalEntries = async (req, res) => {
  try {
    const { user_id } = req.params;
    const authUserId = req.userId;

    if (parseInt(user_id, 10) !== authUserId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const result = await pool.query(
      `SELECT id, content, archived, created_at, updated_at
       FROM journal_entries
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [user_id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const archiveJournalEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { archived } = req.body;
    const userId = req.userId;

    const entryCheck = await pool.query(
      "SELECT user_id FROM journal_entries WHERE id = $1",
      [id]
    );

    if (entryCheck.rows.length === 0) {
      return res.status(404).json({ error: "Journal entry not found" });
    }

    if (entryCheck.rows[0].user_id !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const result = await pool.query(
      `UPDATE journal_entries
       SET archived = $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING id, content, archived, created_at, updated_at`,
      [archived, id]
    );

    res.status(200).json({ message: "Journal entry updated", entry: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const unlockArchivedEntries = async (req, res) => {
  try {
    const { archive_password } = req.body;
    const userId = req.userId;

    if (!archive_password) {
      return res.status(400).json({ error: "Archive password is required" });
    }

    const userResult = await pool.query(
      "SELECT archive_password_hash FROM users WHERE id = $1",
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const archiveHash = userResult.rows[0].archive_password_hash;
    if (!archiveHash) {
      return res.status(403).json({ error: "Archive password not set" });
    }

    const validPassword = await bcrypt.compare(archive_password, archiveHash);
    if (!validPassword) {
      return res.status(401).json({ error: "Incorrect archive password" });
    }

    const result = await pool.query(
      `SELECT id, content, archived, created_at, updated_at
       FROM journal_entries
       WHERE user_id = $1 AND archived = TRUE
       ORDER BY created_at DESC`,
      [userId]
    );

    res.status(200).json({ entries: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createJournalEntry,
  getJournalEntries,
  archiveJournalEntry,
  unlockArchivedEntries
};
