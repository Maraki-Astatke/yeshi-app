import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import pool from "./db/db.js";

const PORT = process.env.PORT || 5001;

pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error.message);
  });
