import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import pool from "./db/db.js";

// For local development - keep this
if (process.env.NODE_ENV !== "production") {
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
}

// For Vercel - export the app
export default app;