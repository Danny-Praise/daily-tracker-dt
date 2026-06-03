import "./Analytics.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

function Analytics({ goals = [] }) {

  // SAFE COUNTS

  const completedGoals =
    goals.filter(
      (goal) => goal.completed
    ).length;

  const pendingGoals =
    goals.filter(
      (goal) => !goal.completed
    ).length;

  const totalGoals =
    goals.length;

  // DATA

  const data = [

    {
      name: "Completed",
      value: completedGoals
    },

    {
      name: "Pending",
      value: pendingGoals
    }

  ];

  // COLORS

  const COLORS = [
    "#6C63FF",
    "#00C897"
  ];

  const completionRatio =
    totalGoals === 0
      ? 0
      : Math.round(
          (completedGoals / totalGoals) * 100
        );

  return (

    <div className="analytics-container">
      <div className="analytics-summary">
        <div>
          <p>At a glance</p>
          <h2>Goal Performance</h2>
        </div>
        <div className="analytics-pill">
          <span>{completionRatio}%</span>
          <p>Completion rate</p>
        </div>
      </div>

      {/* STATS */}

      <div className="analytics-stats">

        <div className="analytics-card">

          <h3>
            {totalGoals}
          </h3>

          <p>
            Total Goals
          </p>

        </div>

        <div className="analytics-card">

          <h3>
            {completedGoals}
          </h3>

          <p>
            Completed
          </p>

        </div>

        <div className="analytics-card">

          <h3>
            {pendingGoals}
          </h3>

          <p>
            Pending
          </p>

        </div>

      </div>

      {/* PIE CHART */}

      <div className="chart-wrapper">

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={110}
              dataKey="value"
              label
            >

              {data.map(
                (entry, index) => (

                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[
                        index %
                        COLORS.length
                      ]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}

export default Analytics;