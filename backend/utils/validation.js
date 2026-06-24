// Input validation middleware

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

const validateGoalInput = (title, category) => {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: "Goal title is required" };
  }
  if (title.length > 255) {
    return { valid: false, error: "Goal title is too long (max 255 chars)" };
  }
  if (category && category.length > 50) {
    return { valid: false, error: "Category is too long (max 50 chars)" };
  }
  return { valid: true };
};

const validateJournalInput = (content) => {
  if (!content || content.trim().length === 0) {
    return { valid: false, error: "Journal content is required" };
  }
  if (content.length > 2000) {
    return { valid: false, error: "Journal entry is too long (max 2000 chars)" };
  }
  return { valid: true };
};

const validateRegistration = (full_name, email, password) => {
  if (!full_name || full_name.trim().length === 0) {
    return { valid: false, error: "Name is required" };
  }
  if (full_name.length > 100) {
    return { valid: false, error: "Name is too long (max 100 chars)" };
  }
  if (!validateEmail(email)) {
    return { valid: false, error: "Invalid email format" };
  }
  if (!validatePassword(password)) {
    return { valid: false, error: "Password must be at least 6 characters" };
  }
  return { valid: true };
};

const validateLogin = (email, password) => {
  if (!validateEmail(email)) {
    return { valid: false, error: "Invalid email format" };
  }
  if (!password) {
    return { valid: false, error: "Password is required" };
  }
  return { valid: true };
};

module.exports = {
  validateEmail,
  validatePassword,
  validateGoalInput,
  validateJournalInput,
  validateRegistration,
  validateLogin,
};
