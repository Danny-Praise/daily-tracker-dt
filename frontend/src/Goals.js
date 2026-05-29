import "./Goals.css";

import { useEffect, useState } from "react";

import axios from "axios";

import Analytics from "./Analytics";

function Goals({ user }) {

  const [goal, setGoal] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [goals, setGoals] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [editText, setEditText] =
    useState("");

  const [editCategory, setEditCategory] =
    useState("");

  const [filterCategory, setFilterCategory] =
    useState("all");

  // FETCH GOALS

  const fetchGoals = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/goals/${user.id}`
      );

      setGoals(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // ADD GOAL

  const addGoal = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/goals/create",
        {
          user_id: user.id,
          title: goal,
          category: category
        }
      );

      setGoal("");
      setCategory("");

      fetchGoals();

    } catch (error) {

      console.log(error);
    }
  };

  // COMPLETE GOAL

  const markComplete = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/goals/complete/${id}`
      );

      fetchGoals();

    } catch (error) {

      console.log(error);
    }
  };

  // DELETE GOAL

  const deleteGoal = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/goals/delete/${id}`
      );

      fetchGoals();

    } catch (error) {

      console.log(error);
    }
  };

  // EDIT GOAL

  const editGoal = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/goals/edit/${id}`,
        {
          title: editText,
          category: editCategory
        }
      );

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

  useEffect(() => {

    fetchGoals();

  }, []);

  return (

    <div className="goals-container">

      <div className="goals-header">
        <h2>Your Goals 🎯</h2>
        <p className="header-subtitle">Track your ambitions, celebrate your wins</p>
      </div>

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
            onChange={(e) =>
              setGoal(e.target.value)
            }
            onKeyPress={(e) => {
              if (e.key === 'Enter') addGoal();
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

        <button onClick={addGoal} className="add-goal-btn">
          <span>Add Goal</span>
          <span className="btn-icon">+</span>
        </button>

      </div>

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