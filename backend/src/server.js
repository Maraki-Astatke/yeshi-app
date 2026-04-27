import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import pool from "./db/db.js";

const PORT = process.env.PORT || 5001;

// Start server immediately (don't wait for database)
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Test database connection separately (non-blocking)
pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error.message);
    console.log("⚠️ Server is running but without database connection");
  });

export default app;