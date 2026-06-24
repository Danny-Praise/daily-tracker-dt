const BASE_URL = "http://10.0.2.2:5000"; // Update this if you use a physical device or different emulator

const request = async (path, options = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Server error");
  }

  return data;
};

export const registerUser = async (payload) => {
  return request("/api/users/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const loginUser = async (payload) => {
  return request("/api/users/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const fetchGoals = async (userId, token) => {
  return request(`/api/goals/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const createGoal = async (payload, token) => {
  return request("/api/goals/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
};

export const completeGoal = async (goalId, token) => {
  return request(`/api/goals/complete/${goalId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const fetchUserProfile = async (token) => {
  return request("/api/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateUserProfile = async (payload, token) => {
  return request("/api/users/profile", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
};

export const unlockArchivedEntries = async (archive_password, token) => {
  return request("/api/journal/archives/unlock", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ archive_password })
  });
};

export const fetchJournalEntries = async (userId, token) => {
  return request(`/api/journal/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const createJournalEntry = async (payload, token) => {
  return request("/api/journal/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
};

export const archiveJournalEntry = async (entryId, archived, token) => {
  return request(`/api/journal/archive/${entryId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ archived })
  });
};

// AI API Calls
export const getGoalSuggestions = async (prompt, category, token) => {
  return request("/api/ai/suggestions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ prompt, category })
  });
};

export const getGoalPlan = async (title, category, difficulty, token) => {
  return request("/api/ai/plan", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, category, difficulty })
  });
};

export const getJournalInsights = async (token) => {
  return request("/api/ai/journal-insights", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
