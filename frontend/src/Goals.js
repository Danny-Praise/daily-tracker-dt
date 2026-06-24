import "./Goals.css";

import { useCallback, useEffect, useRef, useState } from "react";

import Analytics from "./Analytics";
import { goalAPI, aiAPI } from "./api/apiClient";
import {
  FaLightbulb,
  FaCalendarAlt,
  FaHeart,
  FaRobot,
  FaPlus
} from "react-icons/fa";

function Goals({ user }) {
  const [goal, setGoal] = useState("");
  const [category, setCategory] = useState("");
  const [goals, setGoals] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [suggestedCategory, setSuggestedCategory] = useState("");
  const [goalFormOpen, setGoalFormOpen] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("easy");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dailyTime, setDailyTime] = useState("");
  const [reminderLead, setReminderLead] = useState("30 min");
  const [goalAlert, setGoalAlert] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const goalPanelRef = useRef(null);

  const goalCategories = [
    {
      label: "Fitness",
      keywords: [
        "workout",
        "run",
        "gym",
        "exercise",
        "cardio",
        "strength",
        "train",
        "yoga",
        "swim"
      ]
    },
    {
      label: "Health",
      keywords: [
        "health",
        "diet",
        "sleep",
        "wellness",
        "meditate",
        "nutrition",
        "mental",
        "doctor"
      ]
    },
    {
      label: "Finance",
      keywords: [
        "save",
        "budget",
        "money",
        "invest",
        "debt",
        "finance",
        "expense",
        "income",
        "earn"
      ]
    },
    {
      label: "Academic",
      keywords: [
        "read",
        "study",
        "course",
        "exam",
        "book",
        "learn",
        "degree",
        "class",
        "research",
        "paper"
      ]
    },
    {
      label: "Spiritual",
      keywords: [
        "spirit",
        "mindful",
        "meditate",
        "meditation",
        "pray",
        "faith",
        "inner",
        "soul"
      ]
    },
    {
      label: "Career",
      keywords: [
        "career",
        "job",
        "interview",
        "promotion",
        "skill",
        "resume",
        "network",
        "project",
        "business"
      ]
    },
    {
      label: "Relationships",
      keywords: [
        "friend",
        "family",
        "relationship",
        "date",
        "social",
        "partner",
        "connect",
        "team"
      ]
    },
    {
      label: "Productivity",
      keywords: [
        "habit",
        "routine",
        "schedule",
        "focus",
        "task",
        "organize",
        "deadline"
      ]
    }
  ];

  const suggestCategory = (text) => {
    const normalized = text
      .toLowerCase()
      .trim();

    if (!normalized) {
      return "Productivity";
    }

    const matched = goalCategories.find((item) =>
      item.keywords.some((keyword) =>
        normalized.includes(keyword)
      )
    );

    return matched ? matched.label : "Productivity";
  };

  const suggestFocus = (text) => {
    const normalized = text.toLowerCase();

    if (!normalized) {
      return "Personal growth";
    }

    if (/(piano|music|guitar|drum|sing|song|learn music)/i.test(normalized)) {
      return "Learn Music";
    }

    if (/(finance|financial|invest|money|budget|save|earn)/i.test(normalized)) {
      return "Financial Literacy";
    }

    if (/(leadership|leader|team|manage|management|career)/i.test(normalized)) {
      return "Leadership & Career";
    }

    if (/(read|book|study|learn|course|exam)/i.test(normalized)) {
      return "Learning & Reading";
    }

    return "Personal Growth";
  };

  const shouldAskBook = (text) => {
    const normalized = text.toLowerCase();
    return /read.*book|book.*read|novel|book/i.test(normalized);
  };

  const generateGoalPlan = (
    goalText,
    level,
    book
  ) => {
    if (!goalText.trim()) {
      return "Your personalized plan will appear here once you begin typing your goal.";
    }

    const baseGoal = `To achieve "${goalText.trim()}", start by breaking your work into clear milestones.`;
    const bookSection = book
      ? ` Focus on "${book.trim()}" and divide reading into bite-sized sessions.`
      : "";

    let paceMessage = "";

    if (level === "easy") {
      paceMessage =
        "Take a relaxed pace with only a few tasks each week, keeping your routine smooth and sustainable.";
    } else if (level === "medium") {
      paceMessage =
        "Use a consistent weekly plan with steady checkpoints to keep progress moving without overload.";
    } else {
      paceMessage =
        "Commit to a focused, goal-driven schedule with productive daily habits and clear milestones.";
    }

    const timeline =
      startDate && endDate
        ? ` Your plan runs from ${startDate} to ${endDate}.`
        : startDate
        ? ` Start on ${startDate}.`
        : "";

    const scheduleHint = dailyTime
      ? ` Aim to engage around ${dailyTime} each day and keep your momentum steady.`
      : "Set a daily time that fits your routine for best results.";

    const reminderHint = reminderLead
      ? ` Receive reminders ${reminderLead} before your scheduled time to stay on track.`
      : "Add a reminder to keep the momentum going.";

    return `${baseGoal}${bookSection} ${timeline} ${scheduleHint} ${reminderHint} ${paceMessage}`;
  };

  const handleGoalChange = (e) => {
    const value = e.target.value;
    setGoal(value);

    if (!category || category === suggestedCategory) {
      const suggestion = suggestCategory(value);
      setSuggestedCategory(suggestion);
    }
  };

  useEffect(() => {
    if (goalFormOpen && goalPanelRef.current) {
      goalPanelRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [goalFormOpen]);

  const prepareGoalPlan = () => {
    setGoalAlert("");
    if (!category) {
      setSuggestedCategory(suggestCategory(goal));
    }
    setGoalFormOpen(true);
  };

  const resetGoalForm = () => {
    setGoal("");
    setCategory("");
    setSuggestedCategory("");
    setBookTitle("");
    setSelectedLevel("easy");
    setStartDate("");
    setEndDate("");
    setDailyTime("");
    setReminderLead("30 min");
    setGoalFormOpen(false);
  };

  const confirmGoal = async () => {
    if (!goal.trim()) {
      setGoalAlert("Please describe your goal before saving.");
      return;
    }

    try {
      const finalCategory =
        category ||
        suggestedCategory ||
        suggestCategory(goal);

      await goalAPI.create({
        title: goal,
        category: finalCategory,
        start_date: startDate,
        end_date: endDate,
        daily_time: dailyTime,
        reminder: reminderLead,
        book_title: bookTitle,
        plan_level: selectedLevel
      });

      resetGoalForm();
      setGoalAlert("Goal added successfully!");
      fetchGoals();
    } catch (error) {
      console.log(error);
      setGoalAlert(
        "Unable to save this goal right now. Please try again."
      );
    }
  };

  // FETCH GOALS

  const fetchGoals = useCallback(async () => {
    if (!user?.id) return;

    try {
      const response = await goalAPI.getAll(user.id);
      setGoals(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [user?.id]);

  // LOAD AI SUGGESTIONS
  const loadAISuggestions = async () => {
    try {
      setLoadingSuggestions(true);
      const response = await aiAPI.getGoalSuggestions(goal, category);
      setAiSuggestions(response.data.suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // ADD SUGGESTED GOAL
  const addSuggestedGoal = async (suggestion) => {
    try {
      await goalAPI.create({
        title: suggestion.title,
        category: suggestion.category
      });
      fetchGoals();
      setGoalAlert(`Added goal: ${suggestion.title}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchGoals();
    }
  }, [user?.id, fetchGoals]);

  // COMPLETE GOAL

  const markComplete = async (id) => {
    try {
      await goalAPI.complete(id);
      fetchGoals();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE GOAL

  const deleteGoal = async (id) => {
    try {
      await goalAPI.delete(id);
      fetchGoals();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT GOAL

  const editGoal = async (id) => {
    try {
      await goalAPI.update(id, editText, editCategory);
      setEditingId(null);
      fetchGoals();
    } catch (error) {
      console.log(error);
    }
  };

  // STREAK

  const calculateStreak = () => {

    const completedGoalsData =
      goals.filter(
        (goal) =>
          goal.completed &&
          goal.completed_at
      );

    const uniqueDays = new Set(

      completedGoalsData.map((goal) => {

        const date =
          new Date(
            goal.completed_at
          );

        return date
          .toISOString()
          .split("T")[0];
      })

    );

    return uniqueDays.size;
  };

  // DASHBOARD STATS

  const totalGoalsCount =
    goals.length;

  const completedGoalsCount =
    goals.filter(
      (goal) => goal.completed
    ).length;

  const pendingGoalsCount =
    totalGoalsCount -
    completedGoalsCount;

  const productivityScore =
    totalGoalsCount === 0
      ? 0
      : Math.round(
          (
            completedGoalsCount /
            totalGoalsCount
          ) * 100
        );

  // LOAD GOALS

  return (

    <div className="goals-container">

      <div className="goals-header">
        <h2>Your Goals 🎯</h2>
        <p className="header-subtitle">Track your ambitions, celebrate your wins</p>

        <div className="hero-actions">
          <button
            type="button"
            className="primary-hero-btn"
            onClick={prepareGoalPlan}
          >
            Set a Goal
          </button>
          <button
            type="button"
            className="secondary-hero-btn"
            onClick={() => {
              document
                .querySelector('.goal-input-section')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Quick Start
          </button>
        </div>
      </div>

      <div className="hero-features">
        <div className="feature-card feature-icon-1">
          <div className="feature-icon">
            <FaLightbulb />
          </div>
          <strong>Smart Prompts</strong>
          <p>Describe your ambition and let the system suggest the best focus and category.</p>
        </div>
        <div className="feature-card feature-icon-2">
          <div className="feature-icon">
            <FaCalendarAlt />
          </div>
          <strong>Calendar Ready</strong>
          <p>Set start/end dates, daily session times and reminders with a premium planning flow.</p>
        </div>
        <div className="feature-card feature-icon-3">
          <div className="feature-icon">
            <FaHeart />
          </div>
          <strong>Motivation Hub</strong>
          <p>Stay inspired with focused guidance, progress visuals, and smart reminders.</p>
        </div>
      </div>

      {/* AI SUGGESTIONS TOGGLE */}
      <div style={{ margin: "20px 0", display: "flex", gap: "15px", alignItems: "center" }}>
        <button
          onClick={loadAISuggestions}
          style={{
            padding: "12px 24px",
            borderRadius: "16px",
            border: "none",
            background: "linear-gradient(135deg, #10b981, #059669)",
            color: "white",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)"
          }}
        >
          <FaRobot />
          {loadingSuggestions ? "Generating..." : "Get AI Suggestions"}
        </button>
      </div>

      {/* AI SUGGESTIONS */}
      {showSuggestions && aiSuggestions.length > 0 && (
        <div className="ai-suggestions-container">
          <h3 className="ai-suggestions-title">
            <FaRobot />
            AI-Powered Goal Suggestions
          </h3>

          <div className="ai-suggestions-grid">
            {aiSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="ai-suggestion-card"
              >
                <h4>{suggestion.title}</h4>
                <p><strong>Category:</strong> {suggestion.category}</p>
                <p><strong>Plan:</strong> {suggestion.plan}</p>
                <p><strong>Priority:</strong> {suggestion.priority}</p>
                <button onClick={() => addSuggestedGoal(suggestion)}>
                  <FaPlus />
                  Add This Goal
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STATS */}

      <div className="dashboard-stats">

        <div className="stat-card stat-total">
          <div className="stat-icon">🎯</div>
          <h3>
            {totalGoalsCount}
          </h3>
          <p>
            Total Goals
          </p>
        </div>

        <div className="stat-card stat-completed">
          <div className="stat-icon">✅</div>
          <h3>
            {completedGoalsCount}
          </h3>
          <p>
            Completed
          </p>
        </div>

        <div className="stat-card stat-pending">
          <div className="stat-icon">⏳</div>
          <h3>
            {pendingGoalsCount}
          </h3>
          <p>
            Pending
          </p>
        </div>

        <div className="stat-card stat-productivity">
          <div className="stat-icon">📈</div>
          <h3>
            {productivityScore}%
          </h3>
          <p>
            Productivity
          </p>
        </div>

        <div className="stat-card stat-streak">
          <div className="stat-icon">🔥</div>
          <h3>
            {calculateStreak()}
          </h3>
          <p>
            Day Streak
          </p>
        </div>

      </div>

      {/* INPUT SECTION */}

      <div className="goal-input-section">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="What's your next goal?"
            value={goal}
            onChange={handleGoalChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                prepareGoalPlan();
              }
            }}
          />
          <span className="input-icon">✍️</span>
        </div>

        <div className="select-wrapper">
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            <option value="">
              Select Category
            </option>

            <option value="Fitness">
              💪 Fitness
            </option>

            <option value="Health">
              🏥 Health
            </option>

            <option value="Finance">
              💰 Finance
            </option>

            <option value="Academic">
              📚 Academic
            </option>

            <option value="Spiritual">
              🧘 Spiritual
            </option>

          </select>
          <span className="select-arrow">▼</span>
        </div>

        <button
          onClick={prepareGoalPlan}
          className="add-goal-btn"
        >
          <span>Add Goal</span>
          <span className="btn-icon">+</span>
        </button>

      </div>

      {goalAlert && (
        <div className="goal-alert">
          {goalAlert}
        </div>
      )}

      {goalFormOpen && (
        <div className="goal-panel" ref={goalPanelRef}>
          <div className="goal-panel-head">
            <div>
              <h3>Goal Planning Studio</h3>
              <p>
                Describe your ambition, choose a timeframe, and receive intelligent guidance for a premium plan.
              </p>
            </div>
            <button
              type="button"
              className="close-panel-btn"
              onClick={resetGoalForm}
            >
              Close
            </button>
          </div>

          <div className="goal-panel-grid">
            <div className="goal-panel-card">
              <label>Describe your goal</label>
              <textarea
                value={goal}
                onChange={handleGoalChange}
                placeholder="I want to grow in financial knowledge, learn piano, or build leadership skills..."
                rows={5}
              />

              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose a category</option>
                <option value="Fitness">💪 Fitness</option>
                <option value="Health">🏥 Health</option>
                <option value="Finance">💰 Finance</option>
                <option value="Academic">📚 Academic</option>
                <option value="Spiritual">🧘 Spiritual</option>
                <option value="Career">💼 Career</option>
                <option value="Relationships">🤝 Relationships</option>
                <option value="Productivity">⚡ Productivity</option>
              </select>

              <div className="suggestion-panel">
                <p>
                  Suggested focus: <strong>{suggestFocus(goal)}</strong>
                </p>
                <p>
                  Suggested category: <strong>{suggestedCategory || suggestCategory(goal)}</strong>
                </p>
                <button
                  type="button"
                  className="suggestion-apply-btn"
                  onClick={() => {
                    setCategory(suggestedCategory || suggestCategory(goal));
                    setGoalAlert("Suggested category applied.");
                  }}
                >
                  Apply suggestion
                </button>
              </div>
            </div>

            <div className="goal-panel-card">
              <div className="goal-panel-field-row">
                <div>
                  <label>Start date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label>End date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="goal-panel-field-row">
                <div>
                  <label>Daily time</label>
                  <input
                    type="time"
                    value={dailyTime}
                    onChange={(e) => setDailyTime(e.target.value)}
                  />
                </div>
                <div>
                  <label>Reminder</label>
                  <select
                    value={reminderLead}
                    onChange={(e) => setReminderLead(e.target.value)}
                  >
                    <option value="15 min">15 minutes before</option>
                    <option value="30 min">30 minutes before</option>
                    <option value="1 hour">1 hour before</option>
                    <option value="2 hours">2 hours before</option>
                  </select>
                </div>
              </div>

              {shouldAskBook(goal) && (
                <div className="assistant-field">
                  <label>Book title</label>
                  <input
                    type="text"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    placeholder="e.g. Atomic Habits"
                  />
                </div>
              )}

              <div className="assistant-levels">
                <label>Plan intensity</label>
                {['easy', 'medium', 'extreme'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={
                      selectedLevel === level
                        ? 'assistant-level active'
                        : 'assistant-level'
                    }
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="assistant-preview">
            <h4>Plan preview</h4>
            <p>{generateGoalPlan(goal, selectedLevel, bookTitle)}</p>
          </div>

          <div className="assistant-actions">
            <button
              type="button"
              className="confirm-plan-btn"
              onClick={confirmGoal}
            >
              Save this Goal Plan
            </button>
            <button
              type="button"
              className="cancel-plan-btn"
              onClick={resetGoalForm}
            >
              Close panel
            </button>
          </div>
        </div>
      )}

      {/* FILTER SECTION */}
      <div className="filter-section">
        <button 
          className={`filter-btn ${filterCategory === 'all' ? 'active' : ''}`}
          onClick={() => setFilterCategory('all')}
        >
          All Goals
        </button>
        <button 
          className={`filter-btn ${filterCategory === 'Fitness' ? 'active' : ''}`}
          onClick={() => setFilterCategory('Fitness')}
        >
          💪 Fitness
        </button>
        <button 
          className={`filter-btn ${filterCategory === 'Health' ? 'active' : ''}`}
          onClick={() => setFilterCategory('Health')}
        >
          🏥 Health
        </button>
        <button 
          className={`filter-btn ${filterCategory === 'Finance' ? 'active' : ''}`}
          onClick={() => setFilterCategory('Finance')}
        >
          💰 Finance
        </button>
        <button 
          className={`filter-btn ${filterCategory === 'Academic' ? 'active' : ''}`}
          onClick={() => setFilterCategory('Academic')}
        >
          📚 Academic
        </button>
        <button 
          className={`filter-btn ${filterCategory === 'Spiritual' ? 'active' : ''}`}
          onClick={() => setFilterCategory('Spiritual')}
        >
          🧘 Spiritual
        </button>
      </div>

      {/* ACTIVE GOALS */}

      <div className="goal-section">

        <div className="section-header">
          <h3>🚀 Active Goals</h3>
          <span className="section-count">{goals.filter((item) => !item.completed && (filterCategory === 'all' || item.category === filterCategory)).length}</span>
        </div>

        <div className="goals-grid">

          {goals
            .filter(
              (item) =>
                !item.completed && (filterCategory === 'all' || item.category === filterCategory)
            )
            .map((item) => (

            <div
              className="goal-card active-goal-card"
              key={item.id}
            >

              {editingId === item.id ? (

                <div className="edit-mode">

                  <input
                    type="text"
                    className="edit-input"
                    value={editText}
                    onChange={(e) =>
                      setEditText(
                        e.target.value
                      )
                    }
                  />

                  <select
                    className="edit-select"
                    value={editCategory}
                    onChange={(e) =>
                      setEditCategory(
                        e.target.value
                      )
                    }
                  >

                    <option value="Fitness">
                      💪 Fitness
                    </option>

                    <option value="Health">
                      🏥 Health
                    </option>

                    <option value="Finance">
                      💰 Finance
                    </option>

                    <option value="Academic">
                      📚 Academic
                    </option>

                    <option value="Spiritual">
                      🧘 Spiritual
                    </option>

                  </select>

                  <div className="edit-buttons">
                    <button
                      className="save-btn"
                      onClick={() =>
                        editGoal(item.id)
                      }
                    >
                      ✓ Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() =>
                        setEditingId(null)
                      }
                    >
                      ✕ Cancel
                    </button>
                  </div>

                </div>

              ) : (

                <>

                  <div className="goal-header-card">
                    <h4>
                      {item.title}
                    </h4>
                    <span className="category-badge">{item.category}</span>
                  </div>

                  <p className="goal-description">
                    Ready to conquer this goal!
                  </p>

                  <div className="goal-buttons">

                    <button
                      className="complete-btn"
                      onClick={() =>
                        markComplete(item.id)
                      }
                      title="Mark as complete"
                    >
                      ✓
                    </button>

                    <button
                      className="edit-btn"
                      onClick={() => {

                        setEditingId(
                          item.id
                        );

                        setEditText(
                          item.title
                        );

                        setEditCategory(
                          item.category
                        );
                      }}
                      title="Edit goal"
                    >
                      ✏️
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteGoal(item.id)
                      }
                      title="Delete goal"
                    >
                      🗑️
                    </button>

                  </div>

                </>

              )}

            </div>

          ))}

          {goals.filter((item) => !item.completed && (filterCategory === 'all' || item.category === filterCategory)).length === 0 && (
            <div className="empty-state">
              <p>✨ No active goals yet!</p>
              <small>Create a new goal to get started</small>
            </div>
          )}

        </div>

      </div>

      {/* COMPLETED GOALS */}

      <div className="goal-section">

        <div className="section-header">
          <h3>✅ Completed Goals</h3>
          <span className="section-count">{goals.filter((item) => item.completed && (filterCategory === 'all' || item.category === filterCategory)).length}</span>
        </div>

        <div className="goals-grid">

          {goals
            .filter(
              (item) =>
                item.completed && (filterCategory === 'all' || item.category === filterCategory)
            )
            .map((item) => (

            <div
              className="goal-card completed-card"
              key={item.id}
            >

              <div className="completed-badge">🏆 Completed</div>

              <h4>
                {item.title}
              </h4>

              <p className="completed-category">
                {item.category}
              </p>

              <div className="completed-actions">
                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteGoal(item.id)
                  }
                  title="Remove from completed"
                >
                  🗑️ Remove
                </button>
              </div>

            </div>

          ))}

          {goals.filter((item) => item.completed && (filterCategory === 'all' || item.category === filterCategory)).length === 0 && (
            <div className="empty-state">
              <p>🎯 No completed goals yet</p>
              <small>Complete an active goal to celebrate!</small>
            </div>
          )}

        </div>

      </div>

      {/* ANALYTICS */}

      <Analytics goals={goals} />

    </div>

  );
}

export default Goals;