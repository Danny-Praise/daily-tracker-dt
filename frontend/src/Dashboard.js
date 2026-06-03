// Dashboard.js

import "./Dashboard.css";

import {
  motion
} from "framer-motion";

import {
  useNavigate
} from "react-router-dom";

import {

  FaBullseye,
  FaBook,
  FaChartLine,
  FaFire,
  FaBrain,
  FaCalendarAlt,
  FaUserCircle,
  FaTasks,
  FaClock,
  FaTrophy,
  FaBolt,
  FaRocket,
  FaCheckCircle

} from "react-icons/fa";

function Dashboard({ user }) {

  const navigate =
    useNavigate();

  // SECURITY CHECK

  if (!user) {

    return (

      <div className="dashboard-empty">

        <h1>
          Please Login First
        </h1>

      </div>
    );
  }

  // MODULES

  const modules = [

    {
      title: "Goals",
      icon: <FaBullseye />,
      desc:
        "Track your daily goals",
      path: "/goals"
    },

    {
      title: "Journal",
      icon: <FaBook />,
      desc:
        "Write thoughts & reflections",
      path: "/journal"
    },

    {
      title: "Analytics",
      icon: <FaChartLine />,
      desc:
        "See productivity insights",
      path: "/analytics"
    },

    {
      title: "Profile",
      icon: <FaUserCircle />,
      desc:
        "Manage your account",
      path: "/profile"
    }

  ];

  return (

    <div className="dashboard-page">

      {/* ================================= HERO ================================= */}

      <motion.div
        className="dashboard-hero"

        initial={{
          opacity: 0,
          y: 40
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.7
        }}
      >

        {/* LEFT */}

        <div className="hero-left">

          <h1>

            Welcome Back,
            <span>
              {" "}
              {user.name}
            </span>

          </h1>

          <p>

            Continue building
            your best version with
            your AI-powered
            productivity ecosystem.

          </p>

          <div className="hero-buttons">

            <button
              onClick={() =>
                navigate("/goals")
              }
            >

              Start Today

            </button>

            <button
              className="secondary-btn"

              onClick={() =>
                navigate("/journal")
              }
            >

              Open Journal

            </button>

          </div>

          <div className="hero-metrics">
            <div className="metric-pill">
              <strong>82%</strong> Weekly performance
            </div>
            <div className="metric-pill">
              <strong>15</strong> Active missions
            </div>
            <div className="metric-pill">
              <strong>4.6h</strong> Avg focus time
            </div>
          </div>

        </div>

        {/* RIGHT */}

        <div className="hero-right">

          <div className="hero-badge">
            <span>AI Pulse</span>
            <strong>Elite Momentum</strong>
            <small>Predictive boost for your next sprint</small>
          </div>

          <motion.div
            className="ai-orb"

            animate={{
              y: [0, -10, 0]
            }}

            transition={{
              repeat: Infinity,
              duration: 4
            }}
          >

            <FaBrain />

          </motion.div>

        </div>

      </motion.div>

      {/* ================================ STATS ================================ */}

      <div className="stats-grid">

        <motion.div
          className="stat-card"

          whileHover={{
            y: -8
          }}
        >

          <FaTasks />

          <h2>
            24
          </h2>

          <p>
            Active Goals
          </p>

        </motion.div>

        <motion.div
          className="stat-card"

          whileHover={{
            y: -8
          }}
        >

          <FaFire />

          <h2>
            16
          </h2>

          <p>
            Day Streak
          </p>

        </motion.div>

        <motion.div
          className="stat-card"

          whileHover={{
            y: -8
          }}
        >

          <FaChartLine />

          <h2>
            89%
          </h2>

          <p>
            Productivity
          </p>

        </motion.div>

        <motion.div
          className="stat-card"

          whileHover={{
            y: -8
          }}
        >

          <FaClock />

          <h2>
            4.6h
          </h2>

          <p>
            Focus Time
          </p>

        </motion.div>

      </div>

      {/* =============================== MAIN GRID =============================== */}

      <div className="dashboard-grid">

        {/* ================= LEFT SIDE ================= */}

        <div className="dashboard-left">

          {/* QUICK MODULES */}

          <div className="dashboard-section">

            <h2>
              Quick Access 🚀
            </h2>

            <div className="modules-grid">

              {modules.map(
                (
                  item,
                  index
                ) => (

                <motion.div
                  key={index}

                  className="module-card"

                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{
                    y: -10,
                    scale: 1.03
                  }}

                  onClick={() =>
                    navigate(
                      item.path
                    )
                  }
                >

                  <div className="module-icon">

                    {item.icon}

                  </div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.desc}
                  </p>

                </motion.div>

              ))}

            </div>

          </div>

          <div className="dashboard-section mission-timeline">
            <div className="dashboard-subgrid">
              <motion.div
                className="progress-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55 }}
              >
                <div className="section-head">
                  <h2>Daily Missions 🎯</h2>
                  <p>Focus on the top goals that move the needle today.</p>
                </div>
                <div className="mission-list">
                  <motion.div
                    className="mission-item completed"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                  >
                    <div className="mission-label">
                      <FaCheckCircle />
                      <div>
                        <strong>Complete 3 goals</strong>
                        <span>Maintain momentum with high-impact tasks.</span>
                      </div>
                    </div>
                    <span className="mission-state">Done</span>
                  </motion.div>
                  <motion.div
                    className="mission-item in-progress"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: 0.18 }}
                  >
                    <div className="mission-label">
                      <FaCheckCircle />
                      <div>
                        <strong>Write journal entry</strong>
                        <span>Capture insights before they fade.</span>
                      </div>
                    </div>
                    <span className="mission-state">In progress</span>
                  </motion.div>
                  <motion.div
                    className="mission-item pending"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: 0.26 }}
                  >
                    <div className="mission-label">
                      <FaCheckCircle />
                      <div>
                        <strong>Study for 2 hours</strong>
                        <span>Push your learning streak further.</span>
                      </div>
                    </div>
                    <span className="mission-state">Pending</span>
                  </motion.div>
                  <motion.div
                    className="mission-item pending"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: 0.34 }}
                  >
                    <div className="mission-label">
                      <FaCheckCircle />
                      <div>
                        <strong>Maintain streak</strong>
                        <span>Stay consistent and unlock your next reward.</span>
                      </div>
                    </div>
                    <span className="mission-state">Pending</span>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                className="progress-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: 0.08 }}
              >
                <div className="section-head">
                  <h2>Activity Timeline 📈</h2>
                  <p>Review how your day unfolded and what momentum you built.</p>
                </div>
                <div className="timeline">
                  <motion.div
                    className="timeline-item"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: 0.12 }}
                  >
                    <div className="timeline-meta">
                      <span>Today</span>
                      <strong>🔥 Maintained daily streak</strong>
                    </div>
                    <p>Boosted productivity score and stayed on track.</p>
                  </motion.div>
                  <motion.div
                    className="timeline-item"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: 0.18 }}
                  >
                    <div className="timeline-meta">
                      <span>Today</span>
                      <strong>🎯 Completed finance goal</strong>
                    </div>
                    <p>Marked progress toward your long-term goal plan.</p>
                  </motion.div>
                  <motion.div
                    className="timeline-item"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: 0.24 }}
                  >
                    <div className="timeline-meta">
                      <span>Yesterday</span>
                      <strong>📝 Added journal entry</strong>
                    </div>
                    <p>Captured reflections to improve your next week.</p>
                  </motion.div>
                  <motion.div
                    className="timeline-item"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: 0.3 }}
                  >
                    <div className="timeline-meta">
                      <span>Yesterday</span>
                      <strong>🚀 Productivity increased</strong>
                    </div>
                    <p>Your average focus time rose by 14%.</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="dashboard-right">

          {/* AI CARD */}

          <motion.div
            className="ai-card"

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            transition={{
              delay: 0.6
            }}
          >

            <div className="card-top">

              <FaBrain />

              <h2>
                AI Assistant
              </h2>

            </div>

            <p>

              You are currently
              outperforming 82%
              of users this week.

            </p>

            <div className="ai-highlight">

              Elite Momentum
              Detected 🚀

            </div>

          </motion.div>

          {/* FOCUS TIMER */}

          <motion.div
            className="focus-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >

            <div className="card-top">

              <FaBolt />

              <h2>
                Focus Session
              </h2>

            </div>

            <h1>
              25:00
            </h1>

            <button>

              Start Focus

            </button>

          </motion.div>

          {/* CALENDAR */}

          <motion.div
            className="calendar-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >

            <div className="card-top">

              <FaCalendarAlt />

              <h2>
                Smart Calendar
              </h2>

            </div>

            <div className="calendar-content">

              <p>
                📌 Team Meeting
              </p>

              <p>
                📚 Study Session
              </p>

              <p>
                🏋 Gym Workout
              </p>

            </div>

          </motion.div>

          {/* ACHIEVEMENTS */}

          <motion.div
            className="achievement-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.22 }}
          >

            <div className="card-top">

              <FaTrophy />

              <h2>
                Achievements
              </h2>

            </div>

            <div className="badge">

              🔥 15 Day Streak

            </div>

            <div className="badge">

              🚀 Goal Crusher

            </div>

            <div className="badge">

              🧠 Productivity Master

            </div>

          </motion.div>

          {/* MOTIVATION */}

          <motion.div
            className="motivation-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >

            <FaRocket />

            <h2>
              Motivation
            </h2>

            <p>

              Discipline creates
              freedom. Continue
              showing up daily.

            </p>

          </motion.div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;