console.log("Step 1: Starting server.js");

import dotenv from "dotenv";
dotenv.config();

console.log("Step 2: Dotenv loaded");

import app from "./app.js";

console.log("Step 3: App imported");

import pool from "./db/db.js";

console.log("Step 4: Database pool created");

const PORT = process.env.PORT || 5001;
console.log(`Step 5: Port is ${PORT}`);

try {
  console.log("Step 6: Attempting to start server");
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
  console.log("Step 7: Server listening started");
} catch (error) {
  console.error("Step 8: Server failed to start:", error);
}

console.log("Step 9: Server file execution complete");

export default app;