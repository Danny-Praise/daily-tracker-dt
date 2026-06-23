import "./Habits.css";

import { useCallback, useEffect, useMemo, useState } from "react";

import { habitAPI } from "./api/apiClient";
import {
  FaFire,
  FaTrophy,
  FaCheckCircle,
  FaTrash,
  FaPen
} from "react-icons/fa";

const CATEGORIES = [
  "Health",
  "Finance",
  "Academic",
  "Spiritual",
  "Career",
  "Relationships",
  "Productivity"
];

function Habits({ user }) {
  const [habits, setHabits] = useState([]);
  const [heatmap, setHeatmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // create form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Health");
  const [type, setType] = useState("boolean");
  const [targetValue, setTargetValue] = useState("");
  const [unit, setUnit] = useState("");

  // numeric check-in inputs (per habit)
  const [valueInputs, setValueInputs] = useState({});

  // edit state
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("Health");

  const loadData = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const [habitsRes, heatmapRes] = await Promise.all([
        habitAPI.getAll(user.id),
        habitAPI.heatmap(user.id, 119)
      ]);
      setHabits(habitsRes.data);
      setHeatmap(heatmapRes.data.heatmap);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Unable to load habits right now.");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const createHabit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please give your habit a name.");
      return;
    }
    try {
      await habitAPI.create({
        title,
        category,
        type,
        target_value: type === "numeric" ? Number(targetValue) : null,
        unit: type === "numeric" ? unit : null
      });
      setTitle("");
      setTargetValue("");
      setUnit("");
      setType("boolean");
      setError("");
      loadData();
    } catch (err) {
      setError(err.response?.data?.error || "Unable to create habit.");
    }
  };

  const toggleBoolean = async (habit) => {
    try {
      await habitAPI.checkIn(habit.id, { completed: !habit.completedToday });
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  const logNumeric = async (habit) => {
    const raw = valueInputs[habit.id];
    if (raw === undefined || raw === "") return;
    try {
      await habitAPI.checkIn(habit.id, { value: Number(raw) });
      setValueInputs((prev) => ({ ...prev, [habit.id]: "" }));
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  const removeHabit = async (id) => {
    try {
      await habitAPI.delete(id);
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (habit) => {
    setEditingId(habit.id);
    setEditTitle(habit.title);
    setEditCategory(habit.category || "Health");
  };

  const saveEdit = async (habit) => {
    try {
      await habitAPI.update(habit.id, {
        title: editTitle,
        category: editCategory,
        type: habit.type,
        target_value: habit.target_value
      });
      setEditingId(null);
      loadData();
    } catch (err) {
      setError(err.response?.data?.error || "Unable to update habit.");
    }
  };

  const completedToday = habits.filter((h) => h.completedToday).length;
  const bestStreak = habits.reduce(
    (max, h) => Math.max(max, h.currentStreak || 0),
    0
  );

  // Build a 17x7 grid (≈120 days) for the heatmap
  const heatmapGrid = useMemo(() => {
    const map = new Map(heatmap.map((d) => [d.date, d]));
    const cells = [];
    const start = new Date();
    start.setDate(start.getDate() - 118);
    for (let i = 0; i < 119; i += 1) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const key = `${d.getFullYear()}-${m}-${day}`;
      const entry = map.get(key);
      let level = 0;
      if (entry && entry.total > 0) {
        const ratio = entry.completed / entry.total;
        if (ratio >= 1) level = 4;
        else if (ratio >= 0.66) level = 3;
        else if (ratio >= 0.33) level = 2;
        else if (entry.completed > 0) level = 1;
      }
      cells.push({ key, level, ...entry });
    }
    return cells;
  }, [heatmap]);

  if (!user) {
    return (
      <div className="habits-container">
        <div className="habits-empty">
          <h2>Please log in to track your habits.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="habits-container">
      <div className="habits-header">
        <h2>Your Habits 🔁</h2>
        <p className="habits-subtitle">
          Build daily consistency across your life spheres.
        </p>
      </div>

      <div className="habits-stats">
        <div className="habit-stat">
          <FaCheckCircle className="habit-stat-icon" />
          <h3>
            {completedToday}/{habits.length}
          </h3>
          <p>Done today</p>
        </div>
        <div className="habit-stat">
          <FaFire className="habit-stat-icon" />
          <h3>{bestStreak}</h3>
          <p>Best active streak</p>
        </div>
        <div className="habit-stat">
          <FaTrophy className="habit-stat-icon" />
          <h3>{habits.length}</h3>
          <p>Active habits</p>
        </div>
      </div>

      <form className="habit-form" onSubmit={createHabit}>
        <input
          type="text"
          placeholder="New habit (e.g. Morning run)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="boolean">Yes / No</option>
          <option value="numeric">Numeric</option>
        </select>
        {type === "numeric" && (
          <>
            <input
              type="number"
              min="1"
              placeholder="Target"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
            />
            <input
              type="text"
              placeholder="Unit (e.g. pages)"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </>
        )}
        <button type="submit" className="habit-add-btn">
          Add Habit
        </button>
      </form>

      {error && <div className="habit-error">{error}</div>}

      {loading ? (
        <p className="habits-loading">Loading habits…</p>
      ) : habits.length === 0 ? (
        <div className="habits-empty">
          <p>No habits yet. Add your first one above to start a streak.</p>
        </div>
      ) : (
        <div className="habit-list">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`habit-card${habit.completedToday ? " done" : ""}`}
            >
              <div className="habit-card-main">
                {editingId === habit.id ? (
                  <div className="habit-edit">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <button onClick={() => saveEdit(habit)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <div className="habit-title-row">
                      <h4>{habit.title}</h4>
                      {habit.category && (
                        <span className="habit-badge">{habit.category}</span>
                      )}
                    </div>
                    <div className="habit-meta">
                      <span className="habit-streak">
                        <FaFire /> {habit.currentStreak} day streak
                      </span>
                      <span className="habit-longest">
                        Best: {habit.longestStreak}
                      </span>
                      {habit.type === "numeric" && (
                        <span className="habit-target">
                          Target: {habit.target_value}
                          {habit.unit ? ` ${habit.unit}` : ""}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="habit-card-actions">
                {habit.type === "boolean" ? (
                  <button
                    className={`check-btn${habit.completedToday ? " checked" : ""}`}
                    onClick={() => toggleBoolean(habit)}
                  >
                    {habit.completedToday ? "Done ✓" : "Mark done"}
                  </button>
                ) : (
                  <div className="numeric-checkin">
                    <input
                      type="number"
                      placeholder={
                        habit.todayValue !== null
                          ? `Today: ${habit.todayValue}`
                          : "Value"
                      }
                      value={valueInputs[habit.id] ?? ""}
                      onChange={(e) =>
                        setValueInputs((prev) => ({
                          ...prev,
                          [habit.id]: e.target.value
                        }))
                      }
                    />
                    <button onClick={() => logNumeric(habit)}>Log</button>
                  </div>
                )}
                <button
                  className="icon-btn"
                  title="Edit"
                  onClick={() => startEdit(habit)}
                >
                  <FaPen />
                </button>
                <button
                  className="icon-btn danger"
                  title="Delete"
                  onClick={() => removeHabit(habit.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="heatmap-section">
        <h3>Consistency (last 17 weeks)</h3>
        <div className="heatmap-grid">
          {heatmapGrid.map((cell) => (
            <div
              key={cell.key}
              className={`heatmap-cell level-${cell.level}`}
              title={
                cell.total
                  ? `${cell.key}: ${cell.completed}/${cell.total} completed`
                  : `${cell.key}: no check-ins`
              }
            />
          ))}
        </div>
        <div className="heatmap-legend">
          <span>Less</span>
          <span className="heatmap-cell level-0" />
          <span className="heatmap-cell level-1" />
          <span className="heatmap-cell level-2" />
          <span className="heatmap-cell level-3" />
          <span className="heatmap-cell level-4" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

export default Habits;
