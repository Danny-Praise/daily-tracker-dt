const pool = require("../config/db");

// Mock AI for now (can be replaced with real OpenAI/Anthropic API)
const generateGoalSuggestions = async (req, res) => {
  try {
    const { prompt, category } = req.body;
    const userId = req.userId;

    // Get user's existing goals for context
    const existingGoals = await pool.query(
      "SELECT title, category, completed FROM goals WHERE user_id = $1",
      [userId]
    );

    // Generate mock suggestions (replace with real API call later)
    const suggestions = [
      {
        title: "Daily 30-minute exercise",
        category: category || "Health",
        plan: "Break it down into 10-minute morning, 10-minute afternoon, and 10-minute evening sessions",
        timeEstimate: "30 days",
        priority: "High"
      },
      {
        title: "Read 1 book per month",
        category: category || "Learning",
        plan: "Read 10 pages every day, take notes on key takeaways",
        timeEstimate: "30 days",
        priority: "Medium"
      },
      {
        title: "Save 10% of monthly income",
        category: category || "Finance",
        plan: "Set up automatic transfer on payday, track expenses weekly",
        timeEstimate: "90 days",
        priority: "High"
      }
    ];

    // Filter suggestions based on prompt/category if provided
    let filteredSuggestions = suggestions;
    if (prompt) {
      const lowerPrompt = prompt.toLowerCase();
      filteredSuggestions = suggestions.filter(s => 
        s.title.toLowerCase().includes(lowerPrompt) || 
        s.category.toLowerCase().includes(lowerPrompt)
      );
    }

    res.status(200).json({
      success: true,
      suggestions: filteredSuggestions,
      context: {
        existingGoalsCount: existingGoals.rows.length,
        completedGoalsCount: existingGoals.rows.filter(g => g.completed).length
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Failed to generate suggestions"
    });
  }
};

const generateGoalPlan = async (req, res) => {
  try {
    const { title, category, difficulty } = req.body;
    
    const plans = {
      easy: {
        steps: [
          "Define clear, specific goal",
          "Set a realistic deadline",
          "Track progress daily",
          "Celebrate small wins"
        ],
        dailyTime: "15-30 minutes",
        tips: ["Start small, build momentum", "Use reminders to stay consistent"]
      },
      medium: {
        steps: [
          "Break goal into weekly milestones",
          "Schedule specific time slots",
          "Find an accountability partner",
          "Review progress every Sunday"
        ],
        dailyTime: "30-60 minutes",
        tips: ["Make it non-negotiable", "Track streaks to stay motivated"]
      },
      extreme: {
        steps: [
          "Create detailed daily schedule",
          "Eliminate distractions",
          "Measure progress hourly",
          "Weekly deep review and adjustment"
        ],
        dailyTime: "60+ minutes",
        tips: ["Full commitment required", "Use time-blocking techniques"]
      }
    };

    const plan = plans[difficulty] || plans.medium;

    res.status(200).json({
      success: true,
      plan,
      goalTitle: title,
      category: category
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Failed to generate plan"
    });
  }
};

const getJournalInsights = async (req, res) => {
  try {
    const userId = req.userId;
    
    const journalEntries = await pool.query(
      "SELECT content, created_at FROM journal_entries WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20",
      [userId]
    );

    // Generate mock insights (replace with real NLP later)
    const insights = {
      themes: [
        "Personal growth",
        "Productivity",
        "Health & wellness"
      ],
      moodTrend: "Positive trend over last 2 weeks",
      recommendations: [
        "Continue journaling daily - great consistency!",
        "Consider adding weekly reviews to track progress",
        "Try writing about gratitude for 30 days"
      ],
      entryCount: journalEntries.rows.length
    };

    res.status(200).json({
      success: true,
      insights
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Failed to get insights"
    });
  }
};

module.exports = {
  generateGoalSuggestions,
  generateGoalPlan,
  getJournalInsights
};
