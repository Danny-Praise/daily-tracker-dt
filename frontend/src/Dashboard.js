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

        </div>

        {/* RIGHT */}

        <div className="hero-right">

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

          {/* MISSIONS */}

          <div className="dashboard-section">

            <h2>
              Daily Missions 🎯
            </h2>

            <div className="mission-list">

              <div className="mission-item">

                <FaCheckCircle />

                Complete 3 goals

              </div>

              <div className="mission-item">

                <FaCheckCircle />

                Write journal entry

              </div>

              <div className="mission-item">

                <FaCheckCircle />

                Study for 2 hours

              </div>

              <div className="mission-item">

                <FaCheckCircle />

                Maintain streak

              </div>

            </div>

          </div>

          {/* TIMELINE */}

          <div className="dashboard-section">

            <h2>
              Activity Timeline 📈
            </h2>

            <div className="timeline">

              <div className="timeline-item">

                🔥 Maintained daily streak

              </div>

              <div className="timeline-item">

                🎯 Completed finance goal

              </div>

              <div className="timeline-item">

                📝 Added journal entry

              </div>

              <div className="timeline-item">

                🚀 Productivity increased

              </div>

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

          <div className="focus-card">

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

          </div>

          {/* CALENDAR */}

          <div className="calendar-card">

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

          </div>

          {/* ACHIEVEMENTS */}

          <div className="achievement-card">

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

          </div>

          {/* MOTIVATION */}

          <div className="motivation-card">

            <FaRocket />

            <h2>
              Motivation
            </h2>

            <p>

              Discipline creates
              freedom. Continue
              showing up daily.

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;