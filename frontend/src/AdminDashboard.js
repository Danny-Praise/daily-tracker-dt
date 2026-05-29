import "./AdminDashboard.css";

function AdminDashboard({ darkMode }) {

  return (

    <div
      className={
        darkMode
          ? "admin-page dark"
          : "admin-page"
      }
    >

      <div className="admin-header">

        <h1>
          Admin Control Center 🛡️
        </h1>

        <p>
          Monitor users, analytics,
          testimonials and system activity.
        </p>

      </div>

      {/* STATS */}

      <div className="admin-stats">

        <div className="admin-card">

          <h2>1,240</h2>

          <p>Total Users</p>

        </div>

        <div className="admin-card">

          <h2>320</h2>

          <p>Premium Users</p>

        </div>

        <div className="admin-card">

          <h2>92%</h2>

          <p>Engagement</p>

        </div>

        <div className="admin-card">

          <h2>180</h2>

          <p>Testimonials</p>

        </div>

      </div>

      {/* RECENT ACTIVITY */}

      <div className="admin-section">

        <h2>
          Recent Activity
        </h2>

        <div className="activity-card">

          <p>
            ✅ 24 new users joined today
          </p>

          <p>
            📈 Productivity sphere trending
          </p>

          <p>
            ⭐ 18 new testimonials submitted
          </p>

          <p>
            💎 12 users upgraded to Premium
          </p>

        </div>

      </div>

    </div>

  );
}

export default AdminDashboard;