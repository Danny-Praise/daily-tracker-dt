import "./Calendar.css";

function Calendar({ user, darkMode }) {
  return (
    <div className={darkMode ? "calendar-page dark" : "calendar-page"}>
      <div className="calendar-header">
        <h1>Calendar Planning</h1>
        <p>Schedule goals, track upcoming tasks, and manage your productivity plan.</p>
      </div>

      <div className="calendar-content">
        <div className="calendar-panel">
          <h2>Monthly Planner</h2>
          <p>Your calendar view will show events, goal deadlines, and reminders here.</p>
        </div>

        <div className="calendar-panel">
          <h2>Upcoming Events</h2>
          <p>Add events and reminders to stay on track with your goals.</p>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
