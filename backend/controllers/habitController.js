const pool = require("../config/db");
const { validateHabitInput } = require("../utils/validation");

// Format a JS Date as a local YYYY-MM-DD string
const toDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Subtract n days from a YYYY-MM-DD string, returning a YYYY-MM-DD string
const shiftDate = (dateString, days) => {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toDateString(date);
};

// Given a set of completed YYYY-MM-DD strings, compute current and longest streaks.
// The current streak counts consecutive completed days ending today, with a one-day
// grace period: if today isn't done yet but yesterday was, the streak still stands.
const computeStreaks = (completedDates) => {
  const completed = new Set(completedDates);
  const today = toDateString(new Date());

  let currentStreak = 0;
  let cursor = completed.has(today) ? today : shiftDate(today, -1);
  while (completed.has(cursor)) {
    currentStreak += 1;
    cursor = shiftDate(cursor, -1);
  }

  let longestStreak = 0;
  let run = 0;
  let prev = null;
  const sorted = [...completed].sort();
  for (const date of sorted) {
    if (prev !== null && shiftDate(prev, 1) === date) {
      run += 1;
    } else {
      run = 1;
    }
    longestStreak = Math.max(longestStreak, run);
    prev = date;
  }

  return { currentStreak, longestStreak };
};

const verifyOwnership = async (habitId, userId) => {
  const result = await pool.query("SELECT user_id FROM habits WHERE id = $1", [habitId]);
  if (result.rows.length === 0) return { status: 404, error: "Habit not found" };
  if (result.rows[0].user_id !== userId) return { status: 403, error: "Unauthorized" };
  return null;
};

// CREATE HABIT
const createHabit = async (req, res) => {
  try {
    const { title, category, type, target_value, unit } = req.body;
    const userId = req.userId;

    const validation = validateHabitInput(title, category, type, target_value);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const habitType = type === "numeric" ? "numeric" : "boolean";
    const target = habitType === "numeric" ? Number(target_value) : null;

    const newHabit = await pool.query(
      `INSERT INTO habits
       (user_id, title, category, type, target_value, unit)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, user_id, title, category, type, target_value, unit, active, created_at`,
      [
        userId,
        title.trim(),
        category ? category.trim() : null,
        habitType,
        target,
        unit ? unit.trim() : null
      ]
    );

    res.status(201).json({ message: "Habit created successfully 🚀", habit: newHabit.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// GET HABITS (with today's status + streaks computed from logs)
const getHabits = async (req, res) => {
  try {
    const { user_id } = req.params;
    const authUserId = req.userId;

    if (parseInt(user_id, 10) !== authUserId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const habitsResult = await pool.query(
      `SELECT id, title, category, type, target_value, unit, active, created_at
       FROM habits
       WHERE user_id = $1 AND active = TRUE
       ORDER BY created_at DESC`,
      [user_id]
    );

    const logsResult = await pool.query(
      `SELECT habit_id, to_char(log_date, 'YYYY-MM-DD') AS log_date, value, completed
       FROM habit_logs
       WHERE user_id = $1`,
      [user_id]
    );

    const today = toDateString(new Date());
    const logsByHabit = new Map();
    for (const log of logsResult.rows) {
      if (!logsByHabit.has(log.habit_id)) logsByHabit.set(log.habit_id, []);
      logsByHabit.get(log.habit_id).push(log);
    }

    const habits = habitsResult.rows.map((habit) => {
      const logs = logsByHabit.get(habit.id) || [];
      const completedDates = logs.filter((l) => l.completed).map((l) => l.log_date);
      const { currentStreak, longestStreak } = computeStreaks(completedDates);
      const todayLog = logs.find((l) => l.log_date === today) || null;

      return {
        ...habit,
        currentStreak,
        longestStreak,
        completedToday: todayLog ? todayLog.completed : false,
        todayValue: todayLog ? todayLog.value : null
      };
    });

    res.status(200).json(habits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// EDIT HABIT
const editHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, type, target_value, unit } = req.body;
    const userId = req.userId;

    const validation = validateHabitInput(title, category, type, target_value);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const ownershipError = await verifyOwnership(id, userId);
    if (ownershipError) {
      return res.status(ownershipError.status).json({ error: ownershipError.error });
    }

    const habitType = type === "numeric" ? "numeric" : "boolean";
    const target = habitType === "numeric" ? Number(target_value) : null;

    const updated = await pool.query(
      `UPDATE habits
       SET title = $1,
           category = $2,
           type = $3,
           target_value = $4,
           unit = $5,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING id, user_id, title, category, type, target_value, unit, active, created_at, updated_at`,
      [
        title.trim(),
        category ? category.trim() : null,
        habitType,
        target,
        unit ? unit.trim() : null,
        id
      ]
    );

    res.status(200).json({ message: "Habit updated successfully ✏️", habit: updated.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE HABIT (cascade deletes its logs)
const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const ownershipError = await verifyOwnership(id, userId);
    if (ownershipError) {
      return res.status(ownershipError.status).json({ error: ownershipError.error });
    }

    await pool.query("DELETE FROM habits WHERE id = $1", [id]);
    res.status(200).json({ message: "Habit deleted successfully 🗑️" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// CHECK IN (upsert a log for a given day; toggles/sets completion)
const checkInHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const { log_date, value, completed } = req.body;
    const userId = req.userId;

    const ownershipError = await verifyOwnership(id, userId);
    if (ownershipError) {
      return res.status(ownershipError.status).json({ error: ownershipError.error });
    }

    const habitResult = await pool.query(
      "SELECT type, target_value FROM habits WHERE id = $1",
      [id]
    );
    const habit = habitResult.rows[0];

    const date = log_date || toDateString(new Date());

    let logValue = null;
    let isCompleted;
    if (habit.type === "numeric") {
      logValue = value !== undefined && value !== null ? Number(value) : null;
      isCompleted =
        completed !== undefined
          ? Boolean(completed)
          : logValue !== null && habit.target_value !== null
            ? logValue >= Number(habit.target_value)
            : false;
    } else {
      isCompleted = completed !== undefined ? Boolean(completed) : true;
    }

    const result = await pool.query(
      `INSERT INTO habit_logs (habit_id, user_id, log_date, value, completed)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (habit_id, log_date)
       DO UPDATE SET value = EXCLUDED.value, completed = EXCLUDED.completed
       RETURNING id, habit_id, to_char(log_date, 'YYYY-MM-DD') AS log_date, value, completed`,
      [id, userId, date, logValue, isCompleted]
    );

    res.status(200).json({ message: "Check-in saved ✅", log: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// HEATMAP: per-day completion counts across all of a user's habits
const getHeatmap = async (req, res) => {
  try {
    const { user_id } = req.params;
    const authUserId = req.userId;

    if (parseInt(user_id, 10) !== authUserId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const days = Math.min(parseInt(req.query.days, 10) || 120, 366);
    const since = shiftDate(toDateString(new Date()), -(days - 1));

    const result = await pool.query(
      `SELECT to_char(log_date, 'YYYY-MM-DD') AS log_date,
              COUNT(*) FILTER (WHERE completed) AS completed_count,
              COUNT(*) AS total_count
       FROM habit_logs
       WHERE user_id = $1 AND log_date >= $2
       GROUP BY log_date
       ORDER BY log_date`,
      [user_id, since]
    );

    const heatmap = result.rows.map((row) => ({
      date: row.log_date,
      completed: parseInt(row.completed_count, 10),
      total: parseInt(row.total_count, 10)
    }));

    res.status(200).json({ since, days, heatmap });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createHabit,
  getHabits,
  editHabit,
  deleteHabit,
  checkInHabit,
  getHeatmap,
  computeStreaks
};
