import "./Features.css";

function Features() {
  return (
    <div className="features-page">

      {/* Hero Section */}
      <div className="features-hero">
        <h1>DT AI Features 🚀</h1>

        <p>
          Explore the intelligent modules that make
          Daily Tracker AI a complete productivity
          and personal development ecosystem.
        </p>
      </div>

      {/* Features Grid */}

      <div className="features-showcase">

        <div className="feature-box">
          <h2>🎯 Goal Management</h2>
          <p>
            Create, track and monitor personal,
            academic and professional goals.
          </p>
        </div>

        <div className="feature-box">
          <h2>✅ Task Management</h2>
          <p>
            Organize daily activities, priorities,
            deadlines and reminders.
          </p>
        </div>

        <div className="feature-box">
          <h2>📔 Smart Journal</h2>
          <p>
            Record daily reflections, experiences
            and important thoughts.
          </p>
        </div>

        <div className="feature-box">
          <h2>💪 Habit Tracking</h2>
          <p>
            Build productive routines and monitor
            consistency over time.
          </p>
        </div>

        <div className="feature-box">
          <h2>💰 Finance Tracker</h2>
          <p>
            Track income, expenses, budgets and
            financial goals.
          </p>
        </div>

        <div className="feature-box">
          <h2>📈 Analytics Dashboard</h2>
          <p>
            Visual reports showing productivity,
            habits and progress trends.
          </p>
        </div>

        <div className="feature-box">
          <h2>🤖 AI Assistant</h2>
          <p>
            Generates recommendations, insights
            and productivity suggestions.
          </p>
        </div>

        <div className="feature-box">
          <h2>🔔 Smart Notifications</h2>
          <p>
            Never miss important tasks, goals
            or deadlines.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Features;