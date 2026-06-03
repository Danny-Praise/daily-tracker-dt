const pool = require("./config/db");

const initializeDatabase = async () => {
  try {
    console.log("🔧 Initializing database schema...\n");

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        archive_password_hash VARCHAR(255),
        theme VARCHAR(10) DEFAULT 'light',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Users table created/verified");

    // Ensure archive password column exists for existing installs
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS archive_password_hash VARCHAR(255);
    `);

    // Create goals table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS goals (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(50),
        completed BOOLEAN DEFAULT FALSE,
        completed_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Goals table created/verified");

    // Create journal entries table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS journal_entries (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        archived BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Journal entries table created/verified");

    // Create indexes for better query performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_goals_user_id ON goals(user_id);
      CREATE INDEX IF NOT EXISTS idx_goals_completed ON goals(completed);
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_journal_user_id ON journal_entries(user_id);
      CREATE INDEX IF NOT EXISTS idx_journal_archived ON journal_entries(archived);
    `);
    console.log("✅ Indexes created/verified");

    console.log("\n✨ Database schema initialization complete!");
    console.log("📊 You can now start using the application.\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Database initialization failed:", error.message);
    process.exit(1);
  }
};

initializeDatabase();
